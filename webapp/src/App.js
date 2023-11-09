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

  function update(){
    setResults((name.length > 1) ? getSearchResults(name) : getSearchResults('*'));
    setSuggestions((name.length > 1) ? getSuggestions(name) : []);
  }

  function updateLists(e){
    setName(e.target.value);
    update();
  }

  function clearSuggestions(){
    setSuggestions([]);
  }

  function clearButton(){
    setName('');
    update();
  }

  function editFuzzy(e){
    setFuzzy(e.target.checked);
    update();
  }

  function editPrefix(e){
    setPrefix(e.target.checked);
    update();
  }

  function editCombineWith(e){
    setCombineWith(e.target.value);
    update();
  }

  function selectSuggestion(_name){
    setName(_name);
    setResults(getSearchResults(_name));
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
    <div id="app" onClick={e => clearSuggestions()}>
      <div className="App">
        {
          loading ?
          (<Loader />) :
          (<Main 
            results={results}
            suggestions={suggestions} 
            name={name} 
            fuzzy={fuzzy}
            editFuzzy={editFuzzy}
            prefix={prefix}
            editPrefix={editPrefix}
            combineWith={combineWith}
            editCombineWith={editCombineWith}
            updateLists={updateLists} 
            clearButton={clearButton} 
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
