import React from 'react'
import { CartItemType } from '../App';
import CartItem from '../cartItem/CartItem';
import { Wrapper } from './cart.style';
type Props = {
  cartItem: CartItemType[],
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;

}
const calculateTotal = (item: CartItemType[]) => {
  return item.reduce((acc, curr) => acc + curr.amount * curr.price, 0)
}
const Cart: React.FC<Props> = ({ cartItem, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItem.length === 0 ? <p>No items in cart.</p> : null}
      {cartItem.map(item => <CartItem item={item} key={item.id} addToCart={addToCart} removeFromCart={removeFromCart} />)}
      <h2>Total: ${calculateTotal(cartItem).toFixed(2)}</h2>

    </Wrapper>
  )
}

export default Cart;

