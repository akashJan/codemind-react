import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data that matches your API response structure
  const mockInventory = [
    { productId: 1, productName: "5kg", categoryName: "Gas Cylinder", quantity: 120, inTransit: 10, damaged: 2, price: 350 },
    { productId: 2, productName: "14.2kg", categoryName: "Gas Cylinder", quantity: 500, inTransit: 50, damaged: 5, price: 950 },
    { productId: 3, productName: "19kg", categoryName: "Gas Cylinder", quantity: 210, inTransit: 30, damaged: 1, price: 1150 }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchInventory = async () => {
      try {
        // In a real app, you would fetch from your API:
        // const response = await fetch(`${base_Url}/inventory`);
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setInventory(mockInventory);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3">
        Error loading inventory: {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-blue border-bottom-0 pb-0">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Inventory Management</h4>
            <div className="d-flex gap-2">
              <motion.button
                className="btn btn-primary d-flex align-items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add New Stock
              </motion.button>
              <motion.button
                className="btn btn-outline-secondary d-flex align-items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Record Return
              </motion.button>
              <motion.button
                className="btn btn-outline-secondary d-flex align-items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Update Price
              </motion.button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Type</th>
                  <th>Total</th>
                  <th>In Transit</th>
                  <th>Damaged</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <strong>{item.productName}</strong>
                      <div className="text-muted small">{item.categoryName}</div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.inTransit}</td>
                    <td>{item.damaged}</td>
                    <td>₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="text-end">
                      <motion.button
                        className="btn btn-sm btn-outline-primary"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log('Edit', item.productId)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;