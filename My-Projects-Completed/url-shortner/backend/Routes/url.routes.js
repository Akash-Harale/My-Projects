const express = require("express");
const useragent = require('express-useragent'); 
const { auth } = require("../Middlewares/auth.middleware");
const { UrlModel } = require("../MVC/models/url.model");
const ShortUniqueId = require("short-unique-id");
const date = require("date-and-time");

const urlRouter = express.Router();

// Middleware
urlRouter.use(express.json());
urlRouter.use(useragent.express());
// urlRouter.use(auth); -- >this is a middleware for every routes but I have used 
// middlewares separately for each routes.

urlRouter.get("/", auth,  async (req, res) => {
  const data = await UrlModel.find();

  res.status(200).json({
    data: data,
  });
});

urlRouter.get("/:shortID", async (req, res) => {
  const parsedUserAgent =req.useragent.source;
  try {
    const dataFromDB = await UrlModel.findOneAndUpdate({ shortID: req.params.shortID },{
      $push:{visitedHistory: {
        timestamp:Date.now(),
        device: useragent.parse(parsedUserAgent).isDesktop ? 'Desktop' :""
      }},
    } );
    if (dataFromDB) {
      res.redirect(dataFromDB.OriginalUrl);
    } else {
      res.send(`Invalid shortID`);
    }
  } catch (error) {
    res.send(error.message);
  }
});

urlRouter.post("/create", auth,  async (req, res) => {
  const { OriginalUrl: urlFromReqBody } = req.body;
  if (urlFromReqBody) {
    try {
      const isUrlPresentInDatabase = await UrlModel.findOne({
        OriginalUrl: urlFromReqBody,
      });
      if (isUrlPresentInDatabase) {
        res.status(200).json({
          message: `This Link is already present in the database with short ID ${isUrlPresentInDatabase.shortID}`,
        });
      } else {
        const Adata = new UrlModel(req.body);
        await Adata.save();
        res.status(200).json({
          data: Adata,
          message: `url saved successfully`,
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  } else {
    res.send(`please enter URL`);
  }
});

urlRouter.patch("/update", auth,  (req, res) => {});

urlRouter.delete("/delete/:shortID", auth, (req, res) => {});

module.exports = {
  urlRouter,
};
