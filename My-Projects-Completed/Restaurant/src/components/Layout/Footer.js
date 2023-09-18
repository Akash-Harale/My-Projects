import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Link, Typography } from "@mui/material";
const Footer = () => {
  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
      >
        <Box
          sx={{
            my: 3,
            "& svg": {
              fontSize: "60px",
              cursor: "pointer",
              mr: 2,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          {/* icons */}
         <Link target='_blank' href="https://www.instagram.com/akash_v_harale/"> 
         <InstagramIcon  color="error"/>
         </Link>
         <Link target='_blank' href="https://twitter.com/akash_v_harale"> 
         <TwitterIcon  />
         </Link>
         <Link target='_blank' href="https://github.com/Akash-Harale"> 
         <GitHubIcon  color="success"/>
         </Link>
         <Link target='_blank' href="https://www.youtube.com"> 
         <YouTubeIcon  color="error"/>
         </Link>
        </Box>
        <Typography
          variant="h5"
          sx={{
            "@media (max-width:600px)": {
              fontSize: "1rem",
            },
          }}
        >
          All Rights Reserved &copy; Akash-Harale
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
