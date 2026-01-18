import "./App.css";
import Card from "./components/Card";

import clashData from "../mock-data.json";

function shuffle(cards) {
  let result = [...cards];
  let m = result.length,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    [result[m], result[i]] = [result[i], result[m]];
  }
  return result
}

function App() {
  const cards = [];
  for (let i = 0; i < 25; i++) {
    cards.push({
      id: clashData.items[i].id,
      name: clashData.items[i].name,
      iconUrl: clashData.items[i].iconUrls.medium,
    });
  }
  const shuffleCards = shuffle(cards)
  return (
    <>
      {shuffleCards.map((card) => <Card key={card.id} {...card}></Card>)}
    </>
  );
}

export default App;
