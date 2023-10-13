import axios from "axios";
import React, { useState } from "react";
import { LinkResult } from "./LinkResult";
import { BackgroundAnimate } from "./BackgroundAnimate";
import "./App.css"


export const CreateShortLink = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8000/url/create`,
        {
          OriginalUrl: url, // Move the 'url' key out of the 'body' object
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use 'Authorization' instead of 'authorization'
          },
        }
      )
      .then((res) => {
        console.log(res.data.data || res.data);
        alert(res.data.message);

     const newShortUrl=res.data.data.shortID
     setShortUrl(newShortUrl); 
      })
      .catch((err) => {
        console.log(err.message)
      });

    setUrl("");
  };
  return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortner</span>
      </h1>
      <div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          placeholder="Paste a link to shorten it."
        />
        <button onClick={handleSubmit}>Shorten</button>
      </div>
      <BackgroundAnimate/>
      <LinkResult shortUrl={shortUrl}/>
    </div>
  );
};
