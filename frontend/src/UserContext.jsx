import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('')

    // useEffect(() => {

    //     fetch('/api/check_session')
    //     .then((res) => {
    //         if (res.ok) {
    //             res.json()
    //         }
    //     })
    //     .then((user) => {
    //         console.log(user)
    //         setUser(user)
    //     });
    // }, []
    // );
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
    };


export const useUser = () => useContext(UserContext);