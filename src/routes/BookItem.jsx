import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import apiLink from '../apiLink';

const BoookItem = ( { data } ) => {

    const [showEditSection, setShowEditSection] = useState(false);
    const [dataPublishedDate, showDatapublishedDate] = useState(data.publishedDate);
    const [dataRatings, showDataRatings] = useState(data.ratings);
    const [editMsg, setEditMsg] = useState(false);
    const [deleteMsg, setDeleteMsg] = useState(false);

    const inputPublishedDateRef = useRef(null);
    const inputRatingsRef = useRef(null);

    let history = useHistory();

    const deleteItems = (e, bookName, author) => {
        e.preventDefault();

        axios.delete(apiLink, {
            data:{
                bookName: data.bookName,
                author: data.author
            }
        })
            .then(function (response) {
                console.log(response);
                if( response.data.success ){
                    console.log(response);
                    history.go(0)
                }
                else{
                    setDeleteMsg(<p className='text-danger pt-3'>Error while deleting {data.bookName}.</p>);
                } 
            })
            .catch(function (error) {
                console.log(error);
                setDeleteMsg(<p className='text-danger pt-3'>Error while deleting {data.bookName}.</p>);
            });
    };

    const showEditItem = (e) => {
        e.preventDefault();
        setShowEditSection(!showEditSection);
    };

    const editItem = (e, bookName, author) => {
        e.preventDefault();
        
        let bookEditData = {
            bookName: bookName,
            author: author,
            publishedDate: inputPublishedDateRef.current.value,
            ratings: inputRatingsRef.current.value
        }

        axios.put(apiLink, bookEditData)
            .then(function (response) {
                console.log(response);
                if( response.data.success ){
                    console.log(response);
                    showDatapublishedDate(inputPublishedDateRef.current.value);
                    showDataRatings(inputRatingsRef.current.value);
                    setEditMsg(<p className="text-success pt-3">{data.bookName} was edited successfully.</p>);
                }
                else{
                    setEditMsg(<p className='text-danger pt-3'>Error while updating {data.bookName}.</p>);
                }
            })
            .catch(function (error) {
                console.log(error);
                setEditMsg(<p className='text-danger pt-3'>Error while updating {data.bookName}.</p>);
            })
            .then(function (error) {
                setShowEditSection(!showEditSection);
            });
    };

    return ( 
        <div className="card mb-5" >
            <div className="card-header">
                Book #{data.bookName}
            </div>
            <div className="card-body">
                <h5 className="card-title">{data.bookName}</h5>
                <p className="card-text">Author: {data.author}</p>
                <p className="card-text">Published Date: {dataPublishedDate}</p>
                <p className="card-text pb-2">Ratings: {dataRatings}</p>

                <div className="row">
                    <div className="col-sm-2">
                        <Link to="/" onClick={(e) => {deleteItems(e, data.bookName, data.author)}} className=" w-100 btn btn-danger" >Delete</Link>
                    </div>
                    {!showEditSection &&
                        <div className="col-sm-2" >
                            <Link to="/" onClick={(e) => { showEditItem(e)}} className="w-100 btn btn-info">Edit</Link>
                        </div>
                    }
                </div>
                
                { editMsg && editMsg }
                { deleteMsg && deleteMsg }

                { showEditSection &&
                    <>
                    <div className="row mt-5">
                        <div className="col-sm-8">
                            <h5 className="mb-2">Edit</h5>
                        </div>
                        
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label htmlFor="bookName">Published Date</label>
                                <input type="date" className="form-control" id="publishedDate" placeholder="Published Date" 
                                defaultValue={dataPublishedDate}
                                ref={inputPublishedDateRef}
                                />
                            </div>
                        </div>
                        
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label htmlFor="bookName">Ratings</label>
                                <input type="number" min="0" max="5" className="form-control" id="ratings" 
                                placeholder="Ratings"
                                defaultValue={dataRatings}
                                ref={inputRatingsRef}
                                // onChange={(e) => setInputRatings(e.target.value)}
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <Link to="/" onClick={(e) => { editItem(e, data.bookName, data.author) }} className="w-100 btn btn-info">Save</Link>
                        </div>
                        <div className="col-sm-12">
                            <Link to="/" onClick={(e) => { showEditItem(e)}} className="d-block text-primary pt-3">Hide Edit section</Link>
                        </div>
                    </div>
                    </>
                }

            </div>
        </div>
    );
}
 
export default BoookItem;