import "./App.css";
import Card from "./components/Card";
// function shuffle(cards) {
//   let result = [...cards]
//   let m = result.length,
//     i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     [result[m], result[i]] = [result[i], result[m]];
//   }
// }

function App() {
  const getCrCards = async () => {
    const response = await fetch('api/card.js')
    if(!response.ok){
      alert('bad network')
      throw new Error('error:' + response.status)
    }
    const data = await response.json()
    console.log(data);
    return data;
  }
  getCrCards()
  return (
    <>
      <Card></Card>
    </>
  );
}

export default App;

