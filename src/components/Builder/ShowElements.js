import React, { useState } from "react";
import BasicInfo from "./Form/BasicInfo";
import Experiances from "./Form/Experiances";
import Educations from "./Form/Educations";
import Skills from "./Form/Skills";
import Projects from "./Form/Projects";
import Achivements from "./Form/Others/Achivements";
import Others from "./Form/Others/Index";

import Resume from "./view/ViewResume";

const ShowElements = ({ currentTab,setActiveTab }) => {

  const [id, setId] = useState('');

  switch (currentTab) {
    case "basic info":
      return <BasicInfo setActiveTab={setActiveTab} id={id} setId={setId} />;
    case "work experience":
      return <Experiances setActiveTab={setActiveTab} id={id}  />;
    case "education":
      return <Educations setActiveTab={setActiveTab} id={id}  />;
    case "skills":
      return <Skills setActiveTab={setActiveTab} id={id}  />;
    case "projects":
      return <Projects setActiveTab={setActiveTab} id={id}  />;
    case "others":
      return <Others setActiveTab={setActiveTab} id={id}  />;

      case "view":
        return <Resume  id={id} />;

    default:
      return null;
  }
};

export default ShowElements;
