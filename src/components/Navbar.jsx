import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { token, logout } = useContext(UserContext); // Usar el contexto para cerrar sesión
  const { cart, calculateTotal } = useContext(CartContext); // Usar el contexto para obtener el carrito

  // Calcular el número total de productos en el carrito
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Pizzería Mamma Mía</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-dark nav-link" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          {/* Mostrar el total del carrito o la cantidad de productos */}
          <span className="navbar-text ms-auto">
            <Link to="/cart" className="btn btn-success">
              🛒 Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'}) - Total: ${calculateTotal().toLocaleString()}
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
