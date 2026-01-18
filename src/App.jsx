import "./App.css";
import Card from "./components/Card";

import clashData from "../mock-data.json";
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
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push({
      id: clashData.items[i].id,
      name: clashData.items[i].name,
      iconUrl: clashData.items[i].iconUrls.medium,
    });
  }
  const shuffleCards = shuffle(cards);

  function handleClick(e) {
    const { name } = e.currentTarget.dataset;
    console.log(name);
    console.log(clickedCards);
    if (!clickedCards.includes(name)) {
      clickedCards.push(name);
      setScore(score + 1);
      return console.log("game continue");
    } else {
      setScore(0);
      return alert("game over");
    }
  }

  console.log(score);
  return (
    <>
      <header>
        Get points by clicking on an image but don't click on any more than
        once!
      </header>
      <div className="score-display">{score}</div>
      <div className="card-container">
        {shuffleCards.map((card) => (
          <Card key={card.id} {...card} onClick={handleClick}></Card>
        ))}
      </div>
    </>
  );
}

export default App;
