import { useState } from 'react';
import './App.css';
import Main from './Main';
import MiniSearch from 'minisearch';

function App() {
  const ItemSearch = new MiniSearch({
    fields: ['product'],
    storeFields: ['product', 'price']
  })
  
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [fuzzy, setFuzzy] = useState(true);
  const [prefix, setPrefix] = useState(true);
  const [combineWith, setCombineWith] = useState('OR');

  let productsById = {}
  fetch('cellarprice.json')
    .then(response => response.json())
    .then((allProducts) => {
      productsById = allProducts.reduce((byId, product) => {
        byId[product.id] = product
        return byId
      }, {})
      return ItemSearch.addAll(allProducts)
    }).then(() => {
      setLoading(false);
    })

  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  function updateLists(){
    setResults((name.length > 1) ? getSearchResults(name) : getSearchResults(MiniSearch.wildcard));
    setSuggestions((name.length > 1) ? getSuggestions(name) : []);
    console.log('name = ' + name);
  }

  function clearSuggestions(){
    setSuggestions([]);
  }

  function selectSuggestion(){
    console.log('name = ' + name);
    setResults(getSearchResults(name));
    setSuggestions([]);
  }

  function getSearchOptions() {
    const searchOptions = {}
  
    searchOptions.fuzzy = fuzzy ? 0.2 : false
    searchOptions.prefix = prefix
    searchOptions.combineWith = combineWith
  
    return searchOptions
  }

  function getSearchResults(query) {
    const searchOptions = getSearchOptions()
    return ItemSearch.search(query, searchOptions).map(({ id }) => productsById[id])
  }
  
  function getSuggestions(query) {
    return ItemSearch.autoSuggest(query, { boost: { product: 5 } })
      .filter(({ suggestion, score }, _, [first]) => score > first.score / 4)
      .slice(0, 5)
  }

  return (
    <div id="app" onClick={clearSuggestions}>
      <div className="App">
        {
          loading ?
          (<Loader />) :
          (<Main 
            results={results}
            suggestions={suggestions} 
            name={name} 
            setName={setName}
            fuzzy={fuzzy}
            setFuzzy={setFuzzy}
            prefix={prefix}
            setPrefix={setPrefix}
            combineWith={combineWith}
            setCombineWith={setCombineWith}
            updateLists={updateLists} 
            selectSuggestion={selectSuggestion}
          />)
        }
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div>
      <div className="Loader">loading...</div>
    </div>
  );
}

export default App;
