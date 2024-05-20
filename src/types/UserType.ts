import type { Book } from "./BookType"

export type User = {
    username: string,
    avatar: string | null
    email: string,
    purchasedBooks: Array<Book> | [],
    readBookList: Array<Book> | []
}