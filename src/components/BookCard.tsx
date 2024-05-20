import { Book } from "../types/BookType";


export const BookCard = ({book}: Book) => {
    return(
        <>
            <article className="">
                <img
                src={book.cover}
                className="max-w-[230px] max-h-[270px]"
                />
                <h1 className="text-white text-2xl text-center md:text-start text-wrap max-w-[180px] font-bold">{book.title}</h1>
            </article>
        </>
    )
}