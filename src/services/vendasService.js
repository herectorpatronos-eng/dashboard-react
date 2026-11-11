import api from "./api"

const vendasService = {
    getAll: async () => {
        return await api.get(`/vendas/`)
    },
    getById: async (id) => {
        return await api.get(`/vendas/?id=${id}`)
    },
    getByName: async (name) => {
        return await api.get(`/vendas/?name=${name}`)
    },
    getByCity: async (city) => {
        return await api.get(`/vendas/?city=${city}`)
    },
    getBySearch: async (search) => {
        return await api.get(`/vendas/?search=${search}`)
    },
    create: async (dados) => {
        return await api.post(`/vendas/`, dados)
    },
    update: async (id, dados) => {
        return await api.put(`/vendas/?id=${id}`, dados)
    },
    delete: async (id) => {
        return await api.delete(`/vendas/?id=${id}`)
    },
}

export default vendasService;