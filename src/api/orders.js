import instance from "./axios.config"

export const getAll = async () => {
    try {
        return await instance.get("/orders?_expand=status")
    } catch (error) {

    }
}

export const getOne = async (id) => {
    try {
        return await instance.get(`/orders/${id}`)
    } catch (error) {

    }
}

export const create = async (order) => {
    try {
        return await instance.post('/orders', { statusId: 0, ...order })

    } catch (error) {

    }
}

export const update = async (id, data) => {
    try {

    } catch (error) {

    }

}