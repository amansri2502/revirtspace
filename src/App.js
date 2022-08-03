import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './app.module.css';
import Card from './components/Card';

function App() {

  const [data, setData] = useState([]);

  const fetchPokemon = async () => {

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0');
    const pokemonData = [];
    for (let i = 0; i < response.data.results.length; i++) {
      const individualResponse = await axios.get(response.data.results[i].url);
      pokemonData.push(individualResponse.data);
    }
    setData(pokemonData);
  }

  useEffect(() => {
    fetchPokemon();

  }, [])

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.nav}`}></div>
      <div className={`${styles.cardContainer}`}>
        {data.map(item => <Card key={item.id} cardData={item} />)}
      </div>
    </div>
  );
}

export default App;
