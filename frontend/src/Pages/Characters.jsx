import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const perPage = 100; // Number of characters per page
  let page = 1; // Page number to start with
  const columns = 4;
  const [expandedCharacter, setExpandedCharacter] = useState(null);
  

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://last-airbender-api.fly.dev/api/v1/characters`, {
          params: {
            perPage: perPage,
            page: page
          }
        });

        // Assuming response.data contains the characters array
        const characters = response.data;
        
        // Concatenate the new characters with the existing array
        setAllCharacters(prevCharacters => prevCharacters.concat(characters.map(character => ({
          name: character.name,
          photoUrl: character.photoUrl
        }))));

        // Increment the page number for the next request
        page++;

        // Continue fetching more characters if needed
        if (characters.length === perPage) {
          await fetchCharacters();
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    // Call the fetchCharacters function to start fetching characters
    fetchCharacters();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleCharacterClick = (index) => {
    // Toggle expanded state
    setExpandedCharacter(prevIndex => prevIndex === index ? null : index);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalCharacters / perPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Character List</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '20px' }}>
      {allCharacters.map((character, index) => (
        <div key={index} style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }} onClick={() => handleCharacterClick(index)}>
          <img src={character.photoUrl} alt={character.name} style={{ height: '100px' }} />
          {expandedCharacter === index && (
            <div>
              <img src={character.photoUrl} alt={character.name} style={{ height: '200px' }} />
            </div>
          )}
          <div>{character.name}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: '20px' }}>
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default CharacterList;
