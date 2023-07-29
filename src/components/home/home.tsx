import { Box, CardMedia, Typography } from "@mui/material";
import { Entry } from "contentful";
import React, { useEffect, useState } from "react";
import { HomePage } from "../../shared/content-types";
import { getClient } from "../../services/contentful/client";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";

export const Home: React.FC = () => {
  const client = getClient();

  // TODO: there will ever only be one home page, fix this array type?
  const [homePage, setHomePage] = useState<Entry<HomePage>[] | undefined>();

  useEffect(() => {
    client
      .getEntries<HomePage>({ content_type: "homepage" })
      .then((homePageContent) => setHomePage(homePageContent.items))
      .catch(console.error); // Add error handling;
  }, []);

  if (homePage === undefined) {
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
        <Typography variant="h6">
          年賀寄付金配分事業の助成金により制作
        </Typography>
        <Typography variant="h6">
          Supported by the New Year&apos;s Postcard Donations Aid
          Program
        </Typography>
      </Box>
    </Box>
  );
};
