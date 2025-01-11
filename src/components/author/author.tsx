import React from "react";
import { AuthorLoaderValue } from "../../loaders/author-loader";
import { useLoaderData, useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useStore } from "../../store/store";

export const Author: React.FC = () => {
  const [languageMode] = useStore(useShallow((state) => [state.languageMode]));
  const author = useLoaderData() as AuthorLoaderValue;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/display/author/${author.sys.id}`);
  };

  const group = languageMode === "en-US" ? "Group" : "グループ";
  const viewVoices =
    languageMode === "en-US"
      ? "View all my Voices"
      : "自分のボイスをすべて見る";

  return (
    <Box
      sx={{ display: "flex" }}
      paddingTop={{ xs: "1rem", md: "5rem" }}
      paddingLeft={{ xs: "1rem", md: "5rem" }}
      paddingRight={{ xs: "1rem", md: "5rem" }}
      paddingBottom={{ xs: "1rem", md: "5rem" }}
      display="flex"
      justifyContent="center"
    >
      <Card
        sx={{ display: "flex", flexDirection: "column" }}
        variant="outlined"
      >
        <CardContent>
          <Typography gutterBottom variant="h1">
            {author.fields.name}
          </Typography>
          <Typography gutterBottom variant="h5">
            {author.fields.groupLocation} {group}
          </Typography>
          <Typography gutterBottom component="div" variant="body1">
            {author.fields.biography}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleNavigate}>
            {viewVoices}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
