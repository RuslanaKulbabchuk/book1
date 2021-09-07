
import './Book.css'
import React, { useState, useEffect } from 'react';
import db from '../admPage/firebase-config';

export default function BookHome(){
    const [books, setBooks] = useState([]);
 
    useEffect(() => {
    
    db.collection('books').orderBy('datetime', 'desc', 'img','sel', 'description', 'price').onSnapshot(snapshot => {
      setBooks(snapshot.docs.map(doc => {
   
        return {
          id: doc.id,
          name: doc.data().book,
          datatime: doc.data().datatime,
          img:doc.data().img,
          sel: doc.data().sel,
          description: doc.data().description,
          price: doc.data().price
        }
      }))
    })
  
  }, [])

    return(<div>

<div className="cards">
<div className="bCards"> {
                  books.map(book => (
                    <div className="list" key={book.id}>
                    <div className="nameBook"> <h4>{book.name}</h4> </div>
                    <div className="card">
                    <div className="bookContainer"> <img className="bookImg" src={book.img} alt=""/></div>
                    <div className="nameBookDesc">{book.description}</div></div>
                    <div className="namePrice"> <h4 className="nameBook">Price: {book.price}$</h4>  </div>
          </div>
                  ))}</div>
                  
                  </div>


    </div>)
}