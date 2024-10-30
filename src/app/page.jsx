"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { startGame } from "./utils/game";

const Home = () => {
  const router = useRouter();

  const [gameId, setGameId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [difficulty, setDifficulty] = useState("easy");
  const [gameType, setGameType] = useState("single");

  const handleChange = (e) => {
    setDifficulty(e.target.value);
    setGameType(e.target.value);
  };

  const data = { difficulty, gameType };

  const handleStartGame = async () => {
    setLoading(true);
    const newGame = await startGame({ data });
    setLoading(false);
    setGameId(newGame.gameId);
  };

  return (
    <div className="container">
      <div className="text-center display-4 mt-5">
        Getting Killed And Injured
      </div>
      <div className="text-center">
        <h2>Can You Get The Computer's 4 Numbers?</h2>
      </div>
      <hr className="bg-dark" />
      <center>
        <div className="btn btn-dark">If So, Select Your Level</div>
      </center>
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <div
          className="card p-4 shadow-sm"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4">Select Difficulty</h2>

          <div className="form-group mb-3">
            <label htmlFor="gameType" className="form-label">
              Game Type
            </label>
            <select
              id="gameType"
              className="form-select"
              value={gameType}
              onChange={handleChange}
            >
              <option value="easy">Single</option>
              <option value="normal">Multiplayer</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="difficulty" className="form-label">
              Difficulty Level
            </label>
            <select
              id="difficulty"
              className="form-select"
              value={difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
              <option value="bossman">Bossman</option>
            </select>
          </div>

          <button onClick={handleStartGame} className="btn btn-primary w-100">
            {loading ? <h6>starting game...</h6> : <h6>Start Game</h6>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
