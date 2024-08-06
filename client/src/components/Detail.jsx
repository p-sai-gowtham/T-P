import React from "react";
import StudentCard from "./StudentCard";
import ResultCard from "./ResultCard";
import { useState, useEffect } from "react";
// Sample data
const examCard = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 4,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 5,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 6,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 7,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
];

const Detail = () => {
  const [studentDetail, setStudentDetail] = useState({});
  useEffect(() => {
    getStudentData();
  }, []);
  const getStudentData = async () => {
    const data = await fetch("");
    const dataJson = await data.json();
    setStudentDetail(dataJson);
  };
  return (
    <div>
      <StudentCard />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {examCard.map((card) => (
          <ResultCard
            key={card.id}
            id={card.id}
            name={card.name}
            email={card.email}
            phone={card.phone}
            access={card.access}
          />
        ))}
      </div>
    </div>
  );
};

export default Detail;
