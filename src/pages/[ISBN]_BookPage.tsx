import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Book } from "../types/BookType";
import { AddToRead, BookCard } from "../components";
import { Layout } from "../components/Layout";
import books from "../books.json";

export const ISBN_BookPage = () => {
    const {ISBN} = useParams();
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(true);
    // Data
    const [BookData, setBookData] = useState<Book>();


    useEffect(() => {
        const fetchedBook = books.library.find((x) => x.book.ISBN === ISBN);

        if(fetchedBook) {
            setBookData(fetchedBook);
            setisLoading(false);
        }else{
            setisLoading(false);
        }
    }, [ISBN]);





    if((!ISBN && !isLoading) || (ISBN && !BookData && !isLoading)) {
        return(
            <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
                <h1 className="text-white text-2xl font-bold">Are you lost?</h1>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-sm transition-all duration-200 ease-linear hover:animate-pulse hover:-translate-y-1" onClick={() => {navigation("/books")}}>Go back</button>
            </div>
        )
    }

    if(BookData) {
        return(
            <Layout>
                <div className="w-full h-screen flex justify-center items-center">
                    <div className="w-fit h-full flex flex-col md:flex-row justify-between items-center px-2">
                        <div className="m-10 p-5 flex justify-start md:justify-center w-full rounded-md bg-gray-600">
                            <div className="flex flex-col items-center md:flex-row gap-10">
                                    {/* Book Card */}
                                    {BookData && BookData ? <BookCard book={BookData.book}/> : ""}
                                    {/* Book Content */}
                                    <div className="flex flex-col items-start">
                                        <div className="max-w-[300px] md:max-w-[700px] bg-gray-700 rounded-md p-5">
                                        {/* Author */}
                                        <div className="flex flex-row gap-2">
                                            <h1 className="text-blue-200 text-xl font-bold">Author:</h1>
                                            <span className="text-blue-400 text-xl font-bold">{BookData?.book.author.name}</span>
                                        </div>
                                        {/* Synopsis */}
                                        <div className="max-h-[100px] max-w-[300px] overflow-x-hidden overflow-y-auto bg-slate-800 p-2 smallScrollbar">
                                            <h1 className="text-slate-400 max-w-full font-bold h-full">{BookData?.book.synopsis}</h1>
                                        </div>
                                        {/* Other author books */}
                                        <div>
                                            <h1 className="text-blue-200 font-bold">More books of this author:</h1>
                                            <article className="flex flex-col">
                                                {BookData?.book.author.otherBooks.map((otherBook) => {
                                                    return(
                                                        <h2 className="text-white font-bold shadow-sm">{otherBook}</h2>
                                                    )
                                                })}
                                            </article>
                                        </div>
                                        {/* Buttons */}
                                        <div className="flex flex-row items-center gap-5 pt-5">
                                            <button className="bg-green-600 text-white font-bold px-5 py-1 rounded-sm shadow-sm">Buy</button>
                                            {BookData ?  <AddToRead book={BookData.book}/> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return null;
}