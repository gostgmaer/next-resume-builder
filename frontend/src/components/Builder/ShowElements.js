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

const ShowElements = ({ currentTab,data }) => {
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
  } = useGlobalAppContext();

  switch (currentTab) {
    case "basic info":
      return <BasicInfo data={data} />;
    case "work experience":
      return <Experiances data={data} />;
    case "education":
      return <Educations data={data} />;
    case "skills":
      return <Skills data={data} />;
    case "projects":
      return <Projects data={data} />;
    case "others":
      return <Others data={data} />;
    case "view":
      return <Resume data={data} />;

    default:
      return null;
  }
};

export default ShowElements;
