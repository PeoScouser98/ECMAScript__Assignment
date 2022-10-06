import axios from "axios";

const instance = axios.create({
	baseURL: "http://my-json-server.typicode.com/PeoScouser98/ecmascript/",
});
instance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default instance;
