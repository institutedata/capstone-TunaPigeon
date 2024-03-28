
import ParentComponent from './ParentComponent';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContentText from '@mui/material/DialogContentText';
import { DialogContent } from '@mui/material';
import { useState, useEffect } from "react";
import "./border.css";
import Heading from '../Heading';
import "./centeredImage.css"
import { blackTheme } from '../themes/blackTheme';
import { ThemeProvider } from '@emotion/react'
import axios from 'axios';



const JasmineDragon = ({ text }) => {
  // to trigger the parent component to show or hide
  const [showParentComponent, setShowParentComponent] = useState(false);
  // to trigger the help module
  const [open, setOpen] = useState(false);

  //to show parent component, which will show the interactive tea game
  const handleOpenShop = () => {
    setShowParentComponent(true);
  };


  //opens help dialog
  const handleClickOpenInstructions = () => {
    setOpen(true);
  }
  //close help dialog
  const handleCloseInstructions = () => {
    setOpen(false);
  }

  useEffect(() => {
    
    // Make a request to delete all orders
    axios.delete('http://localhost:8080/jasminedragon/orders/delete')
      .then(response => {
        console.log('All orders deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting orders:', error);
      });
  
});


  return (
    <div>
      {!showParentComponent && (
        <>
          <Heading></Heading>
          <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/01/avatar-iroh-pai-sho-tile-e1611880650101.jpg" alt="Description of the image" width="500px" />
          <div className='dynamic-div'>
            <p>The Jasmine Dragon is a traditional tea shop in the Upper Ring of Ba Sing Se; due to its location, its clientele mostly consists of the upper class citizens of the Earth Kingdom capital. It was once a failing business but was completely revived after Iroh took over. It opened shortly after he and Zuko arrived in the city as refugees. Iroh named it the "Jasmine Dragon" because, in his words, the name was "dramatic, poetic, and [had] a nice ring to it", and also as a reminder of the very nature of life: "Where there is balance, there is peace", evocative to jasmine tea's properties.</p>
            <p>You have been recently employed at this great establishment. You will work as both the cashier and junior tea maker, and will take orders while completing them in between. Make sure every customer get their tea else you might get fired (by Zuko, not Iroh)</p>
          </div>
          <button onClick={handleOpenShop}>Open Shop</button>
          <div>
            <ThemeProvider theme={blackTheme}>
              <Button variant="outlined" onClick={handleClickOpenInstructions}>
                How to play
              </Button>
              <Dialog open={open} onClose={handleCloseInstructions}>
                <DialogContent>
                  <DialogContentText>
                    There will be a time limit of 10 seconds to complete each order before you have to take the next order. One failed order and you will be fired!
                  </DialogContentText>
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

        </>
      )}
      {showParentComponent && <ParentComponent />}

    </div>
  );
}
export default JasmineDragon;


