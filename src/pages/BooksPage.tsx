import { BookCards } from "../components";
import books from "../books.json";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Book } from "../types/BookType";
import { Layout } from "../components/Layout";
import { BooksContext } from "../context/BooksContext";

export const BooksPage = () => {
    const {User} = useContext(UserContext);
    const {BooksData, setBooksData} = useContext(BooksContext);

    useEffect(() => {
        if(User && User.readBookList.length > 0) {
            let newArray: Array<Book> = [];
            for (const storedBook of User.readBookList) {
               newArray = BooksData.filter((x) => x.book !== storedBook.book)
            }
            window.localStorage.setItem("BookData", JSON.stringify(newArray));
            setBooksData(newArray);
        }
    }, [User]);

    return(
        <Layout>
            <section className="p-10 flex justify-normal items-start flex-wrap gap-4 w-[90%] h-full">
                <BookCards booksData={BooksData}/>
            </section>
        </Layout>
    )
}