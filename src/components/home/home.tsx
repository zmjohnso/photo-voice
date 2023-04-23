import { Box, CardMedia, Typography } from "@mui/material";
import { Entry } from "contentful";
import React, { useEffect, useState } from "react";
import { HomePage } from "../../shared/content-types";
import { getClient } from "../../services/contentful/client";

export const Home: React.FC = () => {
  const client = getClient();

  // TODO: there will ever only be one home page, fix this array type?
  const [homePage, setHomePage] = useState<Entry<HomePage>[] | undefined>();

  useEffect(() => {
    client
      .getEntries<HomePage>({ content_type: "homepage" })
      .then((homePageContent) => setHomePage(homePageContent.items))
      .catch(console.error); // Add error handling;
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      paddingLeft="15rem"
      paddingRight="15rem"
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
      <Typography padding="2rem" variant="h3">
        フォトボイスプロジェクトへようこそ
      </Typography>
      <Typography padding="2rem" variant="h3">
        Welcome to The PhotoVoice Project
      </Typography>
    </Box>
  );
};
