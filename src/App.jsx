import "./App.css";
import Card from "./components/Card";
import { useEffect, useRef, useState } from "react";
import winAudio from "./assets/win.mp3";
import loseAudio from "./assets/lose.mp3";
function shuffle(cards) {
  let result = [...cards];
  let m = result.length,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    [result[m], result[i]] = [result[i], result[m]];
  }
  return result;
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("best-score")) || 0;
  });
  const [cards, setCards] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const win = useRef(new Audio(winAudio));
  const lose = useRef(new Audio(loseAudio));
  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?name=rick&status=alive",
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const { results } = await response.json();
      const safeResults = results.slice(0, 20).map((result) => {
        return {
          id: result.id,
          image: result.image,
          name: result.name,
        };
      });
      if (active) {
        setCards(shuffle(safeResults));
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  function handleClick(e) {
    if (gameOver || gameWon) return;
    const { name } = e.currentTarget.dataset;
    if (!clickedCards.includes(name)) {
      win.current.currentTime = 0;
      win.current.play();
      let newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, name]);
      setCards(shuffle(cards));
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("best-score", newScore);
      }
      if (newScore === cards.length) {
        setGameWon(true);
      } else {
        setCards(shuffle(cards));
      }
    } else {
      lose.current.currentTime = 0;
      lose.current.play();
      setGameOver(true);
    }
  }

  function restartGame() {
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    setGameWon(false);
    setCards(shuffle(cards));
  }

  return (
    <>
      <header>
        Get points by clicking on an image but don't click on any more than
        once!
      </header>
      <div className="score-display score">score:{score}</div>
      <div className="score-display">best score:{bestScore}</div>
      <div className="card-container">
        {cards &&
          cards.map((card) => (
            <Card key={card.id} {...card} onClick={handleClick}></Card>
          ))}
        {!cards && <h1>loading...</h1>}
      </div>
      {(gameOver || gameWon) && (
        <div className="game-over-modal">
          <h2>{gameWon ? "You Win!" : "Game Over"}</h2>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </>
  );
}

export default App;
