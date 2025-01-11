import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  fullName: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [showEmail, setShowEmail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const theme = useTheme();
  const emailAddress = "photovoicejapan@gmail.com";
  const requiredErrorMessage = "Field is required.";

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const toggleEmailDisplay = () => {
    setShowEmail(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
      display="flex"
      justifyContent="center"
      paddingTop={{ xs: "1rem", md: "5rem" }}
      paddingLeft={{ xs: "1rem", md: "5rem" }}
      paddingRight={{ xs: "1rem", md: "5rem" }}
      paddingBottom={{ xs: "1rem", md: "5rem" }}
      color={theme.palette.text.primary}
    >
      <Card
        variant="outlined"
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <Box display="flex" flexDirection="column">
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Address
            </Typography>
            <Typography variant="h5" component="div">
              OWL 6th Floor
              <br />
              2-6-8 Shiba-koen Minato-ku
              <br />
              Tokyo 105-0011
              <br />
              Japan
            </Typography>
          </CardContent>
          <CardActions>
            {showEmail ? (
              <a href={`mailto:${emailAddress}`}>
                <Typography variant="h6" component="div">
                  {emailAddress}
                </Typography>
              </a>
            ) : (
              <Button onClick={toggleEmailDisplay} size="small">
                Send email
              </Button>
            )}
          </CardActions>
          <Divider variant="middle" />
          <CardContent>
            <Typography variant="h5" component="div">
              NPO法人 フォトボイス・プロジェクト
              <br />
              Email: {emailAddress}
              <br />
              HP: http://photovoice.jp
              <br />
              FB: PhotoVoiceProjectJapan
              <br />
              <br />
              〒105-0011 東京都港区芝公園2
              <br />
              －6－8 OWL 6階
              <br />
              <PhoneIcon /> 080-4331-4041（代）、 080-7951-8280（代）
            </Typography>
          </CardContent>
        </Box>
        <Divider
          variant="fullWidth"
          orientation="vertical"
          sx={{ display: { xs: "none", md: "flex" } }}
        />
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ display: { xs: "flex", md: "none" } }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" style={{ height: "100%" }}>
            <CardContent
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography color="text.secondary" gutterBottom>
                Message
              </Typography>
              <TextField
                variant="outlined"
                label="Full Name"
                {...register("fullName", { required: true })}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName ? requiredErrorMessage : ""}
                style={{ height: "5rem" }}
              />
              <TextField
                variant="outlined"
                label="Email Address"
                {...register("email", { required: true })}
                error={Boolean(errors.email)}
                helperText={errors.email ? requiredErrorMessage : ""}
                style={{ height: "5rem" }}
              />
              <TextField
                variant="outlined"
                label="Your Message"
                multiline
                {...register("message", { required: true })}
                error={Boolean(errors.message)}
                helperText={errors.message ? requiredErrorMessage : ""}
              />
            </CardContent>
            <CardActions>
              <Button type="submit" size="small">
                Send message
              </Button>
            </CardActions>
          </Box>
        </form>
      </Card>
    </Box>
  );
};
