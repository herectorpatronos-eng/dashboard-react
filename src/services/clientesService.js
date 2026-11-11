import api from "./api"

const clientesService = {
    getAll: async () => {
        return await api.get(`/clientes/`)
    },
    getById: async (id) => {
        return await api.get(`/clientes/?id=${id}`)
    },
    getByName: async (name) => {
        return await api.get(`/clientes/?name=${name}`)
    },
    getByCity: async (city) => {
        return await api.get(`/clientes/?city=${city}`)
    },
    getBySearch: async (search) => {
        return await api.get(`/clientes/?search=${search}`)
    },
    create: async (dados) => {
        return await api.post(`/clientes/`, dados)
    },
    update: async (id, dados) => {
        return await api.put(`/clientes/?id=${id}`, dados)
    },
    delete: async (id) => {
        return await api.delete(`/clientes/?id=${id}`)
    },
}

export default clientesService;