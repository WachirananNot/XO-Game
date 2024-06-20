import { useEffect } from "react";
import "./App.css";
import { Box, Grid } from "@mui/material";
import { useAppDispatch } from "./redux/hooks";
import {
  fetchData,
} from "./redux/slices/boardSlice";
import GridCenter from "./components/gridCenter";
import GridLeft from "./components/gridLeft";
import GridRight from "./components/gridRight";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <Box sx={{ bgcolor: "lightgrey", minHeight: "100vh" }}>
      <Grid
        container
        columnSpacing={{ xs: 0, md: 1, lg: 1 }}
        rowSpacing={{ xs: 1, md: 0, lg: 0 }}
        sx={{ p: 5 }}
      >
        <Grid item xs={12} md={2} lg={2}>
          <GridLeft/>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <GridCenter />
        </Grid>
        <Grid item xs={12} md={2} lg={2}>
          <GridRight/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
