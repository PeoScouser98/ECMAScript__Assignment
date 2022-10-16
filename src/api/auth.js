import instance from "./axios.config";
import toast from "../components/toast";


export const refreshToken = async () => {
	const auth = JSON.parse(localStorage.getItem("auth"))
	if (auth)
		return await instance.post(`/refresh-token/${auth.id}`)
}


export const getUser = async () => {
	const auth = JSON.parse(localStorage.getItem("auth"))
	if (!auth)
		return
	const user = await instance.get(`/users/${auth.id}`)
	return user ?? await instance.get(`/users/${auth.id}`)

}


export const isAdmin = async () => {
	const user = await getUser()
	if (user && user.role == 1)
		return true
	else {
		toast("error", "You don't have permission to access this page!");
		location.href = "/#/";
		return false
	}

};


export const signin = async (data) => {
	return await instance.post("/login", data);
};

export const signup = async (data) => {
	return await instance.post("/register", data);
};

export const logout = () => {
	localStorage.removeItem("auth");
	localStorage.removeItem("accessToken");
	location.href = "/#/";
	location.reload();
};
