import { useState, useRef } from 'react';
import './App.css';
import Main from './Main';
import MiniSearch from 'minisearch';

function App() {
  const productsById = useRef(null);
  const ItemSearch = useRef(null);
  if (ItemSearch.current === null) {
    ItemSearch.current = new MiniSearch({
      fields: ['product'],
      storeFields: ['product', 'price']
    });
    fetch('cellarprice.json')
      .then(response => response.json())
      .then((allProducts) => {
        productsById.current = allProducts.reduce((byId, product) => {
          byId[product.id] = product
          return byId
        }, {})
        return ItemSearch.current.addAll(allProducts)
      }).then(() => {
        setLoading(false);
      })
  }
  
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [suggestName, setSuggestName] = useState('');
  const [fuzzy, setFuzzy] = useState(true);
  const [prefix, setPrefix] = useState(true);
  const [combineWith, setCombineWith] = useState('OR');
  const [category, setCategory] = useState('none');
  
  function getSearchOptions() {
    const searchOptions = {}
  
    searchOptions.fuzzy = fuzzy ? 0.2 : false
    searchOptions.prefix = prefix
    searchOptions.combineWith = combineWith
    searchOptions.filter = category === 'none' ? (result) => true : (result) => result.category === category
  
    return searchOptions
  }

  function getSearchResults(query) {
    const searchOptions = getSearchOptions()
    return ItemSearch.current.search(query, searchOptions).map(({ id }) => productsById.current[id])
  }
  
  function getSuggestions(query) {
    return ItemSearch.current.autoSuggest(query, { boost: { product: 5 } })
      .filter(({ suggestion, score }, _, [first]) => score > first.score / 4)
      .slice(0, 5)
  }
  
  function calculateResults() {
    const results = (name.length > 1) ? getSearchResults(name) : getSearchResults(MiniSearch.wildcard);
    return results
  }

  function calculateSuggestions() {
    const suggestions = (suggestName.length > 1) ? getSuggestions(suggestName) : [];
    return suggestions
  }

  return (
    <div id="app" onClick={() => setSuggestName('')}>
      <div className="App">
        {
          loading ?
          (<Loader />) :
          (<Main 
            results={calculateResults()}
            suggestions={calculateSuggestions()} 
            name={name} 
            setName={setName}
            setSuggestName={setSuggestName}
            fuzzy={fuzzy}
            setFuzzy={setFuzzy}
            prefix={prefix}
            setPrefix={setPrefix}
            combineWith={combineWith}
            setCombineWith={setCombineWith}
            category={category}
            setCategory={setCategory}
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
