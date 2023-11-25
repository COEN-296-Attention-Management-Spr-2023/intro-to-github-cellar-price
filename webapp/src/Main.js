import { useState } from 'react';
import './Main.css';
import SearchBox from './SearchBox.js';
import Calculator from './Calculator.js';

const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())

function Main({ 
  results,
  suggestions,
  name,
  setName,
  setSuggestName,
  fuzzy,
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  category,
  setCategory }) {

  const [cart, setCart] = useState([]);

  return (
    <article className="main">
      <Header 
        suggestions={suggestions} 
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
        />
      <div className="middle">
        <ProductList 
          name={name}
          results={results}
          cart={cart}
          setCart={setCart}
          />
        <Calculator
          cart={cart}
          setCart={setCart}
        />
      </div>
    </article>
  );
}

function Header({ 
  suggestions, 
  name, 
  setName,
  setSuggestName,
  fuzzy,
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  category,
  setCategory }) {
  return (
    <header className="Header">
      <h1>Product Catalog</h1>
      <SearchBox 
        suggestions={suggestions} 
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
        />
    </header>
  );
}
function ProductList({ name,results,cart,setCart }) {
  function renderSearchResults(results) {
    const productList = results.map(product => 
      <li key={product.id} className="Product">
        <img src={product.img} alt=""/>
        <div className="ProductContent">
          <h3>{capitalize(product.product)}</h3>
          <dl>
            <dt>Price:</dt> 
            <dd>${product.price}</dd>
          </dl>
          <button onClick={() => {
            let contained = false;

            function checkContined(cartItem) {
              if (cartItem.product.id === product.id) {
                contained = true
              }
            }
            cart.forEach(checkContined);

            if (contained) {
              setCart(cart.map(_cartItem => {
                if (_cartItem.product.id === product.id) {
                  return {product: _cartItem.product, amount: _cartItem.amount + 1};
                }
                else {
                  return _cartItem;
                }
              }));
            } else {
              setCart([
                ...cart,
                {product: product, amount: 1}
              ]);
            }
          }}>Add to Cart</button>
          <dl>
            <details>
              <summary>Description</summary>
              <p>
                {product.desc}
              </p>
            </details>
          </dl>
        </div>
      </li>
    );
    return productList;
  }

  return (
    <>
      {
        results.length > 0 &&
        <ul className="ProductList">
          { name.length < 2 &&
            <Explanation />
          }
          {renderSearchResults(results)}
        </ul>
      }
    </>
  );
}
function Explanation() {
  return (
    <p className="Explanation">
      Welcome to to product catalog for the Cellar store. Use the search bar to find information about various products and their prices.
    </p>
  );
}

export default Main;