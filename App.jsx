import React from "react";
import Header from "./Header.jsx";
import { languages } from "./languages.js";
import { words } from "./words.js";
import Confetti from "react-confetti";

export default function App() {
  const [currentWord, setCurrentWord] = React.useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  let wrongGuessCounter = 0;
  guessedLetters.forEach((char) =>
    currentWord.includes(char)
      ? wrongGuessCounter
      : (wrongGuessCounter = wrongGuessCounter + 1)
  );

  let currentWordLetters = [];
  currentWord.split("").forEach((char) => currentWordLetters.push(char));

  const mappedCurrentWordArray = currentWordLetters.map((letter, index) => (
    <p key={index}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : " "}
    </p>
  ));

  //handled State Array der getippten Buchtaben
  function addLetter(letter) {
    setGuessedLetters((prevGuessedLetters) =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter]
    );
    console.log(letter);
    console.log(guessedLetters);
  }

  //Splitted chars aus alphabet und fügt sie keyboard[] hinzu
  const keyboard = [];
  const alphabet = "abcdefghijklmnopqrstuvwyz";
  alphabet.split("").forEach((char) => keyboard.push(char));
  const mappedAlphabet = keyboard.map((letter) => {
    //feststellung ob buchstabe geraten und ob korrekt/falsch
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !(isGuessed && currentWord.includes(letter));

    //chars werden zu buttons
    return (
      <button
        onClick={() => addLetter(letter)}
        key={letter}
        style={{
          backgroundColor: isCorrect
            ? "#10A95B"
            : isWrong
            ? "#EC5D49"
            : "#FCBA29",
        }}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const languageChips = languages.map((language, index) => {
    const shouldAddLostClass = index < wrongGuessCounter;
    return (
      <p
        className={shouldAddLostClass ? "lost" : ""}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </p>
    );
  });
  const won = currentWordLetters.every((letter) =>
    guessedLetters.includes(letter)
  );
  const lost = wrongGuessCounter > languageChips.length - 2;
  let gameOver = won || lost;

  function newGame() {
    setCurrentWord(
      (prevCurrentWord) => words[Math.floor(Math.random() * words.length)]
    );
    setGuessedLetters([]);
    wrongGuessCounter = 0;
  }
  return (
    <>
      <Header />
      <main>
        <div id="statusBox" className={won ? "won" : lost ? "lost" : ""}>
          <h2>{won ? "You win!" : lost ? "Game over!" : ""}</h2>
          <p>
            {won
              ? "Well done! 🎉"
              : lost
              ? "You lose! Better start learning Assembly 😭!"
              : ""}
          </p>
        </div>
        {won ? <Confetti /> : null}
        <h3 className={lost ? "reveal" : ""}>
          {currentWord.toUpperCase()} was to be guessed
        </h3>
        <div className="languageChips">{languageChips}</div>
        <div className="letters">{mappedCurrentWordArray}</div>
        <div className="alphabet">{mappedAlphabet}</div>
        {gameOver ? (
          <button className="newGame" onClick={newGame}>
            New Game
          </button>
        ) : null}
      </main>
    </>
  );
}
