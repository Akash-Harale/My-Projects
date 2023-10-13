import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const LinkResult = ({shortUrl}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="result">
      {shortUrl && (
        <>
          {" "}
          <p>{shortUrl} </p>
          <CopyToClipboard
            text={`http://localhost:8000/url/${shortUrl}`}
            onCopy={() => {
              setCopied(true);
            }}
          >
            <button className={copied ? "copied" : ""}>
              {copied ? `✔️Copied to Clipboard` : `Copy to Clipboard`}
            </button>
          </CopyToClipboard>
        </>
      )}
    </div>
  );
};
