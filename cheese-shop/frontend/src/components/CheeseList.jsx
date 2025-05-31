
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheeseList() {
  const [cheeses, setCheeses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchCheeses = async () => {
    const res = await axios.get("http://localhost:3001/cheeses");
    setCheeses(res.data);
  };

  useEffect(() => { fetchCheeses(); }, []);

  const deleteCheese = async (id) => {
    await axios.delete(`http://localhost:3001/cheeses/${id}`);
    fetchCheeses();
  };

  const updateCheese = async (cheese) => {
    await axios.put(`http://localhost:3001/cheeses/${cheese.id}`, cheese);
    setEditing(null);
    fetchCheeses();
  };

  return (
    <ul>
      {cheeses.map((cheese) =>
        editing === cheese.id ? (
          <li key={cheese.id}>
            <input value={cheese.name} onChange={(e) => cheese.name = e.target.value} />
            <input value={cheese.type} onChange={(e) => cheese.type = e.target.value} />
            <input value={cheese.price} onChange={(e) => cheese.price = e.target.value} />
            <button onClick={() => updateCheese(cheese)}>Guardar</button>
          </li>
        ) : (
          <li key={cheese.id}>
            {cheese.name} - {cheese.type} - ${cheese.price}
            <button onClick={() => setEditing(cheese.id)}>Editar</button>
            <button onClick={() => deleteCheese(cheese.id)}>Eliminar</button>
          </li>
        )
      )}
    </ul>
  );
}
