import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth, fetchUserOrders } from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    userOrdersMap: {},
    userInfo: {}
})

export const UserPorvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userOrdersMap, setUserOrdersMap] = useState({})
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            console.log(user);
            const { displayName, email, uid } = user
            setUserInfo({ displayName, email, uid })
            // Get User Orders
            const getOrdersMap = async () => {
                try {
                    const orderMap = await fetchUserOrders()
                    console.log(orderMap)
                    setUserOrdersMap(orderMap)
                }
                catch (error) {
                    console.log(error)
                }

            }
            getOrdersMap();
        })
        return unsubscribe

    }, [])


    // useEffect(() => {
    //     const getOrdersMap = async () => {
    //         try {
    //             const orderMap = await fetchUserOrders()
    //             console.log(orderMap)
    //             setUserOrdersMap(orderMap)
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }

    //     }
    //     getOrdersMap();
    // }, [currentUser])

    const value = { currentUser, setCurrentUser, userOrdersMap, userInfo }


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}