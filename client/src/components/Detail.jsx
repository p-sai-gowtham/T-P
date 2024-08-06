import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import StudentCard from "./StudentCard";
import ResultCard from "./ResultCard";

const Detail = () => {
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState({});
  const [result, setResult] = useState([]);

  useEffect(() => {
    getStudentData();
  }, [id]);

  const getStudentData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/student/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudentDetail(data);
      setResult(data.tests);
      
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
 

  return (
    <Box m="20px">
      <StudentCard details={studentDetail} />
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        {result.map((data, index) => (
          <ResultCard key={index} test={data} />
        ))}
      </Box>
    </Box>
  );
};

export default Detail;
