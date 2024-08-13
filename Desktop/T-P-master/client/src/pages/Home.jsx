import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbars/MainNavbar";
import Footer from "../components/Footers/MainFooter";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const NAVBAR_HEIGHT = 64; // Define the value of NAVBAR_HEIGHT

  return (
    <div>
      <Navbar />
      <Box 
        sx={{ 
          mt: `${NAVBAR_HEIGHT}px`, // Use margin-top instead of padding-top
          bgcolor: "#161b2d", 
          minHeight: "100vh", // Ensure the Box takes at least the full viewport height
          position: "relative",
        }}
      >
        <Outlet /> 
      </Box>
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

export default Home;
