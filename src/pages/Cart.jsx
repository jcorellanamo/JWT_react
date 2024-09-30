import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      setMessage('Debes iniciar sesión para realizar la compra.');
      setSuccess(false); // Cuando no hay token da error
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Autoriza Bearer
        },
        body: JSON.stringify({ cart }), // Envía el carrito
      });

      if (response.ok) {
        setMessage('Compra realizada con éxito.');
        setSuccess(true); // Cuando funciona
      } else {
        setMessage('Error al realizar la compra.');
        setSuccess(false);
      }
    } catch (error) {
      setMessage('Error al realizar la compra.');
      setSuccess(false); // Cuando hay error
    }
  };

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={item.img} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                  <span>{item.name}</span>
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <h4>Total: ${calculateTotal().toLocaleString()}</h4>
          {message && (
            <div className={`alert mt-3 ${success ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}
          <button className="btn btn-primary" onClick={handleCheckout} disabled={cart.length === 0 || !token}>
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
