import { Box, Typography, useTheme } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
      height="100vh"
      display="flex"
      flexDirection="column"
      paddingTop="1rem"
      paddingLeft="15rem"
      paddingRight="15rem"
      alignItems="center"
      color={theme.palette.text.primary}
    >
      <Typography variant="h6">
        Oops, something went wrong. Please return to the home page.
      </Typography>
      <Typography variant="h6">
        お探しのページは見つかりませんでした。 ホームページに戻ってください。
      </Typography>
      {isRouteErrorResponse(error) && (
        <>
          <Typography variant="h2">{error.status}</Typography>
          <Typography variant="body1">{error.statusText}</Typography>
          {error.data?.message && (
            <Typography variant="body1">{error.data.message}</Typography>
          )}
        </>
      )}
      <Typography variant="h6">
        Please hit the back button in your browser and try again.
      </Typography>
    </Box>
  );
}
