import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Github, Book, Lightbulb, HelpCircle, Globe, Code } from 'lucide-react';

const Wordle = () => {
  // Word list - sample words for the game
  const words = [
    'REACT', 'WORDS', 'CODES', 'GAMES', 'CLONE', 'BUILD', 'STYLE', 'HOOKS',
    'STATE', 'PROPS', 'MOUNT', 'ASYNC', 'FETCH', 'ARRAY', 'CLASS', 'EVENT',
    'SCOPE', 'TYPES', 'DEBUG', 'PARSE', 'ROUTE', 'REDUX', 'STORE', 'SLICE'
  ];
  
  const [currentWord, setCurrentWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [showDocs, setShowDocs] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    generateNewWord();
  }, []);

  const generateNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setCurrentRow(0);
  };

  const checkGuess = (guess, word) => {
    const result = [];
    const wordArray = word.split('');
    const guessArray = guess.split('');
    
    // First pass - mark exact matches
    guessArray.forEach((letter, i) => {
      if (letter === wordArray[i]) {
        result[i] = 'correct';
        wordArray[i] = null; // Mark as used
      }
    });
    
    // Second pass - mark partial matches
    guessArray.forEach((letter, i) => {
      if (result[i] === undefined) {
        const wordIndex = wordArray.indexOf(letter);
        if (wordIndex !== -1) {
          result[i] = 'partial';
          wordArray[wordIndex] = null; // Mark as used
        } else {
          result[i] = 'incorrect';
        }
      }
    });
    
    return result;
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5) return;
    
    const result = checkGuess(currentGuess, currentWord);
    const newGuess = {
      word: currentGuess,
      result: result
    };
    
    setGuesses([...guesses, newGuess]);
    
    if (currentGuess === currentWord) {
      setGameState('won');
    } else if (guesses.length >= 5) {
      setGameState('lost');
    } else {
      setCurrentRow(currentRow + 1);
    }
    
    setCurrentGuess('');
  };

  const handleKeyPress = (event) => {
    if (gameState !== 'playing') return;
    
    const key = event.key.toUpperCase();
    
    if (key === 'ENTER') {
      handleSubmit();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.match(/[A-Z]/) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentGuess, gameState]);

  const Cell = ({ letter, status, isCurrentRow, index }) => (
    <div className={`
      w-14 h-14 border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300
      ${status === 'correct' ? 'bg-green-500 text-white border-green-500' : ''}
      ${status === 'partial' ? 'bg-yellow-500 text-white border-yellow-500' : ''}
      ${status === 'incorrect' ? 'bg-gray-500 text-white border-gray-500' : ''}
      ${!status && letter ? 'border-gray-400 text-gray-700' : ''}
      ${!status && !letter && isCurrentRow ? 'border-gray-300 animate-pulse' : ''}
      ${!status && !letter && !isCurrentRow ? 'border-gray-200' : ''}
    `}>
      {letter}
    </div>
  );

  const DocumentationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-6">
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
              <Code className="mr-2 text-blue-500" size={20} />
              Quick Start with Claude
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-medium mb-2">1. Ask Claude to create an app:</h4>
              <pre className="text-sm text-gray-700">{`"Create a React todo list app with dark mode"
"Build a calculator app with scientific functions"
"Make a React dashboard with charts"`}</pre>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Globe className="mr-2 text-green-500" size={20} />
              Deploy in Minutes
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm">{`# 1. Clone cra-run template
git clone https://github.com/vedanta/cra-run my-app
cd my-app

# 2. Add your Claude-generated code
cd templates/jsx
# Copy your code to src/App.jsx

# 3. Test locally
npm install && npm start

# 4. Deploy to GitHub Pages
git remote set-url origin https://github.com/username/my-app.git
git push -u origin main

# 5. Enable GitHub Pages in repository settings
# Select "GitHub Actions" as source`}</pre>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Why Choose cra-run?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✅ Zero Configuration</h4>
                <p className="text-sm text-gray-600">Ready-to-use React environment with all tools preconfigured</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">✅ Instant Deployment</h4>
                <p className="text-sm text-gray-600">Automatic GitHub Pages deployment with every push</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-purple-600">✅ Modern Stack</h4>
                <p className="text-sm text-gray-600">React 18, Tailwind CSS, Webpack 5, Hot Reloading</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-orange-600">✅ Claude-Optimized</h4>
                <p className="text-sm text-gray-600">Perfect for running AI-generated React applications</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Example Prompts for Claude</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">Game Applications</h4>
                <p className="text-sm text-gray-600">"Create a tic-tac-toe game with AI opponent"</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium">Productivity Tools</h4>
                <p className="text-sm text-gray-600">"Build a Pomodoro timer with task management"</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium">Data Visualization</h4>
                <p className="text-sm text-gray-600">"Create a React app with interactive charts using Recharts"</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-medium">Creative Apps</h4>
                <p className="text-sm text-gray-600">"Design a color palette generator with export features"</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Troubleshooting</h3>
            <div className="space-y-2">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-medium text-yellow-800">Blank page on GitHub Pages?</h4>
                <p className="text-sm text-yellow-700">The template automatically handles paths. Check the Actions tab for deployment status.</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-800">Port 3000 already in use?</h4>
                <p className="text-sm text-blue-700">Run <code>lsof -i :3000</code> to find the process and kill it, or use <code>npm start -- --port 3001</code></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const HelpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">How to Play</h2>
          <button
            onClick={() => setShowHelp(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <p>Guess the 5-letter word in 6 tries!</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-sm">W</div>
              <span className="text-sm">Green: Letter is in the correct position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white text-sm">O</div>
              <span className="text-sm">Yellow: Letter is in the word but wrong position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white text-sm">R</div>
              <span className="text-sm">Gray: Letter is not in the word</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Type letters and press Enter to submit. Press Backspace to delete.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Wordle Clone</h1>
          <p className="text-gray-600 mb-4">
            Built with <span className="font-semibold text-purple-600">cra-run</span> template
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <HelpCircle size={20} />
              How to Play
            </button>
            <button
              onClick={() => setShowDocs(true)}
              className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
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

        {/* Game Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
          {/* Game Status */}
          <div className="mb-6 text-center">
            {gameState === 'won' && (
              <div className="text-green-600">
                <p className="text-2xl font-bold">🎉 You Won!</p>
                <p>The word was: {currentWord}</p>
              </div>
            )}
            {gameState === 'lost' && (
              <div className="text-red-600">
                <p className="text-2xl font-bold">😔 Game Over</p>
                <p>The word was: {currentWord}</p>
              </div>
            )}
            {gameState === 'playing' && (
              <p className="text-xl text-gray-600">
                Guess {guesses.length + 1} of 6
              </p>
            )}
          </div>

          {/* Game Grid */}
          <div className="space-y-2 mb-6">
            {Array(6).fill().map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 justify-center">
                {Array(5).fill().map((_, cellIndex) => {
                  const guess = guesses[rowIndex];
                  const isCurrentRow = rowIndex === currentRow;
                  let letter = '';
                  let status = '';
                  
                  if (guess) {
                    letter = guess.word[cellIndex];
                    status = guess.result[cellIndex];
                  } else if (isCurrentRow && currentGuess[cellIndex]) {
                    letter = currentGuess[cellIndex];
                  }
                  
                  return (
                    <Cell
                      key={cellIndex}
                      letter={letter}
                      status={status}
                      isCurrentRow={isCurrentRow}
                      index={cellIndex}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Current Guess Display */}
          <div className="text-center mb-4">
            <input
              ref={inputRef}
              type="text"
              value={currentGuess}
              onChange={() => {}} // Handled by keydown event
              placeholder="Type your guess..."
              className="text-center text-xl p-2 border-2 border-gray-300 rounded-lg max-w-40"
              maxLength={5}
              autoFocus
            />
          </div>

          {/* New Game Button */}
          <button
            onClick={generateNewWord}
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            New Game
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>This Wordle clone demonstrates how easy it is to build games with cra-run</p>
          <p className="mt-2">
            <a 
              href="https://github.com/vedanta/cra-run" 
              className="text-purple-500 hover:text-purple-600"
            >
              Try building your own app with Claude
            </a>
          </p>
        </div>
      </div>

      {/* Modals */}
      {showDocs && <DocumentationModal />}
      {showHelp && <HelpModal />}
    </div>
  );
};

export default Wordle;