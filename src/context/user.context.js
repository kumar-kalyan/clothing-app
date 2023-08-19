import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth, fetchUserOrders } from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    userOrdersMap: {},
})

export const UserPorvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userOrdersMap, setUserOrdersMap] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
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

    const value = { currentUser, setCurrentUser, userOrdersMap }


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}