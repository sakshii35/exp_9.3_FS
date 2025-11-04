import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://<BACKEND-URL>:5000/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = async () => {
    await fetch('http://<BACKEND-URL>:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    });
    setInput('');
    // Refetch after adding
    fetch('http://<BACKEND-URL>:5000/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  return (
    <div style={{ margin: 50 }}>
      <h1>Item List</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item._id || item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
