import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacters();
    }, [page]);
    const handleViewDetails = (characterUrl) => {
        
        const characterId = extractIdFromUrl(characterUrl);

       
        navigate(`/character/${characterId}`);
    };

    const extractIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2]; 
    };
    const fetchCharacters = async () => {
        try {
            
            setLoading(true);
            setTimeout(async () => {
                const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
                const data = await response.json();
                setCharacters(data.results);
                setLoading(false);
            }, 500); 
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
        >
            <AnimatePresence>
                <motion.div
                    key="star-wars-title"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        textAlign="center"
                    >
                        <Box
                            as="span"
                            fontSize={['3rem', '3rem', '4rem']} 
                            fontWeight="bold"
                            padding={['1rem', '1.5rem', '2rem']}  
                            mb={1}
                            color="rgb(229,9,20)"
                        >
                            Star Wars Characters
                        </Box>
                    </Flex>
                </motion.div>
            </AnimatePresence>

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                characters.length > 0 ? (
                    <motion.ul
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        style={{
                            listStyle: 'none',
                            padding: ['1rem', '1rem', '1rem'],

                        }}
                    >
                        {characters.map((character) => (
                            <li key={character.name} style={{ marginBottom: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '2rem' }}>{character.name}</span>
                                <button
                                    style={{
                                        padding: '5px 5px',
                                        background: 'rgb(229,9,20)',
                                        color: 'white',
                                        borderRadius: '4px',
                                        cursor: 'pointer',

                                    }}
                                    onClick={() => { handleViewDetails(character.url) }}
                                >
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
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem',
                        width: ['100%', '80%', '80%'], 
                        marginInline: 'auto', 
                    }}
                >
                    {page !== 1 && (
                        <Button onClick={handlePrevPage} style={{ marginRight: '20px' }}>
                            Previous
                        </Button>
                    )}
                    <Button onClick={handleNextPage} style={{ marginRight: '10px' }}>
                        Next
                    </Button>
                    <Button
                        style={{
                            color: 'white',
                            background: 'transparent',
                        }}
                    >
                        <span>Page No.</span>{page}
                    </Button>
                </motion.div>
            </AnimatePresence>}
        </Flex >
    );
};

export default CharacterList;
