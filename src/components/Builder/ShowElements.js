import React from "react";
import BasicInfo from "./Form/BasicInfo";
import Experiances from "./Form/Experiances";
import Educations from "./Form/Educations";
import Skills from "./Form/Skills";
import Projects from "./Form/Projects";
import Achivements from "./Form/Others/Achivements";
import Others from "./Form/Others/Index";

const ShowElements = ({ currentTab }) => {
  switch (currentTab) {
    case "basic info":
      return <BasicInfo />;
    case "work experience":
      return <Experiances />;
    case "education":
      return <Educations />;
    case "skills":
      return <Skills />;
    case "projects":
      return <Projects />;
    case "others":
      return <Others />;

    default:
      return null;
  }
};

export default ShowElements;
