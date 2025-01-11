import { Box, CardMedia, Typography, useTheme } from "@mui/material";

import React from "react";
import { useLoaderData } from "react-router-dom";
import { HomeLoaderValue } from "../../loaders/home-loader";

export const Home: React.FC = () => {
  const homePage = useLoaderData() as HomeLoaderValue;
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
      justifyContent={{ xs: "space-around", md: "flex-start" }}
      height="100%"
      paddingLeft={{ xs: "0", md: "1rem" }}
      paddingRight={{ xs: "0", md: "1rem" }}
      paddingTop={{ xs: "0", md: "1rem" }}
      alignItems="center"
      color={theme.palette.text.primary}
    >
      <CardMedia
        component="img"
        sx={{ width: { xs: 350, md: 450 } }}
        image={homePage.fields.logo.fields.file.url}
        alt="Photo Voice Logo"
      />
      <Box display="flex" alignItems="center" textAlign="center">
        <Typography padding={{ xs: "1rem", md: "2rem" }} variant="h3">
          {homePage.fields.welcomeText}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        textAlign="center"
        paddingTop={{ xs: "1rem", md: "4rem" }}
      >
        <Typography padding={{ xs: "1rem", md: "2rem" }} variant="body1">
          {homePage.fields.supportDescription}
        </Typography>
      </Box>
    </Box>
  );
};
