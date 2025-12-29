import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Products from "./components/Products";
import Order from "./components/Order";
import Admin from "./components/Admin";
import Login from "./components/Login";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [productsState, setProductsState] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/items')
      .then(res => res.json())
      .then(data => setProductsState(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  
  const rechercherProduits = (e) => {
    setSearch(e.target.value);
  };
  
  
  const ajouterProduitCommande = (product) => {
    const existe = cart.find((p) => p.id === product.id);

    if (existe) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };
  
  
  const calculerTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };
  
  
  const validerCommande = () => {
    if (cart.length === 0) {
      window.alert("Le panier est vide.");
      return;
    }
    
    
    window.onafterprint = () => {
      setCart([]);
      
      
      window.onafterprint = null;
    };
    window.print();
  };
  
  
  const annulerCommande = () => {
    if (cart.length === 0) return;
    setCart([]);
  };


  if (showLogin && !isAuthenticated) {
  return (
    <Login
      onSuccess={() => {
        setIsAuthenticated(true);
        setShowLogin(false);
        setIsAdmin(true);
      }}
      onCancel={() => setShowLogin(false)}
    />
  );
}

  return (
    <>
    <Navbar
      onToggleAdmin={() => {
        if (isAuthenticated) {
          setIsAdmin(!isAdmin);
        } else {
          setShowLogin(true);
        }
      }}
      isAdmin={isAdmin}
    />
    <div className="container">
      {isAdmin ? (
        <Admin
          products={productsState}
          setProducts={setProductsState}
        />
      ) : (
        <>
          <Products
            products={productsState}
            search={search}
            onSearchChange={rechercherProduits}
            onAdd={ajouterProduitCommande}
          />

          <Order
            cart={cart}
            total={calculerTotal()}
            onValidate={validerCommande}
            onCancel={annulerCommande}
          />
        </>
      )}
    </div>
    </>
  );
}

export default App;
