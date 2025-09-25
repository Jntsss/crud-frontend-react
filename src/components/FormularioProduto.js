import React, { useState, useEffect } from 'react';
import { criarProduto, atualizarProduto, buscarProdutoPorId } from '../services/api';

const FormularioProduto = ({ produtoParaEditar, onProdutoSalvo, onCancelar }) => {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    quantidadeEstoque: ''
  });
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Verificar se é modo de edição
  const isEditando = produtoParaEditar && produtoParaEditar.id;

  // Carregar dados do produto quando estiver editando
  useEffect(() => {
    if (isEditando) {
      carregarProdutoParaEdicao();
    } else {
      resetarFormulario();
    }
  }, [produtoParaEditar]);

  // Função para carregar produto para edição
  const carregarProdutoParaEdicao = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const produto = await buscarProdutoPorId(produtoParaEditar.id);
      setFormData({
        nome: produto.nome || '',
        preco: produto.preco ? produto.preco.toString() : '',
        quantidadeEstoque: produto.quantidadeEstoque ? produto.quantidadeEstoque.toString() : ''
      });
    } catch (error) {
      setErro('Erro ao carregar produto para edição: ' + error.message);
      console.error('Erro ao carregar produto:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Função para resetar formulário
  const resetarFormulario = () => {
    setFormData({
      nome: '',
      preco: '',
      quantidadeEstoque: ''
    });
    setErro(null);
  };

  // Função para lidar com mudanças nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (erro) {
      setErro(null);
    }
  };

  // Função para validar formulário
  const validarFormulario = () => {
    const { nome, preco, quantidadeEstoque } = formData;

    if (!nome.trim()) {
      setErro('Nome é obrigatório');
      return false;
    }

    if (!preco || isNaN(parseFloat(preco)) || parseFloat(preco) <= 0) {
      setErro('Preço deve ser um número maior que zero');
      return false;
    }

    if (!quantidadeEstoque || isNaN(parseInt(quantidadeEstoque)) || parseInt(quantidadeEstoque) < 0) {
      setErro('Quantidade em estoque deve ser um número maior ou igual a zero');
      return false;
    }

    return true;
  };

  // Função para submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      const dadosProduto = {
        nome: formData.nome.trim(),
        preco: parseFloat(formData.preco),
        quantidadeEstoque: parseInt(formData.quantidadeEstoque)
      };

      let produtoSalvo;
      if (isEditando) {
        produtoSalvo = await atualizarProduto(produtoParaEditar.id, dadosProduto);
      } else {
        produtoSalvo = await criarProduto(dadosProduto);
      }

      // Chamar callback para notificar componente pai
      if (onProdutoSalvo) {
        onProdutoSalvo(produtoSalvo);
      }

      // Resetar formulário se não estiver editando
      if (!isEditando) {
        resetarFormulario();
      }

      alert(isEditando ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');

    } catch (error) {
      setErro(`Erro ao ${isEditando ? 'atualizar' : 'criar'} produto: ` + error.message);
      console.error(`Erro ao ${isEditando ? 'atualizar' : 'criar'} produto:`, error);
    } finally {
      setCarregando(false);
    }
  };

  // Função para cancelar edição
  const handleCancelar = () => {
    resetarFormulario();
    if (onCancelar) {
      onCancelar();
    }
  };

  if (carregando && isEditando) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Carregando dados do produto...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px',
      margin: '20px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>
        {isEditando ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h2>

      {erro && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #ffcdd2'
        }}>
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Nome do Produto *
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1976d2'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            disabled={carregando}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Preço (R$) *
          </label>
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1976d2'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            disabled={carregando}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Quantidade em Estoque *
          </label>
          <input
            type="number"
            name="quantidadeEstoque"
            value={formData.quantidadeEstoque}
            onChange={handleChange}
            placeholder="0"
            min="0"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1976d2'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            disabled={carregando}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={carregando}
            style={{
              backgroundColor: carregando ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: carregando ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => !carregando && (e.target.style.backgroundColor = '#1565c0')}
            onMouseOut={(e) => !carregando && (e.target.style.backgroundColor = '#1976d2')}
          >
            {carregando ? 'Salvando...' : (isEditando ? 'Atualizar' : 'Adicionar')}
          </button>

          <button
            type="button"
            onClick={handleCancelar}
            disabled={carregando}
            style={{
              backgroundColor: carregando ? '#ccc' : '#757575',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: carregando ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => !carregando && (e.target.style.backgroundColor = '#616161')}
            onMouseOut={(e) => !carregando && (e.target.style.backgroundColor = '#757575')}
          >
            {isEditando ? 'Cancelar' : 'Limpar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioProduto;

