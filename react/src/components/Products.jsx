import ProductCard from "./ProductCard";

export default function Products({ products, search, onSearchChange, onAdd }) {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products">
      
      {/* 🔹 HEADER STICKY */}
      <div className="products-header">
        <h2>Produits</h2>

        <input
          className="searchInput"
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={onSearchChange}
        />
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>

    </div>
  );
}
