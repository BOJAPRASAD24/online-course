import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const register = (username, email, mobile, password) => {
  return axios.post(`${BASE_URL}/api/register/`, {
    username,
    email,
    mobile,
    password,
  });
};


export const login = (email, password) =>
  axios.post(`${BASE_URL}/token/`, { email, password });

export const getUsers = () => axiosInstance.get('/register/');
export const registerUser = (data) => axiosInstance.post('/register/', data);

export const getCourses = () => axiosInstance.get('/course/');
export const createCourse = (data) => axiosInstance.post('/course/', data);

export const getStudents = () => axiosInstance.get('/student/');
export const createStudent = (data) => axiosInstance.post('/student/', data);

