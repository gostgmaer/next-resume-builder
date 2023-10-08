// components/Loader.js

import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 h-screen z-50">
     <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
   </div>
  );
};

export default Loader;
