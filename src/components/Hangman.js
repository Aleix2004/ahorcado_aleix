import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Word from './Word';
import Alphabet from './Alphabet';
import HangmanDrawing from './HangmanDrawing';
import DifficultySelector from './DifficultySelector';
import UserProfile from './UserProfile'; // Importa el componente UserProfile
import './Hangman.css';

const Hangman = () => {
    const [difficulty, setDifficulty] = useState('');
    const [word, setWord] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [maxWrongGuesses, setMaxWrongGuesses] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);
    const [showProfile, ] = useState(false); // Estado para mostrar el perfil

    useEffect(() => {
        if (!difficulty) return;

        switch (difficulty) {
            case 'easy':
                setMaxWrongGuesses(10);
                break;
            case 'medium':
                setMaxWrongGuesses(7);
                break;
            case 'hard':
                setMaxWrongGuesses(5);
                break;
            default:
                setMaxWrongGuesses(7);
        }

        const fetchWord = async () => {
            try {
                const response = await axios.get('https://random-word-api.herokuapp.com/word');
                setWord(response.data[0].toUpperCase());
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch word from API');
                setLoading(false);
            }
        };

        fetchWord();
    }, [difficulty]);

    const handleGuess = (letter) => {
        if (gameOver) return;

        if (word.includes(letter)) {
            setGuesses([...guesses, letter]);
            const remainingLetters = word.split('').filter(l => !guesses.includes(l));
            if (remainingLetters.length === 1 && remainingLetters[0] === letter) {
                setVictory(true);
                setGameOver(true);
            }
        } else {
            setGuesses([...guesses, letter]);
            setWrongGuesses(wrongGuesses + 1);
            if (wrongGuesses + 1 === maxWrongGuesses) {
                setGameOver(true);
            }
        }
    };

    const resetGame = () => {
        setGuesses([]);
        setWrongGuesses(0);
        setLoading(true);
        setError('');
        setGameOver(false);
        setVictory(false);
        setDifficulty('');

        const fetchWord = async () => {
            try {
                const response = await axios.get('https://random-word-api.herokuapp.com/word');
                setWord(response.data[0].toUpperCase());
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch word from API');
                setLoading(false);
            }
        };

        fetchWord();
    };

    if (!difficulty) {
        return <DifficultySelector setDifficulty={setDifficulty} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="hangman">
            <h1>Juego del ahorcado</h1>
           
            {showProfile && <UserProfile />} {/* Mostrar el perfil del usuario */}
            <div className="word-and-drawing">
                <Word word={word} guesses={guesses} />
                <HangmanDrawing wrongGuesses={wrongGuesses} maxWrongGuesses={maxWrongGuesses} />
            </div>
            <Alphabet onGuess={handleGuess} guesses={guesses} />
            <p>Wrong Guesses: {wrongGuesses}/{maxWrongGuesses}</p>

            {gameOver && (
                <div className="game-over">
                    {victory ? <p>¡Felicidades, ganaste!</p> : <p>¡Perdiste! La palabra era {word}.</p>}
                    <button onClick={resetGame}>Jugar de nuevo</button>
                </div>
            )}
        </div>
    );
};

export default Hangman;
