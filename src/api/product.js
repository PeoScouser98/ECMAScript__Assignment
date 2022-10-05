import instance from "./axios.config";

export const create = async (product) => {
	try {
		return await instance.post("/products", product);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const update = async (product, id) => {
	try {
		return await instance.patch(`/products/${id}`, product);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const del = async (id) => {
	try {
		return await instance.delete(`/products/${id}`);
	} catch (error) {
		return Promise.reject(error);
	}
};
