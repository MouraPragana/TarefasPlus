import { Box, LinearProgress } from "@mui/material";
import styles from "./styles.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <h1>Carregando...</h1>
      <Box sx={{ width: "60%", color: "red", marginTop: 5 }}>
        <LinearProgress color="inherit" />
      </Box>
    </div>
  );
}
