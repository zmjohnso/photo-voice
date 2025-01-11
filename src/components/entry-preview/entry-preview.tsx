import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Entry } from "contentful";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VoiceEntry } from "../../shared/content-types";

interface Props {
  entry: Entry<VoiceEntry>;
}

export const EntryPreview: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/display/${props.entry.sys.id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleNavigate}>
        {props.entry.fields.photo[0].fields.file ? (
          <CardMedia
            image={props.entry.fields.photo[0].fields.file.url}
            style={{ height: "150px" }}
          />
        ) : (
          <Skeleton variant="rounded" height={150} />
        )}
        <CardContent>
          <Typography gutterBottom variant="body1">
            {props.entry.fields.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
