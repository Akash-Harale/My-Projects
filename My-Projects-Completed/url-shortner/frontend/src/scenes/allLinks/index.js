import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../../components/Header";
import axios from "axios";
import { tokens } from "../../theme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CopyToClipboard } from "../../components/CopyToClipboard";
import Bar from "../../components/Bar";

// import { LinkResult } from "../createShortLink/LinkResult";
// import { PortableWifiOffOutlined } from "@mui/icons-material";
// import { CreateShortLink } from "../createShortLink";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const AllLinks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]); // Initialize data as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/url");
        console.log(response.data.data);
        setData(response.data.data); // Update the state with the fetched data
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Managing Links" />

      {data &&
        data?.map((el, index) => {
          return (
            <Grid key={el._id} container spacing={2}>
              <Grid item xs={12} md={12}>
                <Item>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      {/* <Typography>Accordion 1</Typography> */}
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          width="100px"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box color={colors.greenAccent[500]}> Sr No </Box>
                          <Box> {index + 1} </Box>
                        </Box>
                        <Box
                          width="300px"
                          display="flex"
                          flexDirection="column"
                        >
                          {" "}
                          <Box color={colors.greenAccent[500]}>
                            {" "}
                            Original Link{" "}
                          </Box>
                          <Box> {el.OriginalUrl.substring(0, 25)}...</Box>
                        </Box>
                        <Box
                          width="200px"
                          display="flex"
                          flexDirection="column"
                        >
                          {" "}
                          <Box textAlign="left" color={colors.greenAccent[500]}>
                            {" "}
                            Short Link{" "}
                          </Box>
                          <Box
                            width="70px"
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Box>{el.shortID}</Box>
                            <button
                              style={{ background: "none", border: "none" }}
                            >
                              <CopyToClipboard
                                textData={`http://localhost:8000/url/${el.shortID}`}
                              />
                            </button>
                          </Box>
                        </Box>
                        <Box
                          width="200px"
                          display="flex"
                          flexDirection="column"
                        >
                          {" "}
                          <Box color={colors.greenAccent[500]}>
                            {" "}
                            Total Clicks{" "}
                          </Box>
                          <Box> {el.visitedHistory.length}</Box>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Bar/>
                        {/* <BarRechart/>  */}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Item>
              </Grid>
            </Grid>
          );
        })}

    
    </Box>
  );
};
