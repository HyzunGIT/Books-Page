import React, {useContext, useState} from "react";
import Skeleton from "react-loading-skeleton";
// Types
import type { Book } from "../types/BookType";
import { useNavigate } from "react-router-dom";

export const BookCards: React.FC<{booksData: Book[] }> = ({booksData}) => {
    const [isImageLoaded, setisImageLoaded] = useState(false);
    const navigation = useNavigate()

    function handleImageLoad() {
        setisImageLoaded(true);
    }

    return(
        <>
            {booksData.map(({book}) => {
                return(
                    <article className="relative max-w-[170px] max-h-[200px] group hover:cursor-pointer" onClick={() => {navigation(`/book/${book.ISBN}`)}} key={book.ISBN}>
                        <div className="transition-all duration-200 -z-0">
                            <img
                                src={book.cover}
                                alt=""
                                className={isImageLoaded ? "w-[150px] h-[200px] rounded-sm shadow-md transition-all duration-300 ease-linear group-hover:-translate-y-2 group-hover:animate-pulse group-hover:border-blue-700 group-hover:border-4" : "hidden"}
                                onLoad={() => handleImageLoad()}
                            />
                            {isImageLoaded ? <h1 className={book.author.name.length > 18 ? "absolute bottom-2 left-1 px-2 text-sm max-w-[120px] overflow-hidden bg-blue-600 text-white font-bold rounded-sm transition-all duration-300 ease-linear group-hover:left-0" : "absolute bottom-2 left-1 px-2 text-sm text-nowrap max-w-[120px] overflow-hidden bg-blue-600 text-white font-bold rounded-sm transition-all duration-300 ease-linear group-hover:left-0"}>{book.author.name}</h1> : ""}
                            {
                                !isImageLoaded ? (
                                    <>
                                        <Skeleton containerClassName="relative overflow-hidden" width={150} height={200} enableAnimation  baseColor="#696969" highlightColor="#FFFF"/>
                                        <Skeleton className="absolute bottom-10 left-0 px-2 overflow-hidden" width={80}/>
                                    </>
                                )
                                : ""
                            }
                        </div>
                </article>
                )
            })}
        </>
    )
}


/*
                                <div className="hidden group-hover:block absolute bottom-0-left-5 z-20 max-w-[250px] h-fit md:p-3 rounded-md bg-slate-700 ring-2 ring-slate-500 bg-opacity-85">
                                <article className="flex flex-col items-start gap-2 group-hover:block hover:block p-2">
                                <div className="flex flex-col">
                                <h1 className="text-white font-bold text-lg">Synopsis:</h1>
                                <div className="max-h-[100px] max-w-[170px] overflow-y-auto overflow-x-hidden smallScrollbar md:max-w-fit">
                                <span className="text-slate-400 font-bold">{book.synopsis}</span>
                                </div>
                            </div>
                        <div className="w-full flex flex-row items-center gap-5 pt-2">
                            <button className="bg-green-700 text-white font-bold px-2 w-[70px] rounded-sm shadow-lg">Buy</button>
                            <button className="bg-yellow-600 text-white text-nowrap font-bold px-2 w-fit rounded-sm shadow-lg" onClick={() => {handleAddToRead({book})}}>Add to read</button>
                        </div>
                        </article>
                    </div>
*/