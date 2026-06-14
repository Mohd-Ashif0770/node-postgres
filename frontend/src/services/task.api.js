import api from "../lib/api";

export const getAllTask = async () => 
    await api.get("/task")

export const createTask = async (data) => 
    await api.post("/task",data)

export const updateTask = async (id, data) => 
    await api.put(`/task/${id}`, data)

export const updateTaskStatus = async (id) => 
    await api.patch(`/task/${id}`)

export const deleteTask = async (id) => 
    await api.delete(`/task/${id}`)