import React, { Suspense } from "react";
import { Container, Typography, Box } from "@material-ui/core";

import { FullScreenLoader } from "../../utils/Spinners/FullScreenSpinner";
import { WeatherWidget } from "../../components/WeatherWidget";

export default function WeatherDashboard() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Container maxWidth="md">
        <Typography variant="h3">
          <Box textAlign="center" paddingTop={10} paddingBottom={10}>
            Hello Weather Forecast
          </Box>
        </Typography>
        <WeatherWidget />
      </Container>
    </Suspense>
  );
}
