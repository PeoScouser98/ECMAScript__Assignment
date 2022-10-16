import instance from "./axios.config";

export const getAll = async () => {
	try {
		return await instance.get("/products?_expand=category")
	} catch (error) {
		return Promise.reject(error)
	}
}

export const create = async (product) => {
	try {
		return await instance.post("/products", product);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const update = async (id, product) => {
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
