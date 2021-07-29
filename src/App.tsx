import React, { Fragment } from 'react';

import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { StyledButton, Wrapper } from './App.styles';
import { promises } from 'dns';
import { useQuery } from 'react-query';
import Item from './item/Item';
import { useState } from 'react';
import Cart from './cart/Cart';
export type CartItemType = {
  id: number,
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number

}

const getProducts = async (): Promise<CartItemType[]> => {

  let data = await fetch('https://fakestoreapi.com/products');
  return await data.json()
}
function App() {
  let [openCart, setOpenCart] = useState(false)
  let [cartItem, setCartItem] = useState([] as CartItemType[])
  let { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  if (isLoading) {
    return <LinearProgress />
  }

  const handleAddCart = (clickedItem: CartItemType) => {
    setCartItem(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      console.log(isItemInCart)
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const getTotalItem = (item: CartItemType[]) => {
    return item.reduce((acc: number, curr) => acc + curr.amount, 0)
  }

  const removeItem = (id: number) => {
    setCartItem(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  }
  return (
    <Fragment>
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <Cart cartItem={cartItem} addToCart={handleAddCart} removeFromCart={removeItem} />
      </Drawer>
      <StyledButton onClick={() => setOpenCart(true)}>
        <Badge badgeContent={getTotalItem(cartItem)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Wrapper>

        <Grid container spacing={3}>
          {data?.map(item => {
            return <Grid item xs={12} sm={4} key={item.id} >
              <Item item={item} handleAddCart={handleAddCart} />
            </Grid>
          })}

        </Grid>

      </Wrapper>
    </Fragment>
  );
}

export default App;
