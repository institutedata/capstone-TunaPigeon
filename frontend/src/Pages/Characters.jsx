import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20; // Number of characters per page
  const [expandedCharacter, setExpandedCharacter] = useState(null);
const [totalCharacters, setTotalCharacters] = useState(0);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://last-airbender-api.fly.dev/api/v1/characters`, {
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
        setAllCharacters(characters.map(character => ({
          name: character.name,
          photoUrl: character.photoUrl,
          affiliation: character.affiliation,
          allies: character.allies,
          enemies: character.enemies
        })));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    // Call the fetchCharacters function to fetch characters when currentPage changes
    fetchCharacters();
  }, [currentPage]); // Fetch characters when currentPage changes

  console.log("Total Characters:", totalCharacters);

  const handleCharacterClick = (index) => {
    // Toggle expanded state
    setExpandedCharacter(prevIndex => prevIndex === index ? null : index);
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Character List</h1>
      <Grid container spacing={2}>
        {allCharacters.map((character, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <div style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }} onClick={() => handleCharacterClick(index)}>
              <img src={character.photoUrl} alt={character.name} style={{ height: expandedCharacter === index ? '200px' : '100px' }} />
              <div style={{ fontWeight: expandedCharacter === index ? 'bold' : 'normal' }}>{character.name}</div>
              {expandedCharacter === index && ( <>
      <div>Affiliation: {character.affiliation || 'N/A'}</div>
      <div>Allies: {character.allies.length ? character.allies.join(', ') : 'N/A'}</div>
      <div>Enemies: {character.enemies.length ? character.enemies.join(', ') : 'N/A'}</div>
      </>)}
            </div>
          </Grid>
        ))}
      </Grid>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={totalCharacters < 20}>Next</button>
      </div>
    </div>
  );
};
export default CharacterList;
