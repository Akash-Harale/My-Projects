import React from "react";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

export const CopyToClipboard = ({ textData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    setCopied(true);
    navigator.clipboard
      .writeText(textData)
      .then((res) => {
        console.log("copied");
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setCopied(false);
    }, 2000 );
  };


  return (
    <div onClick={copy}>
      {copied ? (
        <AssignmentTurnedInOutlinedIcon  style={{color:"red"}}/>
      ) : (
        <ContentCopyIcon fontSize="small" style={{color:colors.greenAccent[500]}} />
      )}
    </div>
  );
};
