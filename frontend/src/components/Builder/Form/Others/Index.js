import React, { useEffect, useState } from "react";
import Interest from "./Interest";
import Referances from "./Referances";
import { useGlobalAppContext } from "@/context/context";
import UserLanguages from "./Languages";
import UserAchivements from "./Achivements";

const Others = (props) => {
  const {
    fetchResumedata,
    id
  } = useGlobalAppContext();

  const [Languages, setLanguages] = useState([]);
  const [interests, setInterestes] = useState([]);
  const [references, setReferences] = useState([]);
  const [achivements, setAchivements] = useState([]);

  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    if (res?.result) {
      setLanguages(res.result.languages);
      setAchivements(res.result.awards);
      setReferences(res.result.references);
      setInterestes(res.result.interests);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  return (
    <div>
      <UserLanguages Languages={Languages} setLanguages={setLanguages}  />
      <Interest interests={interests} setInterestes={setInterestes} />
      <Referances references={references} setReferences={setReferences} />
      <UserAchivements achivements={achivements} setAchivements={setAchivements} />
    </div>
  );
};

export default Others;
