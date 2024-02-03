import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";
import { useLoaderData, useNavigation } from "react-router-dom";
import { HomeLoaderValue } from "../../loaders/home-loader";

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const homePage = useLoaderData() as HomeLoaderValue;

  const handleClick = () => {
    window.open("https://github.com/zmjohnso/photo-voice", "_blank");
  };

  if (navigation.state === "loading") {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      paddingLeft="1rem"
      paddingRight="1rem"
      paddingTop="1rem"
      alignItems="center"
    >
      {homePage && (
        <CardMedia
          component="img"
          sx={{ width: "450px" }}
          image={homePage[0].fields.logo.fields.file.url}
          alt="Photo Voice Logo"
        />
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography padding="2rem" variant="h3">
          フォトボイス・プロジェクトへようこそ
        </Typography>
        <Typography padding="2rem" variant="h3">
          Welcome to The PhotoVoice Project
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        paddingTop="10rem"
      >
        <Typography variant="body1">
          2022年度年賀寄付金配分事業の助成金により制作
        </Typography>
        <Typography variant="body1">
          Supported by the FY2022 New Year&apos;s Postcard Donations Aid Program
        </Typography>
        <IconButton color="inherit" onClick={handleClick}>
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
