import React, { Suspense } from "react";
import { Container, Typography, Box } from "@material-ui/core";

import { FullScreenLoader } from "../../utils/Spinners/FullScreenSpinner";
import { getToken } from "../../services/Authentication";

import { WeatherWidget } from "../../components/WeatherWidget";
import { isUserAuthenticated } from "../../services/Authentication";

export default function WeatherDashboard() {
  const getRequestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${getToken()}`,
    },
  };

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Container maxWidth="md">
        <Typography variant="h3">
          <Box textAlign="center" paddingTop={10} paddingBottom={10}>
            Hello Weather Forecast
          </Box>
        </Typography>
        {isUserAuthenticated() && (
          <WeatherWidget getRequestOptions={getRequestOptions} />
        )}
      </Container>
    </Suspense>
  );
}
