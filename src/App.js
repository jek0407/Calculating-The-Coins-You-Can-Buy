import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState(0);
  const [selected, setSelected] = useState("");

  const enterUSD = (event) => {
    setDollar(event.target.value);
  };
  const selectOption = (event) => {
    setSelected(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(dollar);
  return (
    <div>
      <h1>
        <strong>Calculating The Coins You Can Buy</strong>
      </h1>
      <span>Enter the money you have $ </span>
      <input value={dollar} onChange={enterUSD} placeholder="You have (USD)" />
      <h2>There are {loading ? "" : `${coins.length}`} Coins</h2>

      <h4>Choose the coin</h4>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectOption} value={selected}>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price} key={coin.id}>
              {coin.name} ({coin.symbol}) ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      {selected ? <p>You can buy {dollar / selected} coin(s).</p> : null}
    </div>
  );
}

/* To Do List */

// function App() {
//   const [toDo, setToDo] = useState("");
//   const [toDos, setToDos] = useState([]);
//   const onChange = (event) => setToDo(event.target.value);
//   // const onClick = () => {};
//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (toDo === "") return;
//     setToDos((prevArray) => [toDo, ...prevArray]);
//     setToDo("");
//     console.log(toDos);
//   };

//   return (
//     <div>
//       <h1>What To Do ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="Write your thing to do"
//         />
//         <button>Add To Do</button>
//       </form>
//       <hr />
//       <ul>
//         {toDos.map((toDo, index) => (
//           <li key={index}>{toDo}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
