import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { DialogContent, Typography, Grid } from '@mui/material';
import React, { useState } from "react";
import axios from "axios";
import JasmineDragon from "./JasmineDragon";
import { ThemeProvider } from '@emotion/react'
import { whiteTheme } from "../themes/whiteTheme";

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



  //grabs orders from database
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

  // goes back to main menu
  const handleMainMenu = () => {
    setShowJasmineDragon(true);
  };


  return (
    <div>
      {/* goes back to jasmine dragon when button is clicked (results get hidden) */}
      {!showJasmineDragon && (
        <div className="JasmineTeaBox">
          <>
          {/* if submissionStatus is success do this */}
            {submissionStatus === 'success' &&
              <div><p><img src={PhotoURL} alt="Character" style={{ height: '200px' }} /></p><p>{name}: "Thank you!"</p>


                <button onClick={handleNextCustomer}>Next customer</button>
                <p>Current score: {score}</p>
                {/* to change the themes of the MUI dialog  */}
                <ThemeProvider theme={whiteTheme}>
                  <Button variant="outlined" onClick={handleClickOpenInstructions}>
                    Previous orders
                  </Button>
                  <Dialog open={open} onClose={handleCloseInstructions}>
                    <Typography variant="h6" align="center">
                      Completed Orders
                    </Typography>

                    <DialogContent>
                      {/* Grid layout to display orders */}
                      <Grid container spacing={2}>
                        {/* Header row */}
                        <Grid item xs={4}>
                          {/* using typography for the text  */}
                          <Typography variant="h6">Customer</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6">Tea</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6">Status</Typography>
                        </Grid>

                        {/* Orders entries in the form of grids*/}
                        {/* using typography for the text  */}
                      {/* react fragment was used to group the children elements without an extra dom element */}

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
                {/* if submission is "failed" then do this */}
            {submissionStatus === 'failed' && <div><p><img src="src/assets/images/fired.gif" alt="Character" style={{ height: '200px' }} /></p><p>Time ran out!  {playerName}, YOU'RE FIRED!</p><p>
              <button onClick={handleRestartGame}>Start Again</button>
              <button onClick={handleMainMenu}>Back to Main Menu</button>

            </p><p>Final score: {score}</p>
              {/* to change the themes of the MUI dialog  */}
              <ThemeProvider theme={whiteTheme}>
                <Button variant="outlined" onClick={handleClickOpenInstructions} >
                  All Orders
                </Button>
                <Dialog open={open} onClose={handleCloseInstructions}>
                  {/* using typography for  text  */}

                  <Typography variant="h6" align="center">
                    All Orders
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
                      {/* react fragment was used to group the children elements without an extra dom element */}
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

