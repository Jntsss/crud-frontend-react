import React, { useState, useEffect } from 'react';
import { buscarProdutos, deletarProduto } from '../services/api';

const TabelaProdutos = ({ onEditarProduto }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função para carregar produtos da API
  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarProdutos();
      setProdutos(dados);
    } catch (error) {
      setErro('Erro ao carregar produtos: ' + error.message);
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Função para deletar produto
  const handleDeletar = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o produto "${nome}"?`)) {
      try {
        await deletarProduto(id);
        // Recarregar a lista após deletar
        await carregarProdutos();
        alert('Produto deletado com sucesso!');
      } catch (error) {
        setErro('Erro ao deletar produto: ' + error.message);
        console.error('Erro ao deletar produto:', error);
      }
    }
  };

  // Carregar produtos quando o componente montar
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Formatar preço para exibição
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  if (carregando) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>{erro}</p>
        <button onClick={carregarProdutos} style={{ marginTop: '10px' }}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Produtos</h2>
      
      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd',
                  fontWeight: 'bold'
                }}>
                  Nome
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  borderBottom: '2px solid #ddd',
                  fontWeight: 'bold'
                }}>
                  Preço
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '2px solid #ddd',
                  fontWeight: 'bold'
                }}>
                  Estoque
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '2px solid #ddd',
                  fontWeight: 'bold'
                }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee'
                  }}>
                    {produto.nome}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #eee',
                    fontWeight: 'bold',
                    color: '#2e7d32'
                  }}>
                    {formatarPreco(produto.preco)}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{
                      backgroundColor: produto.quantidadeEstoque > 0 ? '#e8f5e8' : '#ffebee',
                      color: produto.quantidadeEstoque > 0 ? '#2e7d32' : '#c62828',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {produto.quantidadeEstoque}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {onEditarProduto && (
                        <button
                          onClick={() => onEditarProduto(produto)}
                          style={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
                        >
                          Editar
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletar(produto.id, produto.nome)}
                        style={{
                          backgroundColor: '#d32f2f',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#b71c1c'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#d32f2f'}
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={carregarProdutos}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Atualizar Lista
        </button>
      </div>
    </div>
  );
};

export default TabelaProdutos;

