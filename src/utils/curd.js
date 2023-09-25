"use clint";
import { child, get, ref, remove, set, update } from "firebase/database";
import firebaseConfig from "../config/firebase";

export const selectData = () => {
  const dbref = ref(firebaseConfig());
  get(child(dbref, "resume/")).then((snapshop) => {
    if (snapshop.exists()) {
      console.log(snapshop.val);
    }
  });
};
