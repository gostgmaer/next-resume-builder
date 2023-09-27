import React, { useState } from "react";
import BasicInfo from "./Form/BasicInfo";
import Experiances from "./Form/experiances/Experiances";
import Educations from "./Form/Educations";
import Skills from "./Form/Skills";
import Projects from "./Form/Projects";
import Achivements from "./Form/Others/Achivements";
import Others from "./Form/Others/Index";

import Resume from "./view/ViewResume";
import { useGlobalAppContext } from "@/context/context";

const ShowElements = ({ currentTab }) => {
  const { fetchResumedata, currentData,updateResumeRecord,activeTab, setActiveTab } = useGlobalAppContext();



  switch (currentTab) {
    case "basic info":
      return <BasicInfo  />;
    case "work experience":
      return <Experiances   />;
    case "education":
      return <Educations />;
    case "skills":
      return <Skills   />;
    case "projects":
      return <Projects   />;
    case "others":
      return <Others  />;

      case "view":
        return <Resume   />;

    default:
      return null;
  }
};

export default ShowElements;
