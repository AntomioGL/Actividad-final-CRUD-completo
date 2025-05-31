import React from 'react';
import axios from 'axios';

const ItemList = ({ items, fetchItems, selectItem }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/items/${id}`);
    fetchItems();
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => selectItem(item)}>Editar</button>
          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;