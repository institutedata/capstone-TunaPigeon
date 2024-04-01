import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContentText from '@mui/material/DialogContentText';
import { DialogContent , Typography, Grid} from '@mui/material';
import React, { useState, useEffect } from "react";
import axios from "axios";
import JasmineDragon from "./JasmineDragon";
import { blackTheme } from '../themes/blackTheme';
import { ThemeProvider } from '@emotion/react'

const ResultsOfTeaGame = ({ PhotoURL, name, nextCustomer, submissionStatus, score, restartGame, playerName, MainMenu }) => {

  //button for next round; sends to parent component
  const handleNextCustomer = () => {
    nextCustomer();
  }
  //button for restart game; sends to parent component
  const handleRestartGame = () => {
    restartGame();
    axios.delete('http://localhost:8080/jasminedragon/orders/delete')
      .then(response => {
        console.log('All orders deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting orders:', error);
      });
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
            {submissionStatus === 'success' && 
            <div><p><img src={PhotoURL} alt="Character" style={{ height: '200px' }} /></p><p>{name}: "Thank you!"</p>
            
              {/* <button>Previous orders</button> */}
              
              <button onClick={handleNextCustomer}>Next customer</button>
              <p>Current score: {score}</p>
              
              <ThemeProvider theme={blackTheme}>
              <Button variant="outlined" onClick={handleClickOpenInstructions}>
                Previous orders
              </Button>
              <Dialog open={open} onClose={handleCloseInstructions}>
              <Typography variant="h6" align="center">
                  Completed Orders
                </Typography>

                <DialogContent>
                  {/* Grid layout to display high scores */}
                  <Grid container spacing={2}>
                    {/* Header row */}
                    <Grid item xs={4}>
                      <Typography variant="h6">Customer</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Tea</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Status</Typography>
                    </Grid>

                    {/* High score entries */}
                    {orders.map(order => (
                      <React.Fragment key={order._id}>
                        <Grid item xs={4}>
                          <Typography>{order.customerName}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{order.tea}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{order.status}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </DialogContent>
              </Dialog>
              </ThemeProvider></div>}
            {submissionStatus === 'failed' && <div><p><img src="src/assets/images/fired.gif" alt="Character" style={{ height: '200px' }} /></p><p>Time ran out!  {playerName}, YOU'RE FIRED!</p><p>
              <button onClick={handleRestartGame}>Start Again</button>
              <button onClick={handleMainMenu}>Back to Main Menu</button>

            </p><p>Final score: {score}</p>
            <ThemeProvider theme={blackTheme}>
              <Button variant="outlined" onClick={handleClickOpenInstructions} >
                Previous orders
              </Button>
              <Dialog open={open} onClose={handleCloseInstructions}>

                <Typography variant="h6" align="center">
                  Orders
                </Typography>

                <DialogContent>
                  {/* Grid layout to display high scores */}
                  <Grid container spacing={2}>
                    {/* Header row */}
                    <Grid item xs={4}>
                      <Typography variant="h6">Customer</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Tea</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Status</Typography>
                    </Grid>

                    {/* High score entries */}
                    {orders.map(order => (
                      <React.Fragment key={order._id}>
                        <Grid item xs={4}>
                          <Typography>{order.customerName}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{order.tea}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{order.status}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </DialogContent>
              </Dialog>
              </ThemeProvider></div>}


          </>
        </div>
      )}

      {showJasmineDragon && <JasmineDragon />}
    </div>
  );
}

export default ResultsOfTeaGame;

