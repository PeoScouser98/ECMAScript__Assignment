import instance from "./axios.config";

export const create = async (category) => {
	try {
		return await instance.post("/categories", category);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const update = async (category, id) => {
	try {
		return await instance.patch(`categories/${id}`, category);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const del = async (id) => {
	try {
		return await instance.delete(`/categories/${id}`);
	} catch (error) {
		return Promise.reject(error);
	}
};
