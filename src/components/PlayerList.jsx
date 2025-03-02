import React, { useState, useEffect } from "react";
import BallButton from "./BallButton";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  // Normal ball points
  const balls = [
    { color: "bg-red-600", points: 1 },
    { color: "bg-yellow-600", points: 2 },
    { color: "bg-green-600", points: 3 },
    { color: "bg-[#844421]", points: 4 },
    { color: "bg-blue-600", points: 5 },
    { color: "bg-pink-600", points: 6 },
    { color: "bg-black", points: 7 },
  ];

  // Foul penalties (negative points)
  const fouls = [
    { color: "bg-gray-700", points: -4 },
    { color: "bg-blue-600", points: -5 },
    { color: "bg-pink-600", points: -6 },
    { color: "bg-black", points: -7 },
  ];

  // Load players from LocalStorage
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players"));
    if (storedPlayers) setPlayers(storedPlayers);
  }, []);

  // Save players to LocalStorage on update
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      setPlayers([...players, { name: playerName, score: 0 }]);
      setPlayerName("");
    }
  };

  const updateScore = (index, points) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].score += points;
    setPlayers(updatedPlayers);
  };

  const resetScores = () => {
    const resetPlayers = players.map((player) => ({ ...player, score: 0 }));
    setPlayers(resetPlayers);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-3">
      <h1 className="text-2xl font-bold mb-4">Snooker Score Counter</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Player Name"
          className="px-3 py-2 border rounded-lg text-black"
        />
        <button
          onClick={addPlayer}
          className="bg-green-600 px-3 py-2 rounded-lg shadow-md text-white font-bold"
        >
          Add Player
        </button>
      </div>

      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg shadow-md">
        {players.length > 0 ? (
          players.map((player, index) => (
            <div key={index} className="mb-4 text-center">
              <h2 className="text-xl font-semibold">{player.name}: {player.score}</h2>
              <div className="flex flex-wrap justify-center mt-2">
                {balls.map((ball, i) => (
                  <BallButton
                    key={i}
                    color={ball.color}
                    points={ball.points}
                    onClick={() => updateScore(index, ball.points)}
                  />
                ))}
              </div>
              <h3 className="mt-3 text-red-400">Foul Deductions</h3>
              <div className="flex flex-wrap justify-center mt-2">
                {fouls.map((foul, i) => (
                  <BallButton
                    key={i}
                    color={foul.color}
                    points={foul.points}
                    isFoul={true}
                    onClick={() => updateScore(index, foul.points)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No players added yet.</p>
        )}
      </div>

      {players.length > 0 && (
        <button
          onClick={resetScores}
          className="mt-4 px-6 py-2 bg-red-600 rounded-lg shadow-lg text-white font-bold text-lg"
        >
          Reset Scores
        </button>
      )}
    </div>
  );
};

export default PlayerList;
