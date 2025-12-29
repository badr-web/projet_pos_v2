export default function Order({ cart, total, onValidate, onCancel }) {
  return (
    <div className="order">
      <h2>Commande</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th className="cell-product">Produit</th>
            <th className="cell-price">PU</th>
            <th className="cell-qty">Qté</th>
            <th className="cell-total">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="cell-product">{item.name}</td>
              <td className="cell-price">{item.price} DH</td>
              <td className="cell-qty">{item.qty}</td>
              <td className="cell-total">{(item.price * item.qty).toFixed(2)} DH</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <h3>Total commande : {total.toFixed(2)} DH</h3>

      <div className="order-actions">
        <button className="button" onClick={onValidate}>
          Valider
        </button>
        <button className="button secondary" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
}
