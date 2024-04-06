import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20; // Number of characters per page
  const [expandedCharacter, setExpandedCharacter] = useState(null);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  //grabs characters
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/database/characters`, {
          params: {
            perPage: perPage,
            page: currentPage
          }
        });
        // Assuming response.data contains the characters array
        const characters = response.data;
        setTotalCharacters(characters.length);
        // Set the fetched characters
        console.log(characters);
        setAllCharacters(characters);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    // Call the fetchCharacters function to fetch characters when currentPage changes
    fetchCharacters();
  }, [currentPage]); // Fetch characters when currentPage changes

  console.log("Total Characters:", totalCharacters);

  //if clicked, expands character
  const handleCharacterClick = (index) => {
    setExpandedCharacter(index);
    setDialogOpen(true);
  };

  //closes expanded character
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };



  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setExpandedCharacter(null);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setExpandedCharacter(null);
    }
  };


  return (
    <div>
      {/* loading feature*/}
      {loading ? (<p>Loading characters...</p>) : (
        <>
          <h1>Character List</h1>
          <p>Explore the list of characters from both "The Last Airbender" and "The Legend of Korra"</p>
          {/*using grids to layout the character icons*/}
          <Grid container spacing={2} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid black', padding: '50px' }}>
            {allCharacters.map((character, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <div style={{ border: '1px solid black', padding: '10px', textAlign: 'center', backgroundColor: 'white', color: 'black' }} onClick={() => handleCharacterClick(index)}>
                  <img src={character.photoUrl} alt={character.name} style={{ height: '100px' }} />
                  <div>{character.name}</div>
                </div>
              </Grid>
            ))}
          </Grid>
          {/* buttons to go to next/previous page*/}
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={totalCharacters < 20}>Next</button>
          </div>
          {/* dialog to pop up with character information*/}
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            {expandedCharacter !== null && (
              <>
                <DialogTitle>{allCharacters[expandedCharacter].name}</DialogTitle>
                <DialogContent >
                  <div className="centeredImage">
                    <img src={allCharacters[expandedCharacter].photoUrl} alt={allCharacters[expandedCharacter].name} style={{ height: '200px' }} />
                  </div>
                  <div style={{ marginTop: '20px' }}>Affiliation: {allCharacters[expandedCharacter].affiliation || 'N/A'}</div>
                  <div>Allies: {allCharacters[expandedCharacter].allies.length ? allCharacters[expandedCharacter].allies.join(', ') : 'N/A'}</div>
                  <div>Enemies: {allCharacters[expandedCharacter].enemies.length ? allCharacters[expandedCharacter].enemies.join(', ') : 'N/A'}</div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CharacterList;
