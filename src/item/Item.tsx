import { Button } from '@material-ui/core'
import React from 'react'
import { CartItemType } from '../App'
import { Wrapper } from './item.style'
type Props = {
  item: CartItemType;
  handleAddCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddCart }) => {

  return (
    <Wrapper>
      <img src={item.image} alt="image" />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddCart(item)}>Add Cart</Button>

    </Wrapper>
  )
}

export default Item