import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Fetch character details using the id parameter
    // Update the state with the fetched character
  }, [id]);

  return (
    <Box style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
  {character ? (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {character.name} Details
      </Text>
      {/* Display character details */}
      {/* Display movies the character has appeared in */}
    </>
  ) : (
    <Text>Loading...</Text>
  )}
</Box>

  );
};

export default CharacterDetails;
