import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api/produtos',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para buscar todos os produtos
export const buscarProdutos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Função para buscar um produto por ID
export const buscarProdutoPorId = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo produto
export const criarProduto = async (produto) => {
  try {
    const response = await api.post('/', produto);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

// Função para atualizar um produto
export const atualizarProduto = async (id, produto) => {
  try {
    const response = await api.put(`/${id}`, produto);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, error);
    throw error;
  }
};

// Função para deletar um produto
export const deletarProduto = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error(`Erro ao deletar produto com ID ${id}:`, error);
    throw error;
  }
};

// Exportar a instância do axios para uso direto se necessário
export default api;
