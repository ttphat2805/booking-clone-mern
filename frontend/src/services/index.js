import { Config } from "../config";
import axiosInstance from "./axiosInstance";

// AUTH

const Login = (data) => {
  return axiosInstance.post(`${Config.apiUrl}/auth/login`, data);
};

const deleteUser = (id) => {
  return axiosInstance.delete(`${Config.apiUrl}/user/${id}`);
};

const Register = (data) => {
  return axiosInstance.post(`${Config.apiUrl}/auth/register`, data);
};

// UPLOAD IMAGE
const uploadImage = (data) => {
  return axiosInstance.post(
    "https://api.cloudinary.com/v1_1/djuk3wjsq/image/upload",
    data
  );
};

// CREATE HOTELS

const createHotel = (data) => {
  return axiosInstance.post(`${Config.apiUrl}/hotel`, data);
};

// CREATE ROOMS

const createRooms = (id, data) => {
  return axiosInstance.post(`${Config.apiUrl}/room/${id}`, data);
};

export const authServices = {
  Login,
  deleteUser,
  uploadImage,
  Register,
  createHotel,
  createRooms,
};
