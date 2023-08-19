import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { OrderContainer } from "./order.styles";
const Order = ({ total, status, orderId }) => {
    // const { userOrdersMap } = useContext(UserContext)

    return (
        <OrderContainer>
           <p>OrderId: {orderId}</p>
           <p>Total: ${total}</p> 
            <p>Status: {status}</p>
        </OrderContainer>

    )
}
export default Order;