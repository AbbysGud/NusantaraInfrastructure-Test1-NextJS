import Navbar from "../navbar";
import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";
import { Book } from "@/app/types/object";

async function getBooks() {
    const res = await fetch('http://localhost:5000/api/books',{
        cache: 'no-store',
    });
    return res.json();
}

export default async function BookList() {
  const books: Book[] = await getBooks();
  return (
    <div>
        <Navbar/>
        <div className="items-center justify-center h-screen py-10 px-10">
            <div className="py-2">
                <AddBook/>
            </div>
            <table className="table w-full table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">ISBN</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td className="items-center justify-center flex">
                                <UpdateBook {...book}/>
                                <DeleteBook {...book}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}