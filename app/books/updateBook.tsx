'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"
import { Book } from "../types/object";

export default function UpdateBook(book: Book) {
    const [ISBN, setISBN] = useState(book.isbn);
    const [title, setTitle] = useState(book.title);
    const [subtitle, setSubtitle] = useState(book.subtitle);
    const [author, setAuthor] = useState(book.author);
    const [published, setPublished] = useState(book.published);
    const [publisher, setPublisher] = useState(book.publisher);
    const [pages, setPages] = useState(book.pages);
    const [description, setDescription] = useState(book.description);
    const [website, setWebsite] = useState(book.website);
    
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent){
        e.preventDefault();

        if(ISBN === "" && title === "") {
            setErrorMessage("ISBN and Title are required fields.");
            return;   
        } else if (ISBN === ""){
            setErrorMessage("ISBN are required fields.");
            return;   
        } else if (title === "") {
            setErrorMessage("Title are required fields.");
            return;
        }

        setIsMutating(true);
        
        await fetch(`http://localhost:5000/api/books/${book.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isbn: ISBN, 
                title: title, 
                subtitle: subtitle, 
                author: author, 
                published: published, 
                publisher: publisher, 
                pages: pages, 
                description: description,
                website: website, 
                updated_at: new Date().toISOString(), 
            })
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setErrorMessage("");
        setModal(!modal);
    }

    return (
        <div>
            
            <button className="btn btn-info btn-sm mr-3" onClick={handleChange}>
                Edit
            </button>
        
            <input 
                type="checkbox" 
                checked={modal} 
                onChange={handleChange} 
                className="modal-toggle"
            />
            
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {book.title}</h3>

                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">ISBN*</label>
                            <input 
                                type="text" 
                                value={ISBN}
                                onChange={(e) => setISBN(e.target.value)}
                                className="input w-full input-bordered" 
                                placeholder="Book ISBN"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Title*</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Title"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Subtitle</label>
                            <input
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Subtitle"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Author"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Published</label>
                            <input
                                type="text"
                                value={published}
                                onChange={(e) => setPublished(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Published Date"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Publisher</label>
                            <input
                                type="text"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Publisher"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Pages</label>
                            <input
                                type="text"
                                value={pages}
                                onChange={(e) => setPages(Number(e.target.value))}
                                className="input w-full input-bordered"
                                placeholder="Book Total Pages"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Description"
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label font-bold">Website</label>
                            <input
                                type="text"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Book Website"
                            />
                        </div>

                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error:</strong>
                                <span className="block sm:inline"> {errorMessage}</span>
                            </div>
                        )}

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            ):(
                                <button type="button" className="btn loading">
                                    Updating...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}