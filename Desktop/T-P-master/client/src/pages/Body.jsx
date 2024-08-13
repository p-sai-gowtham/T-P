import React from 'react';
import Section1 from '../containers/Section1';
import Section2 from '../containers/Section2';
import Section9 from '../containers/Section9';
import Section11 from '../containers/Section11';
import Box from '@mui/material/Box';

const Body = () => {
  return (
    <div>
      {/* Section 1 will take the top part, possibly with an image */}
      <Section1 />

      {/* Apply background color starting from Section 2 */}
      <Box sx={{ bgcolor: "#161b2d", minHeight: "100vh", pt: "20px" }}>
        <Section2 />
        <Section9 />
        <Section11 />
      </Box>
    </div>
  );
};

export default Body;
