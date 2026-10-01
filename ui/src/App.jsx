import { useEffect, useState } from "react";

async function fetchItems() {
  const res = await fetch("/api/items");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  async function addItem(e) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setName("");
      setItems(await fetchItems());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Items</h1>

      <form onSubmit={addItem}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
        <button type="submit">Add item</button>
      </form>

      {error && <p role="alert">Couldn't reach the API: {error}</p>}

      {items.length === 0 ? (
        <p>No items yet. Add one above.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}