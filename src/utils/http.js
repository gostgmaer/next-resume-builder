// utils/axiosApi.js
import axios from "axios";
import { getDatabase, ref, onValue, set, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
const database = getDatabase();
const baseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL; // Replace with your Firebase URL

const axiosInstance = axios.create({
  baseURL,
});

export const get = async (endpoint, queryParams) => {
  try {
    const response = await axiosInstance.get(endpoint + ".json", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleRecord = async (endpoint, id) => {
  try {
    const response = await axiosInstance.get(endpoint + "/" + id + ".json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFire = async (endpoint, data) => {
  // set(ref(database,  `${endpoint}/` + 1), data)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const cartId = "your_cart_id"; // Replace with the actual cart ID
  const cartRef = ref(database, "cart/" + cartId);

  set(cartRef, data)
    .then(() => {
      // Success callback
      console.log("Data has been successfully written to the database.");
    })
    .catch((error) => {
      // Error callback
      console.error("Error writing data to the database:", error);
    });
};

export function writeUserData(endpoint, id, data) {
  const db = getDatabase();
  set(ref(db, endpoint + "/" + id), { ...data })
    .then((res) => {
      return id;
    })
    .catch((error) => {
      console.error("Write error:", error);
    });
  return id;
}

export function readSingleData(endpoint, id) {
  const db = getDatabase();
  const userId = id; // Replace with the actual user ID or the path to the data you want to read

  const dataRef = ref(db, "resume/" + userId); // Reference to the location you want to read from

  get(dataRef)
    .then((snapshot) => {
      console.log(snapshot);
      if (snapshot) {
      
        return snapshot
      } else {
        // Data does not exist at the specified location
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
