import { useState } from 'react';
import './Calculator.css';

const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())

function Calculator({ cart,setCart }) {
  const [budget, setBudget] = useState(0.00);

  function calculatePrice() {
    let sum = 0.0;
    function sumPrice(cartItem) {
      sum += cartItem.product.price * cartItem.amount;
    }
    cart.forEach(sumPrice);
    return sum;
  }

  return (
    <div className="Calculator">
      <dl>
        <dt>Student Budget: </dt>
        <input value={budget} onChange={e => {
            setBudget(e.target.value);}} 
            type="number" autoComplete="none" min="0.00" step="0.01"/>  
      </dl>
      <CartList cart={cart} setCart={setCart}/>
      <dl>
        <dt>Calculated Price:</dt> <dd>${Math.round((calculatePrice() + Number.EPSILON) * 100) / 100}</dd>
      </dl>
      <dl>
        <dt>Remaining Budget:</dt> <dd>${Math.round((budget - calculatePrice() + Number.EPSILON) * 100) / 100}</dd>
      </dl>
    </div>
  );
}
function CartList({ cart,setCart }) {
  function renderCartResults(cart) {
    const cartList = cart.map(cartItem => 
      <li key={cartItem.product.id} className="CartItem">
        <img src={cartItem.product.img} alt=""/>
        <div className="CartItemContent">
          <h3>{capitalize(cartItem.product.product)}</h3>
          <dl>
            <dt>Price:</dt> <dd>${cartItem.product.price}</dd>
          </dl>
          <dl>
          <button onClick={() => {
              setCart(
                cartItem.amount <= 10 ?
                  cart.filter(_cartItem =>
                    _cartItem.product.id !== cartItem.product.id
                  )
                :
                  cart.map(_cartItem => {
                  if (_cartItem.product.id === cartItem.product.id) {
                    return {product: _cartItem.product, amount: _cartItem.amount - 10};
                  }
                  else {
                    return _cartItem;
                  }
                  })
              );
            }}>-10</button>
            <button onClick={() => {
              setCart(
                cartItem.amount === 1 ?
                  cart.filter(_cartItem =>
                    _cartItem.product.id !== cartItem.product.id
                  )
                :
                  cart.map(_cartItem => {
                  if (_cartItem.product.id === cartItem.product.id) {
                    return {product: _cartItem.product, amount: _cartItem.amount - 1};
                  }
                  else {
                    return _cartItem;
                  }
                  })
              );
            }}>-</button>
            <dt>{cartItem.amount}</dt>
            <button onClick={() => {
              setCart(cart.map(_cartItem => {
                if (_cartItem.product.id === cartItem.product.id) {
                  return {product: _cartItem.product, amount: _cartItem.amount + 1};
                }
                else {
                  return _cartItem;
                }
              }));
            }}>+</button>
            <button onClick={() => {
              setCart(cart.map(_cartItem => {
                if (_cartItem.product.id === cartItem.product.id) {
                  return {product: _cartItem.product, amount: _cartItem.amount + 10};
                }
                else {
                  return _cartItem;
                }
              }));
            }}>+10</button>
          </dl>
        </div>
      </li>
    );
    return cartList;
  }

  return (
    <>
      {
        cart.length > 0 &&
        <ul className="CartList">
          {renderCartResults(cart)}
        </ul>
      }
    </>
  );
}

export default Calculator;