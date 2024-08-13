import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./pages/Home"; // Home as the layout
import Body from "./pages/Body"; // Main content component
import Detail from "./components/Detail"; // Component for team details
import DriveData from "./scenes/Drives"; // Component for drives
import SigninMain from "./pages/SigninMain"; // Component for sign-in
import Team from "./scenes/team"; // Component for teams

function App() {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, // Use Home as the layout
      children: [
        {
          path: "/", // Default child route
          element: <Body />, // Load Body content within Home's Outlet
        },
        {
          path: "team", // Route for teams
          element: <Team />, // Load Team content within Home's Outlet
        },
        {
          path: "teams/:id", // Dynamic route for team details
          element: <Detail />, // Load Detail component
        },
        {
          path: "drives", // Route for drives
          element: <DriveData />, // Load DriveData component
        },
        {
          path: "signin", // Route for sign-in page
          element: <SigninMain />, // Load SigninMain component
        },
        // Add more routes as needed
      ],
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
