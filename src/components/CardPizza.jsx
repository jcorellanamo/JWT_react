import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Importar el contexto

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const { addToCart } = useContext(CartContext); // Usar el método addToCart del contexto

  return (
    <div className="card">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Ingredientes: {ingredients.join(', ')}</p>
        <p className="card-text">Precio: ${price.toLocaleString()}</p>
        <button
          onClick={() => addToCart({ id, name, price, ingredients, img })} // Llamar a addToCart
          className="btn btn-primary"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default CardPizza;
