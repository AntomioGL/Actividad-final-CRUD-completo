import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ fetchItems, selectedItem, clearSelectedItem }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedItem) setName(selectedItem.name);
  }, [selectedItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      await axios.put(`http://localhost:3001/api/items/${selectedItem.id}`, { name });
      clearSelectedItem();
    } else {
      await axios.post('http://localhost:3001/api/items', { name });
    }
    setName('');
    fetchItems();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">{selectedItem ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default ItemForm;