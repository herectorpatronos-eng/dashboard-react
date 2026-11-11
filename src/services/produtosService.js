import api from "./api"

const produtosService = {
    getAll: async () => {
        return await api.get(`/produtos/`)
    },
    getById: async (id) => {
        return await api.get(`/produtos/?id=${id}`)
    },
    getByName: async (name) => {
        return await api.get(`/produtos/?name=${name}`)
    },
    getByCity: async (city) => {
        return await api.get(`/produtos/?city=${city}`)
    },
    getBySearch: async (search) => {
        return await api.get(`/produtos/?search=${search}`)
    },
    create: async (dados) => {
        return await api.post(`/produtos/`, dados)
    },
    update: async (id, dados) => {
        return await api.put(`/produtos/?id=${id}`, dados)
    },
    delete: async (id) => {
        return await api.delete(`/produtos/?id=${id}`)
    },
}

export default produtosService;