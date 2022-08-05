import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './app.module.css';
import Card from './components/Card';

function App() {

  const [data, setData] = useState([]);
  const [keyword, setkeyword] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const fetchPokemon = async () => {

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredList(data.filter((item) => item.name.startsWith(keyword.trim().toLowerCase())))
      console.log(keyword);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [keyword, data]);

  const list = keyword ? filteredList : data

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.nav}`}>
        <input placeholder='Search by name' type="text" value={keyword} onChange={(e) => setkeyword(e.target.value)} />
      </div>
      <div className={`${styles.cardContainer}`}>
        {list.map(item => <Card key={item.id} cardData={item} />)}
      </div>
    </div>
  );
}

export default App;
