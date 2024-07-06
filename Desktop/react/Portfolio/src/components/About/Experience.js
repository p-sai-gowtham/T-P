import React from 'react';
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Experience.css';

const experiences = [
    {
      company: 'Symbiosis Technologies',
      role: 'React Developer Intern',
      description: 'As a React developer, I boosted team efficiency by 60% through developing reusable components and enhanced site performance by 70% with precise UI designs. I led initiatives to ensure timely project delivery and introduced new tools, increasing development workflow efficiency by 50%',
      duration: 'May 2024 - June 2024'
    },
    {
      company: 'CGeeksForGeeks LIET',
      role: 'Technical Associate',
      description: 'I primarily maintained the club website, achieving 90% uptime to ensure seamless operations. By implementing strategic performance optimizations, I increased the website speed by 30%. Additionally, I collaborated with the team to develop over 5 new features, significantly enhancing the websites functionality',
      duration: 'May 2023 - present'
    },
    // Add more experiences as needed
  ];
const ExperienceSection = () => {
  return (
    <section id="experience" className="py-5">
    <div className="container">
      <h2 className="text-center mb-4">Experience</h2>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {experiences.map((experience, index) => (
          <Col xs={12} md={6} lg={3} className="experience-col" key={index}>
            <div className="experience-card">
              <h5 className="experience-role">{experience.role}</h5>
              <h6 className="experience-company">{experience.company}</h6>
              <p className="experience-description">{experience.description}</p>
              <p className="experience-duration">
                <small>{experience.duration}</small>
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  </section>
  );
};

export default ExperienceSection;
