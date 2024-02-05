import {
  Box,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";
import { useLoaderData, useNavigation } from "react-router-dom";
import { HomeLoaderValue } from "../../loaders/home-loader";

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const homePage = useLoaderData() as HomeLoaderValue;
  const theme = useTheme();

  const handleClick = () => {
    window.open("https://github.com/zmjohnso/photo-voice", "_blank");
  };

  if (navigation.state === "loading") {
    return <LoadingIndicator />;
  }

  // why does the media image not load correctly when the locale is "ja"?
  console.log(homePage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
      paddingLeft="1rem"
      paddingRight="1rem"
      paddingTop="1rem"
      alignItems="center"
      color={theme.palette.text.primary}
    >
      {homePage.fields.logo.fields.file && (
        <CardMedia
          component="img"
          sx={{ width: "450px" }}
          image={
            theme.palette.mode === "light"
              ? homePage.fields.logo.fields.file.url
              : homePage.fields.logoDark.fields.file.url
          }
          alt="Photo Voice Logo"
        />
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography padding="2rem" variant="h3">
          {homePage.fields.welcomeText}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        paddingTop="5rem"
      >
        <Typography variant="body1">
          {homePage.fields.supportDescription}
        </Typography>
        <IconButton color="inherit" onClick={handleClick}>
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
