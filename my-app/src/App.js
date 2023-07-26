import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

function App() {
  const [transactions, setTransactions] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFormSubmit = (formData) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: Date.now(),
        ...formData,
      },
    ]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter transactions based on the search term
  const filteredTransactions = transactions
    ? transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <h1>Bank of Flatiron</h1>
      <TransactionForm onSubmit={handleFormSubmit} />
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by description..."
        />
      </div>
      {transactions && <TransactionList transactions={filteredTransactions} />}
    </div>
  );
}

export default App;
