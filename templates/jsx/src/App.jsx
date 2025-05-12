import React, { useState, useEffect } from 'react';
import { RotateCcw, Github, Book, Zap, Globe, Code } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showDocs, setShowDocs] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  useEffect(() => {
    const checkWinner = () => {
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          setWinningLine(combo);
          return;
        }
      }
      if (board.every(cell => cell !== null)) {
        setWinner('tie');
      }
    };
    checkWinner();
  }, [board]);

  const handleCellClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const Cell = ({ index, value }) => (
    <button
      className={`
        w-24 h-24 text-4xl font-bold rounded-lg transition-all duration-200
        ${winningLine.includes(index) 
          ? 'bg-green-100 text-green-600 shadow-lg' 
          : 'bg-gray-100 hover:bg-gray-200'
        }
        ${!value && !winner ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
        ${value === 'X' ? 'text-blue-600' : 'text-red-600'}
      `}
      onClick={() => handleCellClick(index)}
    >
      {value}
    </button>
  );

  const DocumentationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-90vh overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">cra-run Documentation</h2>
          <button
            onClick={() => setShowDocs(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Zap className="mr-2 text-yellow-500" size={20} />
              What is cra-run?
            </h3>
            <p className="text-gray-600">
              cra-run is a template for quickly deploying Claude-generated React apps. 
              It provides a pre-configured environment with Webpack, Tailwind CSS, and 
              automatic GitHub Pages deployment.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Code className="mr-2 text-blue-500" size={20} />
              Quick Start
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm">{`# 1. Clone the template
git clone https://github.com/vedanta/cra-run my-app
cd my-app

# 2. Add your Claude-generated code
cd templates/jsx
# Copy your code to src/App.jsx

# 3. Run locally
npm install
npm start`}</pre>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Globe className="mr-2 text-green-500" size={20} />
              Deploy to GitHub Pages
            </h3>
            <ol className="list-decimal ml-6 space-y-2 text-gray-600">
              <li>Create a new GitHub repository</li>
              <li>Push your code with <code className="bg-gray-200 px-1 rounded">git push</code></li>
              <li>Enable GitHub Pages in repository settings</li>
              <li>Select "GitHub Actions" as the source</li>
              <li>Your app will be live in minutes!</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="space-y-1 text-gray-600">
              <li>✅ React 18 with hot reloading</li>
              <li>✅ Tailwind CSS for styling</li>
              <li>✅ TypeScript support</li>
              <li>✅ Docker configuration</li>
              <li>✅ Automatic GitHub Pages deployment</li>
              <li>✅ Zero configuration required</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Example Apps</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Calculator</h4>
                <p className="text-sm text-gray-600">
                  Ask Claude: "Create a calculator app inspired by HP-12C"
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Todo List</h4>
                <p className="text-sm text-gray-600">
                  Ask Claude: "Create a todo list app with local storage"
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Unit Converter</h4>
                <p className="text-sm text-gray-600">
                  Ask Claude: "Build a unit conversion app for length, weight, etc."
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Weather App</h4>
                <p className="text-sm text-gray-600">
                  Ask Claude: "Create a weather app using an API"
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 mb-4">
            Built with <span className="font-semibold text-blue-600">cra-run</span> template
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowDocs(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Book size={20} />
              Documentation
            </button>
            <a
              href="https://github.com/vedanta/cra-run"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
          {/* Game Status */}
          <div className="mb-6 text-center">
            {winner === 'tie' ? (
              <p className="text-2xl font-bold text-gray-600">It's a tie!</p>
            ) : winner ? (
              <p className="text-2xl font-bold">
                <span className={winner === 'X' ? 'text-blue-600' : 'text-red-600'}>
                  {winner}
                </span> wins!
              </p>
            ) : (
              <p className="text-xl">
                Next player: 
                <span className={`font-bold ml-2 ${isXNext ? 'text-blue-600' : 'text-red-600'}`}>
                  {isXNext ? 'X' : 'O'}
                </span>
              </p>
            )}
          </div>

          {/* Board */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {board.map((value, index) => (
              <Cell key={index} index={index} value={value} />
            ))}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetGame}
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            New Game
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            This game demonstrates how easy it is to create and deploy apps with cra-run
          </p>
          <p className="mt-2">
            <a 
              href="https://github.com/vedanta/cra-run" 
              className="text-blue-500 hover:text-blue-600"
            >
              Learn more about cra-run
            </a>
          </p>
        </div>
      </div>

      {/* Documentation Modal */}
      {showDocs && <DocumentationModal />}
    </div>
  );
};

export default TicTacToe;