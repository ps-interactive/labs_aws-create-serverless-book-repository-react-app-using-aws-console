import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import apiLink from '../apiLink';
import BookItem from './BookItem';

const BooksList = () => {

    const [BooksListData, setBooksListData] = useState([]);

    useEffect(() => {
        
        // Make a request for a user with a given ID
        axios.get(apiLink)
            .then(function (response) {
                // handle success
                if( response.data.body.Count > 0 ){
                    setBooksListData(response.data.body.Items)
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    },[]);

    return (
        <div className="container">
            <h1 className="py-5">Books Repo</h1>
            <Link to="/add-books" className="btn btn-info mb-5">Add Books</Link>

            <div className="card-section">
                
                    {BooksListData.map( (data, indexData) => 
                    (
                        <BookItem data={data} key={indexData} />
                    ))}
                
            </div>
        </div>
    );
}

export default BooksList;