const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const api = {
    get: async (endpoint) => {
        return request(endpoint, "GET");
    },
    post: async (endpoint, dados) => {
        return request(endpoint, "POST", dados);
    },
    put: async (endpoint, dados) => {
        return request(endpoint, "PUT", dados);
    },
    delete: async (endpoint) => {
        return request(endpoint, "DELETE");
    },
}

async function request(endpoint, method, dados = null) {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (dados) {
        // Converter objeto em JSON
        config.body = JSON.stringify(dados);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        // Verifica se a resposta é 204 (No content)
        if (response.status === 204) {
            return null;
        }
        // Organiza a resposta em JSON
        const data = await response.json();
        // Verifica se deu falha na requisição
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${data.message}`);
        }
        // Retorna os dados em JSON
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

export default api;