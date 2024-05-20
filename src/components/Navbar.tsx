import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookOpen, FaBookBookmark, FaBookSkull } from "react-icons/fa6";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Book } from "../types/BookType";
import { BooksContext } from "../context/BooksContext";


export const Navbar = () => {
    const location = useLocation();
    const {User, setUser} = useContext(UserContext);
    const {BooksData, setBooksData} = useContext(BooksContext);
    const [currentPage, setcurrentPage] = useState("");
    const [showReadListMenu, setShowReadListMenu] = useState(false);
    const navigation = useNavigate();

    function handleShowReadListMenu() {
        setShowReadListMenu(!showReadListMenu);
    }

    function removeFromReadList({book}: Book) {
        setUser(prevContext => {
            if(prevContext) {
              setBooksData(BooksData => [...BooksData, {book: book}]);
                return {
                    ...prevContext,
                    readBookList: [...prevContext.readBookList.filter((x) => x.book.ISBN !== book.ISBN)]
                }
            };
            return prevContext;
        });
    }

    useEffect(() => {
       setcurrentPage(location.pathname);
    }, [location]);

  return (
    <div className="flex justify-center w-full h-full">
    <nav className="fixed bottom-1 w-fit p-2 bg-white rounded-sm z-50">
      <ul className="flex flex-row justify-center items-center h-full gap-3">
        {/* Link to All Books */}
        <li className="relative flex flex-col items-center border-r-2 border-gray-400 h-full pr-2 pl-1 group">
          <Link to="/books" className={currentPage === "/books" ? "text-blue-500 hover:cursor-pointer transition-all duration-300 ease-in-out -translate-y-1" : "hover:text-blue-500 hover:cursor-pointer"}>
            <FaBookOpen 
            size={24}
            />
          </Link>
          <div className="absolute -top-10 h-fit p-1 rounded-sm bg-gray-700 hidden group-hover:block">
            <h1 className="text-white text-sm text-nowrap font-bold w-full">All books</h1>
          </div>
        </li>
        {/* Link to Read Books List */}
        <li className="relative flex flex-col items-center border-gray-400 h-full pr-2 group">
          {showReadListMenu ?
          <FaBookSkull
          size={22} 
          className="hover:cursor-pointer transition-all duration-300 ease-linear text-red-500 -translate-y-1" 
          onClick={handleShowReadListMenu}
          />
          :
          <FaBookBookmark 
          size={22} 
          className="hover:text-blue-500 hover:cursor-pointer" 
          onClick={handleShowReadListMenu}
          />
        
          }
          {/* Hover text */}
          <div className={showReadListMenu ? "absolute -top-10 h-fit p-1 rounded-sm bg-gray-700 hidden" : "absolute -top-10 h-fit p-1 rounded-sm bg-gray-700 hidden group-hover:block"}>
            <h1 className="text-white text-sm text-nowrap font-bold w-full">Read List Book</h1>
          </div>
          {/* Active Read-List-Book Menu */}
          <div className={showReadListMenu ? "absolute -top-72 w-fit h-[300px] -mt-10 p-5 bg-slate-500 rounded-md group-indeterminate" : "hidden"}>
            <div className="flex flex-col items-center justify-center w-full h-full  gap-2">
              <h1 className="text-white text-2xl font-bold">Read List</h1>
              {User && User.readBookList.length > 0  ? 
                (
                    <div className="flex flex-col md:flex-wrap md:min-w-[650px] md:flex-row md:justify-start gap-5 w-full h-56 overflow-y-auto overflow-x-hidden smallScrollbar bg-slate-600 p-2">
                        {User.readBookList.map(({book}) => {
                            return(
                                <div className="w-[100px] h-[100px] hover:cursor-pointer relative mb-10" key={book.ISBN}>
                                    <img
                                    src={book.cover}
                                    className="min-w-[100px] min-h-[100px] max-h-[150px]"
                                    onClick={() => {navigation(`/book/${book.ISBN}`)}}
                                    />
                                    <button className="absolute top-2 right-2 text-sm text-white bg-red-500 px-2" onClick={() => {removeFromReadList({book})}}>X</button>
                                </div>
                            )
                        })}
                    </div>
                ):
                <h1 className="text-white text-xl text-nowrap font-bold">You read-list is empty!</h1>
              }
              {/* <span className="text-black font-bold text-xl">{User?.readLater.length}</span> */}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
  );
};
