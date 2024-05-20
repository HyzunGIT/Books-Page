import { useContext } from "react"
import { Book } from "../../types/BookType"
import { UserContext } from "../../context/UserContext"
import { BooksContext } from "../../context/BooksContext";
import { ToastContainer, toast } from 'react-toastify';

export const AddToRead = (book: Book) => {
    const {User, setUser} = useContext(UserContext);
    const notifySuccess = () => toast("Added!");
    const notifyRemove = () => toast("Removed!");

    function handleAddToReadList() {   
        if(User) {
            setUser(prevContext => {
                if(prevContext && prevContext.readBookList) {
                    return {
                        ...prevContext,
                        readBookList: [...prevContext.readBookList, book]
                    }
                };
                return prevContext;
            })
        }
    }


    function handleRemoveOfReadList() {
        if(User) {
            setUser(prevContext => {
                if(prevContext) {
                    return {
                        ...prevContext,
                        readBookList: [...prevContext.readBookList.filter((x) => x.book.ISBN !== book.book.ISBN)]
                    }
                }
            })
        }
    }


    if(User && User.readBookList.find(x => x.book.ISBN === book.book.ISBN)) {
        return(
            <button className="bg-red-500 text-white font-bold px-2 py-1 rounded-sm shadow-sm" onClick={() => {handleRemoveOfReadList(); notifyRemove()}}>Remove of read-list</button>
        )
    }


    return(
        <button className="bg-yellow-500 text-white font-bold px-2 py-1 rounded-sm shadow-sm" onClick={() => {handleAddToReadList(); notifySuccess()}}>Add to read</button>
    )
}