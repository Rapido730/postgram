import "./App.css";
import HomePage from "./components/HomePage.js";

function App() {
  return (
    <div className="App">
      <header>
        <figure>
          <img
            src={process.env.PUBLIC_URL + "postgram_logo.png"}
            alt="postgram"
          ></img>
        </figure>
      </header>
      <main>
        <HomePage />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
