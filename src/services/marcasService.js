import api from "./api"

const marcasService = {
    getAll: async () => {
        return await api.get(`/marcas/`)
    },
    getById: async (id) => {
        return await api.get(`/marcas/?id=${id}`)
    },
    getByName: async (marca) => {
        return await api.get(`/marcas/?marca=${marca}`)
    },
    getBySearch: async (search) => {
        return await api.get(`/marcas/?search=${search}`)
    },
    create: async (dados) => {
        return await api.post(`/marcas/`, dados)
    },
    update: async (id, dados) => {
        return await api.put(`/marcas/?id=${id}`, dados)
    },
    delete: async (id) => {
        return await api.delete(`/marcas/?id=${id}`)
    },
}

export default marcasService;