import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss'
export const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    return (<div className='cart-dropdown-container'>
        <div className="cart-items">
            {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
        </div>
        {cartItems.length>0 && <Link to='/checkout' className='button'><Button >GO TO CHECKOUT</Button></Link>}
    </div>)
}
export default CartDropdown;    