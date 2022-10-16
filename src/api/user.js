import instance from "./axios.config";

export const getAll = async () => {
    try {
        return await instance.get("/users?role=0")
    } catch (error) {
        console.log(error)
    }
}



