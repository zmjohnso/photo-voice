import { Box, Button, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingTop="1rem"
      paddingLeft="15rem"
      paddingRight="15rem"
      alignItems="center"
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
      <Button></Button>
    </Box>
  );
}
