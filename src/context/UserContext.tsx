import React, { SetStateAction, createContext, useEffect } from "react";
import type { Book } from "../types/BookType";
import type { User } from "../types/UserType";


interface UserContext {
    User: User | undefined,
    setUser: React.Dispatch<SetStateAction<User | undefined>>
}

export const UserContext = createContext<UserContext>({User: undefined, setUser: () => {}});

export const UserContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [User, setUser] = React.useState<User | undefined>({
        username: "Hyzun",
        email: "",
        avatar: null,
        purchasedBooks: [],
        readBookList: []
    });
    console.log(User);
    useEffect(() => {

        const StoredUser = window.localStorage.getItem("storedUser");

        if(!User && StoredUser) {
           return setUser(JSON.parse(StoredUser));
        }

        window.localStorage.setItem("storedUser", JSON.stringify(User));
    }, [User])


    useEffect(() => {
        const storedBookData = window.localStorage.getItem("BookData");
        if(storedBookData) {
            window.localStorage.setItem("BookData", JSON.stringify(User?.readBookList));
        }
    }, [User?.readBookList]);


    return(
        <UserContext.Provider value={{User, setUser}}>
            {children}
        </UserContext.Provider>
    )
}