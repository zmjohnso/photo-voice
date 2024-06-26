import { Box, CardMedia, Typography, useTheme } from "@mui/material";
import React from "react";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";
import { useLoaderData, useNavigation } from "react-router-dom";
import { AboutLoaderValue } from "../../loaders/about-loader";
import ReactMarkdown from "react-markdown";

export const About: React.FC = () => {
  const aboutPage = useLoaderData() as AboutLoaderValue;
  const navigation = useNavigation();
  const theme = useTheme();

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
      justifyContent={{ xs: "space-around", md: "flex-start" }}
      paddingLeft={{ xs: "0", md: "15rem" }}
      paddingRight={{ xs: "0", md: "15rem" }}
      paddingTop="1rem"
      alignItems="center"
      color={theme.palette.text.primary}
    >
      <CardMedia
        component="img"
        sx={{ width: { xs: 350, md: 450 } }}
        image={aboutPage.fields.aboutPicture.fields.file.url}
        alt="About Page Image"
      />
      <Typography variant="body1" component="div" padding="1rem">
        <ReactMarkdown>{aboutPage.fields.description}</ReactMarkdown>
      </Typography>
    </Box>
  );
};
