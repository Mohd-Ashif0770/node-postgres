import api from "../lib/api";

export const getCategory = async () => 
    await api.get("/category")

