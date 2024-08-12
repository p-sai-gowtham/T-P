import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import StudentCard from "./StudentCard";
import ResultCard from "./ResultCard";

const Detail = () => {
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState(null);
  const [result, setResult] = useState(null);

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
      setResult(data.tests || {}); // Assuming `tests` is a property of the fetched data
    } catch (error) {
      console.error("Error fetching student data:", error);
      setStudentDetail(null);
      setResult(null);
    }
  };

  // Conditional rendering for no data found
  if (!studentDetail || !result || Object.keys(result).length === 0) {
    return (
      <Box m="20px">
        <h2>No data found</h2>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <StudentCard details={studentDetail} /> 
      {Object.entries(result).map(([companyName, testArray], index) => (
        <div key={index}>
          <h2>{companyName}</h2>
          <div style={{ display: 'flex' }}>
            {testArray.map((testObj, testIndex) => {
              const [testName, testData] = Object.entries(testObj)[0];
              return (
                <ResultCard 
                  key={testIndex} 
                  title={testName} 
                  test={testData} 
                />
              );
            })}
          </div>
        </div>
      ))}
    </Box>
  );
};

export default Detail;
