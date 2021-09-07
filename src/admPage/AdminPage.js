import React, { useState, useEffect } from 'react';
import db from './firebase-config'
import firebase from 'firebase';
import './AdminPage.css'
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Button, TextField, Container, Dialog, DialogContent, DialogActions,NativeSelect,InputLabel } from '@material-ui/core';


export default function AdminPage() {
const [books, setBooks] = useState([]);
const [input, setInput] = useState('');
const [open, setOpen] = useState(false);
const [update, setUpdate] = useState('');
const [updateImg, setUpdateImg] = useState('');
const [updateDesc, setUpdateDesc] = useState('');
const [updatePrice, setUpdatePrice] = useState('');
const [updateSel, setUpdateSel] = useState('');
const [toUpdateId, setToUpdateId] = useState('');
const [img, setInputs] = useState('');
const [sel, setSelect] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');

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

}, []);

  const addBooks = (event) => {
    event.preventDefault();
    db.collection('books').add({
      book: input,
      img:img,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      sel:sel,
      description:description,
      price:price
    })

    setInput('');
    setInputs('');
    setSelect('');
    setDescription('');
    setPrice('');
  }

    const deleteBooks = (id) => {
      db.collection('books').doc(id).delete().then(res => {
        console.log('Deleted!', res);
      });
    }

    const openUpdateDialog = (book) => {
      setOpen(true);
      setToUpdateId(book.id);
      setUpdate(book.name);
      setUpdateDesc(book.description);
      setUpdateImg(book.img);
      setUpdatePrice(book.price);
      setUpdateSel(book.sel);
    }

  const editBooks = () => {
    db.collection('books').doc(toUpdateId).update({
      book: update,
      img: updateImg,
      sel:updateSel,
      description:updateDesc,
      price:updatePrice,

    });
    setOpen(false);
  }

    const handleClose = () => {
      setOpen(false);
    };

  return(
    <div className="container">
    <header className="adminPage">
      <nav>

        <ul>

            <li><img className="imgs" src="https://img.icons8.com/cotton/64/000000/book.png" alt=''/></li>

          <li><a href="/admin" className="title">Books Shop</a></li>

          <li><a href="/" className="title"><img className="imgs" src="https://img.icons8.com/ios/50/000000/exit.png" alt=''/></a></li>
  
        </ul>

  <div className="login">

      <div><img className="img" src="https://img.icons8.com/dotty/80/000000/admin-settings-male.png" alt=""/>

  </div>

      <span id="text">Admin page</span>
            

      </div>

    </nav>

</header>
<h1>Information Book Shop</h1>
    <Container maxWidth="sm">

      <form noValidate>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="book"
          label="Enter Name Book"
          name="book"
          autoFocus
          value={input}
          onChange={event => setInput(event.target.value)}
        />

          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Enter Description of Book"
          name="description"
          autoFocus
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="price"
          label="Enter Book Price"
          name="price"
          autoFocus
          type='number'
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <InputLabel htmlFor="select">Genre</InputLabel>
        <NativeSelect id="select"  variant="outlined"
          required
          fullWidth
          name="sel"
          autoFocus
          value={sel}
          onChange={event => setSelect(event.target.value)}>
          <option value="Genre">Genre of books</option>
          <option value="Classic">Classic</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
          <option value="Thriller">Thriller</option>
          <option value="Science">Science</option>
        </NativeSelect>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="img"
            label="Enter Img"
            name="img"
            autoFocus
            value={img}
            onChange={event => setInputs(event.target.value)}
          />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addBooks}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Books Information
      </Button>

    </form>

        <div className="list"> {
                  books.map(book => (
                    <div className="lists" key={book.id}>
                      <div className="name">{book.name}</div>
                      <div className="name">{book.sel}</div>
                      <div className="name">{book.price}</div>
                      <div className="name">{book.description}</div>
                      <img className="img" src={book.img} alt='book.img'/>
                      <button className='edit' onClick={() => openUpdateDialog(book)}>Edit</button>
                      <button className='del' onClick={() => deleteBooks(book.id)}>Delete</button>
                      </div>
                  
                  
                  ))}
                  
                  </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              label="Update Information"
              type="text"
              fullWidth
              name="updateBooks"
              value={update}
              onChange={event => setUpdate(event.target.value)}
            />

          <InputLabel htmlFor="select">Genre</InputLabel>
          <NativeSelect id="select"  variant="outlined"
            required
            fullWidth
            name="updateSel"
            autoFocus
            value={updateSel}
            onChange={event => setUpdateSel(event.target.value)}>
            <option value="Genre">Genre of books</option>
            <option value="Classic">Classic</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="Thriller">Thriller</option>
            <option value="Science">Science</option>
          </NativeSelect>

           <TextField
            autoFocus
            margin="normal"
            label="Update Img"
            type="text"
            fullWidth
            name="updateBooks"
            value={updateImg}
            onChange={event => setUpdateImg(event.target.value)}
          />

          <TextField
            autoFocus
            margin="normal"
            label="Update Price"
            type="number"
            fullWidth
            name="updatePrice"
            value={updatePrice}
            onChange={event => setUpdatePrice(event.target.value)}
          />

          <TextField
            autoFocus
            margin="normal"
            label="Update Description"
            type="text"
            fullWidth
            name="updateDescription"
            value={updateDesc}
            onChange={event => setUpdateDesc(event.target.value)}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editBooks} color="primary">
            Save
          </Button>
        </DialogActions>

      </Dialog>

    </Container >
    </div>
  )
}

