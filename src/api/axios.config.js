import axios from "axios";
import { refreshToken } from "./auth";

const instance = axios.create({
	baseURL: "http://localhost:3001",
});
instance.interceptors.request.use(
	(config) => {
		const accessToken = instance.getAccessToken()
		if (accessToken)
			config.headers.authorization = `Bearer ${accessToken}`

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	async (response) => {

		if (response.data.statusCode == 401) {
			console.log("Access token has been expired!")
			const { accessToken } = await refreshToken()
			instance.setAccessToken(accessToken)
			console.log("New access token: ", accessToken);
		}



		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.getAccessToken = () => {
	return localStorage.getItem("accessToken")
}

instance.setAccessToken = (accessToken) => {
	localStorage.setItem("accessToken", accessToken)
}

export default instance;
