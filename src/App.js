import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './app.module.css';
import Card from './components/Card';

function App() {

  const [data, setData] = useState([]);
  const [keyword, setkeyword] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setloading] = useState(false);
  const [list, setList] = useState([]);

  const fetchPokemon = async () => {
    setloading(true)
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
    const pokemonData = [...data];
    for (let i = 0; i < response.data.results.length; i++) {
      const individualResponse = await axios.get(response.data.results[i].url);
      pokemonData.push(individualResponse.data);
    }
    setData(pokemonData);
    setloading(false);
  }

  useEffect(() => {
    fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredList(data.filter((item) => item.name.startsWith(keyword.trim().toLowerCase())))
      console.log(keyword);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [keyword, data]);

  useEffect(() => {
    setList(keyword ? filteredList : data)


  }, [list, keyword, filteredList, data])



  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.nav}`}>
        <input placeholder='Search by name' type="text" value={keyword} onChange={(e) => setkeyword(e.target.value)} />
      </div>
      <div className={`${styles.cardContainer}`}>
        {list.map(item => <Card key={item.id} cardData={item} />)}
      </div>
      {list.length > 0 && !keyword && <div className={`${styles.navigator}`}><button disabled={loading} onClick={() => setOffset(10000 - offset < 50 ? 10000 : offset + 50)}>Load more</button></div>}
    </div>
  );
}

export default App;
