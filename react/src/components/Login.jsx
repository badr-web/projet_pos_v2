import { useState } from "react";

export default function Login({ onSuccess, onCancel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const accounts = [
    { email: "admin@gmail.com", password: "123" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const matched = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (matched) {
      setError(""); 
      onSuccess();
    } else {
      setError("Identifiants invalides. Vérifiez votre email et mot de passe.");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div className="form-row">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="button">
              Se connecter
            </button>
            <button type="button" className="button outline" onClick={onCancel}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
