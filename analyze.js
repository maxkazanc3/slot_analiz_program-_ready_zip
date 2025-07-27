import { useState } from 'react';

const GameAnalyzer = () => {
  // State'lerin tanımlanması
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [game, setGame] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    // Önceki sonuçları ve hataları temizle
    setError('');
    setAnalysisResult('');
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl, username, password, playerId, game }),
      });

      // HTTP hata kodlarını yakala
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'API isteği başarısız oldu');
      }

      const data = await res.json();
      setAnalysisResult(data.prediction);
    } catch (err) {
      setError(err.message || 'Bilinmeyen bir hata oluştu');
      console.error('Analiz hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyzer-container">
      <h2>Oyun Analiz Aracı</h2>
      
      <div className="input-group">
        <label>Site URL:</label>
        <input
          type="url"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder="https://www.betplay332.com/tr/"
        />
      </div>
      
      <div className="input-group">
        <label>Kullanıcı Adı:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı adınız"ufkerkya98
        />
      </div>
      
      <div className="input-group">
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifreniz"2KKsXmk"
        />
      </div>
      
      <div className="input-group">
        <label>Oyuncu ID:</label>
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Oyuncu ID numarası"228425777"
        />
      </div>
      
      <div className="input-group">
        <label>Oyun:</label>
        <select
          value={game}
          onChange={(e) => setGame(e.target.value)}
        >
          <option value="">Oyun seçin</option>
          <option value="lol">League of Legends</option>
          <option value="csgo">Counter-Strike</option>
          <option value="dota2">Dota 2</option>
        </select>
      </div>
      
      <button 
        onClick={handleAnalyze}
        disabled={isLoading || !siteUrl || !username || !password}
        className="analyze-button"
      >
        {isLoading ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
      </button>
      
      {error && <div className="error-message">Hata: {error}</div>}
      
      {analysisResult && (
        <div className="result-container">
          <h3>Analiz Sonucu:</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

// Basit CSS stilleri (React bileşeninize ekleyin veya ayrı CSS dosyası kullanın)
const styles = `
  .analyzer-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .analyze-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
  }
  
  .analyze-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #d32f2f;
    margin-top: 10px;
    padding: 10px;
    background-color: #ffebee;
    border-radius: 4px;
  }
  
  .result-container {
    margin-top: 20px;
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 4px;
  }
`;

// CSS'i eklemek için (componentDidMount benzeri)
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default GameAnalyzer;
