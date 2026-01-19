import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";

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
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);

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
      let arr = [];
      for (let i = 0; i < 20; i++) {
        arr.push({
          id: results[i].id,
          image: results[i].image,
          name: results[i].name,
        });
      }
      if (active) {
        setCards(shuffle(arr));
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let best = localStorage.getItem("best-score");
    if (!best) {
      best = 0;
      return localStorage.setItem("best-score", best);
    }
  }, []);

  function handleClick(e) {
    const { name } = e.currentTarget.dataset;
    if (!clickedCards.includes(name)) {
      setScore(score + 1);
      setClickedCards([...clickedCards, name]);
      setCards(shuffle(cards));
      if (score >= bestScore) {
        setBestScore(score);
        localStorage.setItem("best-score", score);
      }
    } else {
      setScore(0);
      setClickedCards([]);
      setCards(shuffle(cards));
    }
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
    </>
  );
}

export default App;
