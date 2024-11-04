"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { startGame, getOngoingGames } from "./utils/game";
import Alert from "./components/Alert";
import { getToken } from "./utils/tokenUtils";
import moment from "moment";

const Home = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [gameType, setGameType] = useState("single");
  const [ongoingGames, setOngoingGames] = useState([]);

  useEffect(() => {
    const tokenCheck = getToken();
    setToken(tokenCheck);

    const fetchOngoingGames = async () => {
      try {
        const games = await getOngoingGames();
        setOngoingGames(games);
      } catch (error) {
        console.error("Error fetching ongoing games:", error);
      }
    };

    if (tokenCheck) {
      fetchOngoingGames();
    }
  }, []);

  const handleStartGame = async () => {
    setLoading(true);
    const data = { difficulty, gameType };
    const newGame = await startGame({ data });

    setLoading(false);

    if (newGame.error) {
      setAlert({ type: "danger", message: newGame.error });
    } else {
      setAlert({ type: "success", message: "Game started successfully!" });
      setGameId(newGame.gameId);

      setTimeout(() => {
        router.push(`/game/${newGame.gameId}`);
      }, 2000);
    }
  };

  const handleResumeGame = async (gameId) => {
    setLoading(true);
    await router.push(`/game/${gameId}`);
    setLoading(false);
  };

  const formatDate = (date) => {
    return moment(date).format("Do MMM. YYYY, h:mm A");
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
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          autoDismiss
          duration={3000}
        />
      )}

      {token && ongoingGames.length > 0 && (
        <div className="mt-4">
          <h3>Resume Your Games</h3>
          <div className="row">
            {ongoingGames.map((game) => (
              <div className="col-md-4 mb-4" key={game._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Difficulty:</strong> {game.difficulty}
                      <br />
                      <strong>Game Type:</strong> {game.gameType}
                      <br />
                      <strong>Status:</strong> {game.status}
                      <br />
                      <strong>Moves:</strong> {`${game.moves.length} made`}
                      <br />
                      <strong>Last Updated:</strong>{" "}
                      {formatDate(game.lastUpdated)}
                    </p>
                    <button
                      onClick={() => handleResumeGame(game._id)}
                      className="btn btn-primary w-100"
                    >
                      {loading ? (
                        <h6>fetching game data</h6>
                      ) : (
                        <h6>Resume Game</h6>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`container d-flex align-items-center justify-content-center mt-5 ${
          token && ongoingGames.length > 0 ? "row" : ""
        }`}
      >
        <div
          className={`card p-4 shadow-sm ${
            token && ongoingGames.length > 0 ? "col-md-6" : ""
          }`}
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
              onChange={(e) => setGameType(e.target.value)}
            >
              <option value="single">Single</option>
              <option value="multiplayer">Multiplayer</option>
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
              onChange={(e) => setDifficulty(e.target.value)}
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
