import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Entry } from "contentful";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VoiceEntry } from "../../shared/content-types";
import { useStore } from "../../store/store";

interface Props {
  entry: Entry<VoiceEntry>;
}

export const EntryPreview: React.FC<Props> = (props) => {
  const [addCurrentEntry] = useStore((state) => [state.addCurrentEntry]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    addCurrentEntry(props.entry);
    navigate("/display");
  };

  return (
    <Card>
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          image={props.entry.fields.photo[0].fields.file.url}
          style={{ height: "150px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="body1">
            {props.entry.fields.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
