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
      {homePage && (
        <CardMedia
          component="img"
          sx={{ width: "450px" }}
          image={
            theme.palette.mode === "light"
              ? homePage[0].fields.logo.fields.file.url
              : homePage[0].fields.logoDark.fields.file.url
          }
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
        paddingTop="5rem"
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
