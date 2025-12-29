
export default function ProductCard({ product, onAdd }) {
  return (
    <div
      className="productCard"
      onClick={() => onAdd(product)}
    >
      <img
        className="productImage"
        src={product.image}
        alt={product.name}
      />
      <h4>{product.name}</h4>
      <p>{product.price} DH</p>
    </div>
  );
}

