import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (userData) => 
    axios.post(`${API_URL}/auth/register`, userData);

export const loginUser = (userData) => 
    axios.post(`${API_URL}/auth/login`, userData);

export const logoutUser = () => 
    axios.post(`${API_URL}/auth/logout`);

export const saveProject = (projectData, token) => 
    axios.post(`${API_URL}/projects`, projectData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const getUserProjects = (userId, token) => {
    return axios.get(`${API_URL}/projects/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteProject = (projectId, token) => {
    return axios.delete(`${API_URL}/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

