import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  
function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [showCharacters, setShowCharacters] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);
  const [showHighestAlphabet, setShowHighestAlphabet] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-endpoint/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting JSON:', error);
    }
  };

  const handleToggle = (section) => {
    if (section === 'characters') setShowCharacters(!showCharacters);
    if (section === 'numbers') setShowNumbers(!showNumbers);
    if (section === 'highestAlphabet') setShowHighestAlphabet(!showHighestAlphabet);
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON'
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <button onClick={() => handleToggle('characters')}>Toggle Characters</button>
          <button onClick={() => handleToggle('numbers')}>Toggle Numbers</button>
          <button onClick={() => handleToggle('highestAlphabet')}>Toggle Highest Alphabet</button>
          {showCharacters && (
            <div>
              <h3>Characters</h3>
              <ul>
                {response.alphabets.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>
          )}
          {showNumbers && (
            <div>
              <h3>Numbers</h3>
              <ul>
                {response.numbers.map((num, index) => (
                  <li key={index}>{num}</li>
                ))}
              </ul>
            </div>
          )}
          {showHighestAlphabet && (
            <div>
              <h3>Highest Alphabet</h3>
              <ul>
                {response.highest_alphabet.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;