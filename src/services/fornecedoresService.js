import api from "./api"

const fornecedoresService = {
    getAll: async () => {
        return await api.get(`/fornecedores/`)
    },
    getById: async (id) => {
        return await api.get(`/fornecedores/?id=${id}`)
    },
    getByName: async (name) => {
        return await api.get(`/fornecedores/?name=${name}`)
    },
    getByCity: async (city) => {
        return await api.get(`/fornecedores/?city=${city}`)
    },
    getBySearch: async (search) => {
        return await api.get(`/fornecedores/?search=${search}`)
    },
    create: async (dados) => {
        return await api.post(`/fornecedores/`, dados)
    },
    update: async (id, dados) => {
        return await api.put(`/fornecedores/?id=${id}`, dados)
    },
    delete: async (id) => {
        return await api.delete(`/fornecedores/?id=${id}`)
    },
}

export default fornecedoresService;