import { useContext, useState } from "react";
import { fetchUserOrders } from "../../utils/firebase/firebase.utils"
import { UserDashContainer, UserDashNav } from "./user-dash.styles";
import Button from "../../components/button/button.component";
import Order from "../../components/order/order.component";
// import { OrdersContext } from "../../context/order.context";
import { UserContext } from "../../context/user.context";
const UserDash = () => {

    const [dashComp, setDashComp] = useState(false)
    const [profileComp, setProfileComp] = useState(true)
    const { userOrdersMap } = useContext(UserContext)

    return (<UserDashContainer>
        <UserDashNav>  <Button buttonType='inverted'>Profile</Button>
            <Button buttonType='inverted'> Orders</Button>
            <Button >Fetch Order </Button>
        </UserDashNav>
        {/* Orders  Component */}
        {Object.keys(userOrdersMap).map((obj) => {
            const order = userOrdersMap[obj]
            const { total, status } = order
            return (
                <Order key={obj} total={total} status={status} orderId={obj} />
            );
        })}

    </UserDashContainer>)
}

export default UserDash;