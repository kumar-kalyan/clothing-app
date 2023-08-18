import { fetchUserOrders } from "../../utils/firebase/firebase.utils"
import { UserDashContainer } from "./user-dash.styles";
import Button from "../../components/button/button.component";

const UserDash = () => {
    return (<UserDashContainer>
        <Button buttonType='inverted'>Profile</Button>
        <Button buttonType='inverted'>Orders</Button>
    </UserDashContainer>)
}

export default UserDash;