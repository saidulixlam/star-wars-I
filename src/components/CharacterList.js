import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const CharacterList = () => {
    const AnimatedText = motion(Text);
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        fetchCharacters();
    }, [page]);
    const handleViewDetails = (characterId) => {
        // Navigate to the character details page using the character ID
        history(`/character/${characterId}`);
    };
    const fetchCharacters = async () => {
        try {
            // Simulate loading delay
            setLoading(true);
            setTimeout(async () => {
                const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
                const data = await response.json();
                setCharacters(data.results);
                setLoading(false);
            }, 500); // Simulating a 2-second delay
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            p={2}
            color="rgb(229,9,20)"
        >
            {/* <Text fontSize="4xl" fontWeight="bold" padding={4} mb={4}>
                Star Wars Characters
            </Text> */}
            <AnimatePresence>
                <AnimatedText
                    key="star-wars-title"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    fontSize={['2rem', '3rem', '4rem']}  // Responsive font size
                    fontWeight="bold"
                    padding={['1rem', '1.5rem', '2rem']}   // Responsive padding
                    mb={2}
                    color="rgb(229,9,20)"
                >
                    Star Wars Characters
                </AnimatedText>
            </AnimatePresence>




            {/* Display characters or a message if there are no characters */}

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                characters.length > 0 ? (
                    <motion.ul
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        style={{ listStyle: 'none', padding: 0 }}>
                        {characters.map((character) => (
                            
                            <li key={character.name} style={{ marginBottom: '8px', fontSize: '1.2rem', display: 'flex', alignItems: 'center',justifyContent:'space-between'}}>
                                <span>{character.name}</span>
                                <button
                                    style={{
                                        marginLeft: '10px',
                                        padding: '5px 10px',
                                        background: 'rgb(229,9,20)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleViewDetails(character.name)}>
                                    View Details
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                ) : (
                    <Text>No characters available.</Text>
                )
            )}

            {!loading && <AnimatePresence>
                <motion.div
                    key="pagination-buttons"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem' }}
                >
                    {page !== 1 && (
                        <Button onClick={handlePrevPage} style={{ marginRight: '20px' }}>
                            Previous
                        </Button>
                    )}
                    <Button onClick={handleNextPage} style={{ marginRight: '10px' }}>
                        {/* disabled=logic to disable next button for last page */}
                        Next
                    </Button>
                    <Button
                        style={{
                            color: 'white',
                            background: 'transparent',  // Transparent white background
                        }}
                    >
                        {/* disabled=logic to disable next button for last page */}
                        <span>Page No.</span>{page}
                    </Button>
                </motion.div>
            </AnimatePresence>}
        </Flex >
    );
};

export default CharacterList;
