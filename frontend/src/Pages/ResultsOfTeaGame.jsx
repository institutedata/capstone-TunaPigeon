import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContentText from '@mui/material/DialogContentText';
import { DialogContent } from '@mui/material';
import { useState } from "react";
import axios from "axios";
import JasmineDragon from "./JasmineDragon";

const ResultsOfTeaGame = ({ PhotoURL, name, nextCustomer, submissionStatus, score, restartGame, playerName, MainMenu}) => {

  //button for next round; sends to parent component
  const handleNextCustomer = () => {
    nextCustomer();
  }
  //button for restart game; sends to parent component
  const handleRestartGame = () => {
    restartGame();
  }


  const [result, setResult] = useState(null);
  const [orders, setOrders] = useState([]);
  // to trigger the help module
  const [open, setOpen] = useState(false);
  const [showJasmineDragon, setShowJasmineDragon] = useState(false);


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


0
  //opens help dialog
  const handleClickOpenInstructions = () => {
    setOpen(true);
    fetchData();
  }
  //close help dialog
  const handleCloseInstructions = () => {
    setOpen(false);
  }

  const handleMainMenu = () => {
    setShowJasmineDragon(true);
  };


  return (
    <div>
    {!showJasmineDragon && (
    <div className="JasmineTeaBox">
      <>
        {submissionStatus === 'success' && <div><p>Name: {name}</p><p><img src={PhotoURL} alt="Character" style={{ height: '200px' }} /></p><p>"Thank you!"</p><p>
          {/* <button>Previous orders</button> */}
          <button onClick={handleNextCustomer}>Next customer</button>

        </p><p>Current score: {score}</p>
        <Button variant="outlined" onClick={handleClickOpenInstructions}>
          Previous orders
        </Button>
        <Dialog open={open} onClose={handleCloseInstructions}>
          <DialogContent>
            
              {/* Render the result */}
              Result: {result}

              {/* Render orders */}
              <ul>
                {orders.map(order => (
                  <li key={order._id}>
                    {/* Render individual order details */}
                    {order.customerName} ordered {order.tea} = {order.status}
                  </li>
                ))}
              </ul>
            
          </DialogContent></Dialog></div>}
        {submissionStatus === 'failed' && <div><p><img src="src/assets/images/fired.gif" alt="Character" style={{ height: '200px' }} /></p><p>Time ran out!  {playerName}, YOU'RE FIRED!</p><p>
          <button onClick={handleRestartGame}>Start Again</button>
          <button onClick={handleMainMenu}>Back to Main Menu</button>

        </p><p>Final score: {score}</p></div>}

        
      </>
      </div>
    )}
    
      {showJasmineDragon && <JasmineDragon />}
    </div>
  );
}

export default ResultsOfTeaGame;