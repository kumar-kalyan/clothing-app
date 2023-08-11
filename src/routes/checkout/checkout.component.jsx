import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { placeUserOrder} from '../../utils/firebase/firebase.utils'
import Button from '../../components/button/button.component'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { UserContext } from '../../context/user.context'

// Display Items from the cart 
// Can Delete cart Items

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)
  
  const placeOrder = async () => {

    try {
      const res = await placeUserOrder(cartTotal, cartItems)
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="place-order">
        <Total>TOTAL: ${cartTotal}</Total>
        <Button onClick={placeOrder}>Place Order</Button>
      </div>

    </CheckoutContainer>
  )
}

export default Checkout; 