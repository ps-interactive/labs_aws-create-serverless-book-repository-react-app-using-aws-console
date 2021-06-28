import React, { useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import apiLink from '../apiLink';

const AddBooksList = ({ history }) => {

    const inputBookName = useRef(null);
    const inputAuthorName = useRef(null);
    const inputpublishedDate = useRef(null);
    const inputRatings = useRef(null);

    const handleFormSubmited = (e) => {
        e.preventDefault();

        console.log({
            bookName: inputBookName.current.value,
            author: inputAuthorName.current.value,
            publishedDate: inputpublishedDate.current.value
        });

        //insert the book addition code
        axios.post(apiLink, {
            bookName: inputBookName.current.value,
            author: inputAuthorName.current.value,
            publishedDate: inputpublishedDate.current.value,
            ratings: inputRatings.current.value,
        })
            .then(function (response) {

                console.log(response);
                history.push("/");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h1 className="pb-3 pt-5">Add Book</h1>

                    <form>
                        <div className="form-group">
                            <label htmlFor="bookName">Book Name</label>
                            <input ref={inputBookName} type="text" className="form-control" id="bookName" placeholder="Book name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bookName">Author Name</label>
                            <input ref={inputAuthorName} type="text" className="form-control" id="authorName" placeholder="Author name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bookName">Publication Date</label>
                            <input ref={inputpublishedDate} type="date" className="form-control" id="publishedDate" placeholder="Publication Date" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ratings">Ratings</label>
                            <input ref={inputRatings} type="number" min="0" max="5" className="form-control" id="ratings" placeholder="Ratings" />
                        </div>

                        <button onClick={(e) => { handleFormSubmited(e) }} type="submit" className="btn btn-info mb-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(AddBooksList);