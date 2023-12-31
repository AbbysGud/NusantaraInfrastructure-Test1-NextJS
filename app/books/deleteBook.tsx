'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import { Book } from "@/app/types/object";

export default function DeleteBook(book: Book) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleDelete(id: number){

        setIsMutating(true);

        await fetch(`http://localhost:5000/api/books/${id}`,{
            method: 'DELETE',
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }

    return (
        <div>
            
            <button className="btn btn-error btn-sm" onClick={handleChange}>
                Delete
            </button>
            
            <input 
                type="checkbox" 
                checked={modal} 
                onChange={handleChange} 
                className="modal-toggle"
            />
            
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are you sure you want to delete {book.title}?
                    </h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(book.id)} className="btn btn-primary">
                                Delete
                            </button>
                        ):(
                            <button type="button" className="btn loading">
                                Deleting...
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}