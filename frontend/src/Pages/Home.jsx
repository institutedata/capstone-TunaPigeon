import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [result, setResult] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:8080/jasminedragon')
      .then(response => {
        // Extract result and orders from response data
        const { result, orders } = response.data;
        setResult(result);
        setOrders(orders);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      {/* Render the result */}
      <p>Result: {result}</p>
      
      {/* Render orders */}
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {/* Render individual order details */}
            {order.customerName} ordered {order.tea}
          </li>
        ))}
      </ul>

      {/* Button to fetch data */}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default Home;
