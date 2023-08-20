import { useContext, useState } from "react";
import { fetchUserOrders } from "../../utils/firebase/firebase.utils"
import { ProfileContainer, UserDashContainer, UserDashNav } from "./user-dash.styles";
import Button from "../../components/button/button.component";
import Order from "../../components/order/order.component";
// import { OrdersContext } from "../../context/order.context";
import { UserContext } from "../../context/user.context";
const UserDash = () => {
    const { userOrdersMap, userInfo } = useContext(UserContext)
    
    const { displayName, email, uid } = userInfo


    return (<UserDashContainer>
        <ProfileContainer>
            <Button >Profile</Button>
            <h1>{displayName} </h1>
            <p>uid: {uid}</p>
            <p>email: {email}</p>
        </ProfileContainer>

        <UserDashNav>
            <Button  > Orders</Button>
        </UserDashNav>
        {/* {profileComp && (<h1>Hello World</h1>)} */}
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