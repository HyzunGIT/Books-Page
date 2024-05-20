import React, { SetStateAction, createContext, useEffect, useState } from "react";
import { Book } from "../types/BookType";
import books from "../books.json";


interface IBooksContext {
    BooksData: Array<Book>,
    setBooksData: React.Dispatch<SetStateAction<Array<Book>>>
}

export const BooksContext = createContext<IBooksContext>({BooksData: [], setBooksData: () => {}});

export const BooksContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [BooksData, setBooksData] = useState<Array<Book>>([]);
    const storedBookData = window.localStorage.getItem("BooksData");

    useEffect(() => {
        if(storedBookData) {
            setBooksData(JSON.parse(storedBookData));
        }else{
            setBooksData(books.library)
        }
    }, []);

    return(
        <BooksContext.Provider value={{BooksData, setBooksData}}>
            {children}
        </BooksContext.Provider>
    )
}