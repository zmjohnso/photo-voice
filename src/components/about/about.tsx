import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router";
import { AboutLoaderValue } from "../../loaders/about-loader";
import ReactMarkdown from "react-markdown";

export const About: React.FC = () => {
  const aboutPage = useLoaderData() as AboutLoaderValue;
  const theme = useTheme();

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
      {aboutPage.fields.aboutPicture.fields.file.url ? (
        <Box
          component="img"
          sx={{ width: { xs: 350, md: 450 } }}
          src={aboutPage.fields.aboutPicture.fields.file.url}
          alt="About Page Image"
        />
      ) : (
        <Skeleton variant="rectangular" width={450} height={450} />
      )}
      <Typography variant="body1" component="div" padding="1rem">
        <ReactMarkdown>{aboutPage.fields.description}</ReactMarkdown>
      </Typography>
    </Box>
  );
};
