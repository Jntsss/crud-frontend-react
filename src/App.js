import React, { useState } from 'react';
import './App.css';
import TabelaProdutos from './components/TabelaProdutos';
import FormularioProduto from './components/FormularioProduto';

function App() {
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  const handleProdutoSalvo = (produto) => {
    // O componente TabelaProdutos já recarrega automaticamente
    // Aqui podemos adicionar lógica adicional se necessário
    console.log('Produto salvo:', produto);
  };

  const handleCancelarEdicao = () => {
    setProdutoParaEditar(null);
  };

  const handleEditarProduto = (produto) => {
    setProdutoParaEditar(produto);
  };

  return (
    <div className="App">
      <h1>Gerenciamento de Produtos</h1>
      
      <FormularioProduto 
        produtoParaEditar={produtoParaEditar}
        onProdutoSalvo={handleProdutoSalvo}
        onCancelar={handleCancelarEdicao}
      />
      
      <hr />
      
      <TabelaProdutos onEditarProduto={handleEditarProduto} />
    </div>
  );
}

export default App;