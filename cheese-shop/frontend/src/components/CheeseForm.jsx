
import { useState } from "react";
import axios from "axios";

export default function CheeseForm() {
  const [form, setForm] = useState({ name: "", type: "", price: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/cheeses", form);
    setForm({ name: "", type: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Tipo" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
      <input placeholder="Precio" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <button type="submit">Agregar Queso</button>
    </form>
  );
}
