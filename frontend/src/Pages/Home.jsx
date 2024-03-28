// import axios from "axios";
// import { useState } from "react";

// const Home = () => {
//   const [result, setResult] = useState(null);
//   const [orders, setOrders] = useState([]);

//   const fetchData = () => {
//     axios.get('http://localhost:8080/jasminedragon')
//       .then(response => {
//         // Extract result and orders from response data
//         const { result, orders } = response.data;
//         setResult(result);
//         setOrders(orders);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   return (
//     <div>
//       {/* Render the result */}
//       <p>Result: {result}</p>
      
//       {/* Render orders */}
//       <ul>
//         {orders.map(order => (
//           <li key={order._id}>
//             {/* Render individual order details */}
//             {order.customerName} ordered {order.tea}
//           </li>
//         ))}
//       </ul>

//       {/* Button to fetch data */}
//       <button onClick={fetchData}>Fetch Data</button>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import Grid from '@mui/material/Grid';

const HomePage = () => {
  return (
    <>
    
    <Grid container spacing={2} >
    <Grid item xs={12}>
        {/* Content of the third div */}
        <div style={{ height: '100px', backgroundColor: 'transparent', display:'inline'}}>
        <h1>Home</h1>
        </div>
      </Grid>
      {/* Third Div */}
      <Grid item xs={12} >
        {/* Content of the third div */}
        <div style={{ height: '100px', backgroundColor: 'transparent' , display:'inline' }}>
          
        The story is set in a world where certain people, known as "benders," have the ability to manipulate one of the four classical elements: water, earth, fire, or air. The Avatar is the only person capable of bending all four elements and is tasked with maintaining balance in the world.
        
        </div>
      </Grid>
      {/* First Div */}
      <Grid item xs={12} md={6} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border:'black'}}>
        {/* Content of the first div */}
        <div style={{ height: '500px', backgroundColor: 'transparent', display:'inline' }}>
        <img src="https://m.media-amazon.com/images/I/51p0QKI6bRL._AC_UF894,1000_QL80_.jpg" alt="Description of the image" height="300px" />

        <p> "Avatar: The Last Airbender" follows the journey of Aang, the current Avatar who disappeared for a hundred years after being frozen in an iceberg. Aang, along with his friends Katara, a waterbender, and Sokka, a non-bender, embarks on a quest to master all four elements and defeat the tyrannical Fire Nation ruler, Fire Lord Ozai, who seeks to conquer the world. Along the way, Aang learns about friendship, responsibility, and the importance of balance.

        </p>
        </div>
      </Grid>
      {/* Second Div */}
      <Grid item xs={12} md={6} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        {/* Content of the second div */}
        <div style={{ height: '500px', backgroundColor: 'transparent' , display:'inline'}}>
        <img src="https://m.media-amazon.com/images/I/71RdBbHY6vL._AC_UF894,1000_QL80_.jpg" alt="Description of the image" height="300px" />

        <p>"The Legend of Korra" takes place 70 years after the events of "Avatar: The Last Airbender" and follows the next Avatar, Korra, a headstrong and talented waterbender from the Southern Water Tribe. Korra faces new challenges as she strives to master airbending and maintain balance in a rapidly changing world. Throughout her journey, Korra confronts various threats, including political unrest, anti-bender movements, and dark spirits. Alongside her friends, including the brothers Mako and Bolin, and the non-bender Asami, Korra learns valuable lessons about leadership, identity, and spirituality.
        </p>
        </div>
      </Grid>
      <Grid item xs={12}>
        {/* Content of the third div */}
        <div style={{ height: '100px', backgroundColor: 'transparent', display:'inline' }}>
        Both series explore themes of friendship, identity, and the struggle between good and evil, while also delving into complex socio-political issues and the interconnectedness of all living things. Together, they form an epic saga of adventure, growth, and the enduring power of hope.
        </div>
      </Grid>
    </Grid>
    </>
  );
};

export default HomePage;
