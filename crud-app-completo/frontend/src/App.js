import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:3001/api/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>CRUD con React y Node</h1>
      <ItemForm fetchItems={fetchItems} selectedItem={selectedItem} clearSelectedItem={() => setSelectedItem(null)} />
      <ItemList items={items} fetchItems={fetchItems} selectItem={setSelectedItem} />
    </div>
  );
}

export default App;