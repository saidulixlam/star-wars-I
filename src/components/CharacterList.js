import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button, Flex,Input } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const pageNumberRef = useRef();

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



    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPageNumber = parseInt(pageNumberRef.current.value, 10);

        if (!isNaN(parsedPageNumber) && parsedPageNumber > 0) {
            // Navigate to the specified page
            setPage(parsedPageNumber);
        } else {
            // Handle invalid input (show an error message, for example)
            console.error('Invalid page number');
        }
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
                            fontSize={['3rem', '3rem', '3rem']}
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
                <Text color='white' fontSize='1.5rem'>Loading...</Text>
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
                            <li key={character.name} style={{ marginBottom: '6px', gap: '3rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '1.5rem' }}>{character.name}</span>
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
                            Prev.
                        </Button>
                    )}
                    <Button onClick={handleNextPage} style={{ marginRight: '10px' }}>
                        Next
                    </Button>
                    
                    <div style={{
                        display: 'flex',
                        flexDirection:'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
    
                    }}>
                        <form onSubmit={handleSubmit}>
                        <Input 
                        style={{borderRadius:'4px',height:'40px',width:'70px',color:'white',margin: '10px'}}
                        type="number" ref={pageNumberRef} placeholder='search' max="9"/>
                        <Button type='submit' style={{ marginBottom: '5px' }}>Go
                    </Button>
                    </form>
                    </div>

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
