import './Main.css';
import SearchBox from './SearchBox.js';

const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())

function Main({ 
  results,
  suggestions,
  name,
  setName,
  fuzzy,
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  updateLists,
  selectSuggestion }) {
  return (
    <article className="main">
      <Header 
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
        />
      <Explanation />
      <ProductList results={results}/>
    </article>
  );
}

function Header({ 
  suggestions, 
  name, 
  setName,
  fuzzy,
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  updateLists, 
  selectSuggestion }) {
  return (
    <header className="Header">
      <h1>Product Catalog</h1>
      <SearchBox 
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
        />
    </header>
  );
}
function Explanation() {
  return (
    <p className="Explanation">
      Welcome to to product catalog for the Cellar store. Use the search bar to find information about various products and their prices.
    </p>
  );
}
function ProductList({ results }) {
  function renderSearchResults(results) {
    const productList = results.map(product => 
      <li key={product.id} className="Product">
        <h3>{capitalize(product.product)}</h3>
        <dl>
          <dt>Price:</dt> <dd>${product.price}</dd>
        </dl>
      </li>
    );
    return productList;
  }

  return (
    <>
      { results.length > 0 &&
      <ul className="ProductList">
        {renderSearchResults(results)}
      </ul>
      }
    </>
  );
}

export default Main;