import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Center,Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const CharacterDetails =() => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [films, setFilms] = useState([]);
    const AnimatedText = motion(Text);
    const navigate =useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}`);
                const data = await response.json();

                const filmDetailsPromises = data.films.map(async (filmUrl) => {
                    const filmResponse = await fetch(filmUrl);
                    const filmData = await filmResponse.json();
                    return filmData;
                });

                const filmDetails = await Promise.all(filmDetailsPromises);
                setCharacter(data);
                setFilms(filmDetails);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacterDetails();
  }, [id]);

    return (
        <div style={{ background: 'url("public/images/bg.jpg") no-repeat center center fixed', backgroundSize: 'cover', minHeight: '100vh', height: 'auto'}}>
            <Box style={{ padding: '15px', color: 'white', textAlign: 'center' }}>
                {character ? (
                    <>
                        <Button mt={4} onClick={handleGoBack} >
                            Go Back
                        </Button>
                        <AnimatePresence>
                            <AnimatedText
                                key="star-wars-title"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                fontSize={['2rem', '2rem', '3rem']}
                                fontWeight="bold"
                                padding={['1rem', '1.5rem', '2rem']}
                                mb={2}
                                color="rgb(229,9,20)"
                            >
                                {character.name}
                            </AnimatedText>
                        </AnimatePresence>
                        <AnimatePresence>
                            <AnimatedText
                                key="star-wars-title"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                fontSize={['2rem', '2rem', '3rem']}
                                fontWeight="bold"
                                padding={['1rem', '1rem', '1rem']}
                                mb={2}
                                color="rgb(229,9,20)"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ marginBottom: '6px', color: 'white', fontSize: '1.5rem' }}>
                                    <Text mb={2}>Birth Year: {character.birth_year}</Text>
                                </div>
                                <div style={{ marginBottom: '6px', color: 'white', fontSize: '1.5rem' }}>
                                    <Text mb={2}>Height : {character.height} cm</Text>
                                </div>
                                <div style={{ marginBottom: '6px', color: 'white', fontSize: '1.5rem' }}>
                                    <Text mb={2}>Gender: {character.gender}</Text>
                                </div>
                            </AnimatedText>
                        </AnimatePresence>


                        <AnimatePresence>
                            <AnimatedText
                                key="star-wars-title"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Text mt={6} fontSize="2rem" color="rgb(229,9,20)" fontWeight="bold">
                                    Films Featured In:
                                </Text>
                            </AnimatedText>
                        </AnimatePresence>
                        <motion.ul
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            style={{
                                width: '100%', // Default width for smaller screens
                                marginBottom: '12px',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                
                              }}
                        >
                            {films.map((film, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    style={{
                                        listStyle:'none',
                                        marginBottom: '8px',
                                        color: 'white',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        background: 'rgba(229,9,20,0.8)',
                                        cursor: 'pointer',
                                        margin:'1rem',
                                        transition: 'background 0.3s',
                                        '@media (min-width: 800px)': {
                                            width: '60%', // Adjust width for screens starting from 1200px width
                                          },
                                    }}
                                    whileHover={{ background: 'rgba(229,9,20,1)' }}
                                >
                                    <span style={{ fontSize: ['1rem', '1rem', '2rem'] }}>{film.title}</span>

                                </motion.li>
                            ))}
                        </motion.ul>
                    </>
                ) : (
                    <Center h="100vh">
                        <Text color="white" fontSize="1.5rem">
                            Loading...
                        </Text>
                    </Center>
                )}
            </Box>
        </div>
    );
};

export default CharacterDetails;
