// utils/axiosApi.js
import axios from "axios";
import { notifySuccess, notifyerror } from "./notify/notice";
import { parseCookies, setCookie } from "nookies";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your Firebase URL

const axiosInstance = axios.create({
  baseURL,
});
// axios.defaults.withCredentials=true

const cookies = parseCookies();
const token = cookies["accessToken"];
const session = cookies["session"];
export const get = async (endpint, id, query, recordID) => {
  //   let recordID,
  let reqUrl = undefined;
  if (recordID) {
    reqUrl = baseURL + endpint + `/${id}`;
  }
  if (!recordID) {
    reqUrl = baseURL + endpint;
  }
  const option = {
    method: "get",
    url: reqUrl,
    headers: {
      Authorization: token,
      session_id: session,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);

    if (!endpint.includes("session")) {
      notifySuccess(response.data.message, 2000);
    }
  } catch (e) {
    error = e.response.data;
    if (!endpint.includes("session")) {
      notifyerror(e.response.data.message, 2000);
    }

    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const getSingleRecord = async (endpoint, id) => {
  try {
    const response = await axiosInstance.get(endpoint + "/" + id + ".json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (endpint, data) => {
  const option = {
    method: "post",
    url: baseURL + endpint,
    headers: {
      Authorization: token,
      session_id: session,
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
    if (!endpint.includes("session")) {
      notifySuccess(response.data.message, 2000);
    }
  } catch (e) {
    error = e.response.data;
    if (!endpint.includes("session")) {
      notifyerror(e.response.data.message, 2000);
    }
    throw new Error(JSON.stringify(e.response.data));
  }

  // if success return value
  return response?.data ? response?.data : error; // or set initial value
};

export const put = async (endpint, id, data) => {
  const option = {
    method: "put",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: token,
      session_id: session,
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
    notifySuccess(response.data.message, 2000);
  } catch (e) {
    error = e.response.data;
    notifyerror(e.response.data.message, 2000);
    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const del = async (endpint, id) => {
  const option = {
    method: "delete",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: token,
      session_id: session,
    },
    params: {},
    data: {},
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
    notifySuccess(response.data.message, 2000);
  } catch (e) {
    error = e.response.data;
    notifyerror(e.response.data.message, 2000);
    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
