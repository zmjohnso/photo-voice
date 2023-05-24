import { Box, CircularProgress } from "@mui/material";

export const LoadingIndicator: React.FC = () => {
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      marginTop="-2.5rem"
      marginLeft="-2.5rem"
    >
      <CircularProgress size="5rem" />
    </Box>
  );
};
