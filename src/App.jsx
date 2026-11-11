import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import ClientsList from "./pages/clientes/ClientsList";
import ClientsForm from "./pages/clientes/ClientsForm";
import VendasForm from "./pages/vendas/VendasForm";
import { ToastContainer } from 'react-toastify';
import SuppliersList from "./pages/fornecedores/SuppliersList";
import SuppliersForm from "./pages/fornecedores/SuppliersForm";
import ProductsList from "./pages/produtos/ProductsList";
import ProductsForm from "./pages/produtos/ProductsForm";

function App() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<h1>Página Inicial</h1>} />
            {/* Rotas para Clientes */}
            <Route path="/clientes" element={<ClientsList />} />
            <Route path="/clientes/novo" element={<ClientsForm />} />
            <Route path="/clientes/edit/:id" element={<ClientsForm />} />
            {/* Rotas para Fornecedores */}
            <Route path="/fornecedores" element={<SuppliersList />} />
            <Route path="/fornecedores/novo" element={<SuppliersForm />} />
            <Route path="/fornecedores/edit/:id" element={<SuppliersForm />} />
            {/* Rotas para Produtos */}
            <Route path="/produtos" element={<ProductsList />} />
            <Route path="/produtos/novo" element={<ProductsForm />} />
            <Route path="/produtos/edit/:id" element={<ProductsForm />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
}

export default App;
