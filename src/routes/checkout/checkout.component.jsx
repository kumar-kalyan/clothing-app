import './checkout.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import Button from '../../components/button/button.component'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

// Display Items from the cart 
// Can Delete cart Items

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)
  console.log(cartItems)

  return (<div className='checkout-container'>
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="place-order">
        <div className='total'>TOTAL: ${cartTotal}</div>
        <Button>Place Order</Button>
      </div>

    </div>
  </div>)
}

export default Checkout; 