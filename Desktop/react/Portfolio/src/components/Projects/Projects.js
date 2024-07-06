import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import charity from "../../Assets/Projects/charity.png";
import youtube from "../../Assets/Projects/youtube.png";
import farmBuddy from "../../Assets/Projects/FarmBuddy.png"
import swaadh from "../../Assets/Projects/swaadh.png"
function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={farmBuddy}
              isBlog={false}
              title="FarmBuddy"
              description="Farm Buddy is an online marketplace connecting farmers directly with customers, eliminating intermediaries to reduce costs. It offers a learning platform for farming, uses HTML, CSS, Bootstrap, JavaScript, Google Firebase, t2d Server, and integrates various APIs and tools like DialogFlow, GitHub, and Trello."
              ghLink="https://github.com/SudhishAmiti/FarmBuddy"
              demoLink="https://farmbuddy2023.github.io/FarmBuddy/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={charity}
              isBlog={false}
              title="Cross Border Donations"
              description="A platform for cross-border donations to various charities worldwide. My responsibilities included creating a responsive React front-end, ensuring data integrity with blockchain, integrating PayPal API for seamless payments, and managing the project with Git for code integrity."
              ghLink="https://github.com/SudhishAmiti/cross_border_charity_donations"
              demoLink="https://cross-border-charity-donations.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={youtube}
              isBlog={false}
              title="Youtube Clone"
              description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
              ghLink="https://github.com/SudhishAmiti/React-Youtube-clone"
              demoLink="https://react-youtube-clone-silk.vercel.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={swaadh}
              isBlog={false}
              title="Swaadh"
              description="Afood ordering platform, setting up the React project from scratch. My work included deep dives into JSX, core React features, and important hooks, understanding Tailwind CSS basics, exploring React routing, handling live API data, distinguishing between functional and class-based components, diving into Redux and Redux Toolkit, and testing the app with Jest"
              ghLink="https://github.com/SudhishAmiti/Swaadh"
              
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
