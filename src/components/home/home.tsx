import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";

export const Home: React.FC = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      paddingLeft="15rem"
      paddingRight="15rem"
      paddingTop="1rem"
      alignItems="center"
    >
      <CardMedia
        component="img"
        sx={{ width: "450px" }}
        image="src/components/home/photo-voice-home.jpg"
        alt="Photo Voice Logo"
      />
      <Typography padding="2rem" variant="h3">
        フォトボイスプロジェクトへようこそ
      </Typography>
      <Typography padding="2rem" variant="h3">
        Welcome to The PhotoVoice Project
      </Typography>
    </Box>
  );
};
