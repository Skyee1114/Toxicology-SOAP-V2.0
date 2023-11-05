import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const About = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: "1rem" }}>
        About Toxsoap:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Toxsoap is a revolutionary web application meticulously crafted by Dr.
        Omid Mehrpour in close collaboration with Certified SPI Dr. Mario
        Marini. Tailored to the distinctive needs of healthcare providers, it
        serves Specialists in Poison Information (SPIs), medical toxicologists,
        fellows, and a wide range of other healthcare practitioners. Toxsoap
        harnesses cutting-edge technology to simplify and streamline the
        creation of SOAP notes, an essential component of patient care
        documentation.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Our user-friendly web application allows seamless input of vital
        information such as caller data, patient details, clinical assessment
        findings, and advice suggested by SPIs. This information is seamlessly
        woven into a comprehensive, well-structured SOAP (Subjective, Objective,
        Assessment, and Plan) note. As a result, Toxsoap emerges as an
        invaluable tool for healthcare professionals, fostering effective
        communication and ensuring continuity of care.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        By automating this process, Toxsoap reduces potential human errors and
        saves substantial time, facilitating a streamlined workflow. This
        efficiency liberates healthcare providers to focus on their patients'
        needs rather than paperwork.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Our mission with Toxsoap is to cultivate clarity, efficiency, and
        accuracy in healthcare communication. We are firmly committed to the
        belief that by enhancing documentation practices, we can improve patient
        outcomes and elevate healthcare standards.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        In our commitment to constant growth and evolution, we aspire to
        continually refine and enhance Toxsoap to meet the dynamic needs of the
        healthcare community. Your feedback is key to this process, and we are
        grateful for your collaboration in refining our tool. To further assist
        SPIs, we've integrated an AI assistant to hasten decision-making and
        provided a chatbot for any queries regarding the generated notes. We are
        grateful for joining us in pursuing excellence in healthcare
        communication.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Patent pending: 18/363,772
      </Typography>
    </Box>
  );
};

export default About;
