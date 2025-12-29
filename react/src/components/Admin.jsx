import { useState } from "react";

export default function Admin({ products, setProducts }) {
  const [form, setForm] = useState({ id: null, name: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      window.alert("Le nom du produit est requis.");
      return;
    }
    const price = parseFloat(form.price) || 0;
    const item = { name: form.name, price, image: form.image };

    try {
      if (editingId !== null) {
        await fetch(`http://localhost:3000/api/items/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        setProducts(products.map(p => p.id === editingId ? { ...p, ...item } : p));
      } else {
        const res = await fetch('http://localhost:3000/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        const newItem = await res.json();
        setProducts([...products, newItem]);
      }
      setForm({ id: null, name: "", price: "", image: "" });
      setEditingId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (p) => {
    setForm({ id: p.id, name: p.name, price: String(p.price), image: p.image || "" });
    setEditingId(p.id);
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'DELETE'
      });
      setProducts(products.filter(p => p.id !== id));
      if (editingId === id) {
        setForm({ id: null, name: "", price: "", image: "" });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin">
      <h2>Admin - Gérer les produits</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} />
        <input name="price" placeholder="Prix" value={form.price} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <div>
          <button className="button" type="submit">{editingId ? 'Enregistrer' : 'Ajouter'}</button>
          {editingId && (
            <button
              className="button secondary"
              type="button"
              onClick={() => { setForm({ id: null, name: "", price: "", image: "" }); setEditingId(null); }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price} DH</td>
              <td style={{ maxWidth: 120, overflow: 'hidden' }}>{p.image}</td>
              <td>
                <button className="button small" onClick={() => handleEdit(p)}>Edit</button>
                <button className="button small secondary" onClick={() => handleRemove(p.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
