
import ParentComponent from './MainControls';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContentText from '@mui/material/DialogContentText';
import { Grid, DialogContent, Typography,} from '@mui/material';
import React, { useState} from "react";
import "./border.css";
import Heading from '../Components/Heading';
import "./centeredImage.css"
import { ThemeProvider } from '@emotion/react'
import { whiteTheme } from '../themes/whiteTheme'
import axios from 'axios';

import moment from 'moment-timezone';


const JasmineDragon = ({ text }) => {
  // to trigger the parent component to show or hide
  const [showParentComponent, setShowParentComponent] = useState(false);
  // to trigger the help module
  const [openHelp, setOpenHelp] = useState(false);
  const [openScores, setOpenScores] = useState(false);

  const [topScores, setTopScores] = useState([]);


  //to show parent component, which will show the interactive tea game
  const handleOpenShop = () => {

    setShowParentComponent(true);
    axios.delete('http://localhost:8080/jasminedragon/orders/delete')
      .then(response => {
        console.log('All orders deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting orders:', error);
      });
  };


  //opens help dialog
  const handleClickOpenInstructions = () => {
    setOpenHelp(true);
  }
  //close help dialog
  const handleCloseInstructions = () => {
    setOpenHelp(false);
  }


// grabs the scores
  const fetchScores = () => {
    axios.get('http://localhost:8080/highscore')
      .then(response => {
        // Extract result and orders from response data
        const data = response.data;
        setTopScores(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  //opens help dialog
  const handleClickOpenHighscore = () => {
    setOpenScores(true);
    fetchScores();
  }
  //close help dialog
  const handleCloseHighscore = () => {
    setOpenScores(false);
  }


  // uses grids to layout the buttons and dialog for the highscores and menu
  return (
    <div>
      {!showParentComponent && (
        <>
          <Heading></Heading>
        {/* uses this class and styles to create a box around and a border */}

          <div className='dynamic-div' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid black', padding: '50px' }}>
            <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/01/avatar-iroh-pai-sho-tile-e1611880650101.jpg" alt="Description of the image" width="500px" />

            <p>The Jasmine Dragon is a traditional tea shop in the Upper Ring of Ba Sing Se; due to its location, its clientele mostly consists of the upper class citizens of the Earth Kingdom capital. It was once a failing business but was completely revived after Iroh took over. It opened shortly after he and Zuko arrived in the city as refugees. Iroh named it the "Jasmine Dragon" because, in his words, the name was "dramatic, poetic, and [had] a nice ring to it", and also as a reminder of the very nature of life: "Where there is balance, there is peace", evocative to jasmine tea's properties.</p>
            <p>You have been recently employed at this great establishment. You will work as both the cashier and junior tea maker, and will take orders while completing them in between. Make sure every customer get their tea else you might get fired (by Zuko, not Iroh)</p>
            <Grid container spacing={2} >

              <Grid item xs={12} md={4}>
                <div>
                  {/* uses this to change theme */}
                  {/* uses this to create dialog to pop up with help info */}
                  <ThemeProvider theme={whiteTheme}>
                    <Button variant="outlined" onClick={handleClickOpenInstructions}>
                      How to play
                    </Button>
                    <Dialog open={openHelp} onClose={handleCloseInstructions}>
                      <DialogContent>
                        <DialogContentText>
                          There will be a time limit of 10 seconds to complete each order before you have to take the next order. One failed order and you will be fired!
                        </DialogContentText>
                        <DialogContentText>Before you begin your shift, you will have to enter your name to clock in. After that, customers will start flooding in.</DialogContentText>
                        <div className="centeredImage">
                          <img src="src/assets/images/zero.png" alt="Description of the image" width="500px" />
                        </div>
                        <DialogContentText>You will be greeted by a customer who will tell you their order, and you will have to enter in the tea into the system.</DialogContentText>
                        <div className="centeredImage">
                          <img src="src/assets/images/first.png" alt="Description of the image" width="500px" />
                        </div>
                        <DialogContentText> As the order is being loaded in, you will have 5 seconds to prepare by using that time to familiarise yourself with the required ingredients (each tea will have 4 ingredients).</DialogContentText>
                        <div className="centeredImage">
                          <img src="src/assets/images/second.png" alt="Description of the image" width="500px" />
                        </div>
                        <DialogContentText> After those 5 seconds, you will then be taken to a page where you have 10 seconds to complete the order (the ingredients will be shown again on the left side),
                          by finding and clicking each button corresponding to each required ingredient, and then clicking submit</DialogContentText>
                        <div className="centeredImage">
                          <img src="src/assets/images/third.png" alt="Description of the image" width="500px" />
                        </div>
                        <DialogContentText> If you successfully completed the order, the customer will thank you and you will be able to move onto the next customer (your score, which is the number of completed orders, will be shown at the bottom)</DialogContentText>
                        <div className="centeredImage">
                          <img src="src/assets/images/fourth.png" alt="Description of the image" width="500px" />
                        </div>
                        <DialogContentText>But if you failed, you will be "fired" personally by Zuko himself (your final score will be shown at the bottom)</DialogContentText>
                        <div className="centeredImage">
                          <img src="src/assets/images/fifth.png" alt="Description of the image" width="500px" />
                        </div>
                      </DialogContent></Dialog></ThemeProvider></div>
              </Grid>

            {/* opens shops */}
              <Grid item xs={12} md={4}>
                <button onClick={handleOpenShop}>Open Shop</button>
              </Grid>


             {/* shows the highscores */}
              <Grid item xs={12} md={4}>

                <div>
                  {/* uses this to change theme */}
                  {/* uses this to create dialog to pop up with highscores */}
                  <ThemeProvider theme={whiteTheme}>
                    <Button variant="outlined" onClick={handleClickOpenHighscore}>

                      Highscores
                    </Button>
                    <Dialog open={openScores} onClose={handleCloseHighscore}>
                      <Typography variant="h6" align="center">
                        Highscores
                      </Typography>
                      <DialogContent>
                        {topScores.length === 0 ? (
                          <Typography variant="body1" align="center">
                            No highscores recorded
                          </Typography>
                        ) : (
                          <Grid container spacing={2}>
                            {/* Header row */}
                            <Grid item xs={4}>
                              <Typography variant="h6">Name</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="h6">Score</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="h6">Timestamp</Typography>
                            </Grid>
                            {/* High score entries */}
                      {/* react fragment was used to group the children elements without an extra dom element */}

                            {topScores.map((score, index) => (
                              <React.Fragment key={index}>
                                <Grid item xs={4}>
                                  <Typography>{score.name}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography>{score.score}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography>{moment(score.timestamp).format("YYYY-MM-DD HH:mm:ss")}</Typography>
                                </Grid>
                              </React.Fragment>
                            ))}
                          </Grid>
                        )}
                      </DialogContent>
                    </Dialog>

                  </ThemeProvider>
                </div>

              </Grid>
            </Grid></div>

        </>
      )}
      {showParentComponent && <ParentComponent />}

    </div>
  );
}
export default JasmineDragon;


