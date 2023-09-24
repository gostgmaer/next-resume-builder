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

  const [id, setId] = useState(undefined);

  switch (currentTab) {
    case "basic info":
      return <BasicInfo  id={id} setId={setId} />;
    case "work experience":
      return <Experiances  id={id}  />;
    case "education":
      return <Educations  id={id}  />;
    case "skills":
      return <Skills  id={id}  />;
    case "projects":
      return <Projects  id={id}  />;
    case "others":
      return <Others id={id}  />;

      case "view":
        return <Resume  id={id} />;

    default:
      return null;
  }
};

export default ShowElements;
