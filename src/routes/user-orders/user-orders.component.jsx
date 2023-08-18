import { fetchUserOrders } from "../../utils/firebase/firebase.utils"


const UserOrders = () => {
    return (<><h1>Orders Page </h1>
        <button onClick={fetchUserOrders}>Fetch</button></>)
}

export default UserOrders;