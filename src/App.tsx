
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootPage, BooksPage, ISBN_BookPage } from './pages';
import { UserContextProvider } from './context/UserContext';
import { BooksContextProvider } from './context/BooksContext';


function App() {
  return (
    <BooksContextProvider>
      <UserContextProvider>
        <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<RootPage/>}/>
            <Route path="/books" element={<BooksPage/>}/>
            <Route path="/book/:ISBN" element={<ISBN_BookPage/>}/> 
          </Routes>
        </div>
        </BrowserRouter>
      </UserContextProvider>
    </BooksContextProvider>
  );
}

export default App;
