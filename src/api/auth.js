import instance from "./axios.config";

export const signin = async (data) => {
	return await instance.post("/login", data);
};

export const signup = async (data) => {
	return await instance.post("/register", data);
};

export const logout = () => {
	localStorage.removeItem("auth");
	localStorage.removeItem("accessToken");
	location.reload();
};
