import axios from "axios";

const apiEP = import.meta.env.PROD
  ? "/api/v1/users"
  : "http://localhost:8000/api/v1/users";

// Using method, URL to minimize the code

const apiProcessor = async ({ method, data }) => {
  try {
    const response = await axios({ method, url: apiEP, data });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// Using POST Method to get data from backend
export const postTask = async (data) => {
  const obj = {
    method: "post",
    data,
  };
  return apiProcessor(obj);
};

// Using GET Method
export const getTask = async () => {
  const obj = {
    method: "get",
  };
  return apiProcessor(obj);
};

// Using PATCH Method

export const patchTask = async (data) => {
  const obj = {
    method: "patch",
    data,
  };
  return apiProcessor(obj);
};

// DELETE Method

export const deleteTask = async (data) => {
  const obj = {
    method: "delete",
    data,
  };
  return apiProcessor(obj);
};
