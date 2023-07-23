import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFormSubmit = (formData) => {

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: Date.now(), // This will create a unique ID for the new transaction
        ...formData,
      },
    ]);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm onSubmit={handleFormSubmit} />
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by description..."
        />
      </div>
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default App;
