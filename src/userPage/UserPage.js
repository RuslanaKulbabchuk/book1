
  import React, { useState, useEffect } from 'react';
  import db from '../admPage/firebase-config'
  import './UserPage.css'
  import firebase from 'firebase';
  import { makeStyles } from '@material-ui/core/styles';
  import Button from '@material-ui/core/Button';
  import Dialog from '@material-ui/core/Dialog';
  import List from '@material-ui/core/List';
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar';
  import IconButton from '@material-ui/core/IconButton';
  import Typography from '@material-ui/core/Typography';
  import CloseIcon from '@material-ui/icons/Close';
  import Slide from '@material-ui/core/Slide';



  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  export default function UserPage() {

    const deleteBooks = (id) => {
      db.collection('basket').doc(id).delete().then(res => {
        console.log('Deleted!', res);
      });
    }   
  const user = window.location.pathname.slice(1)

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
          price: doc.data().price,
        }
      }))
    })

  }, [])

      const [basket, setBst] = useState([]);
      const [users, setUser] = useState('');
      const [price, setPrice] = useState('');
      const [img, setImg] = useState('');

  useEffect(() => {

    db.collection('basket').orderBy('datetime').onSnapshot(snapshot => {
    
      setBst(snapshot.docs.map(doc => {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(1, '0'); 
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
      const date=today
      const us = window.location.pathname.slice(1);

        return {
          id: doc.id,
          name: doc.data().users,
          datatime: doc.data().datatime,
          price:doc.data().price,
          img:doc.data().img,
          us: us,
          data:date
        }

      }))

      })

    }, []);

      var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
          today = dd + '/' + mm + '/' + yyyy;
          const date=today

      function busket(event) {
  
    let idBook= books.find(book=>book.id===event.target.attributes.id.value);
    event.preventDefault();
    db.collection('basket').add({
      users: idBook.name,
      price:idBook.price,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      img: idBook.img,
      data:date
    })
  
  }
  const [order, setConta] = useState([]);
  const [contact, setContact] = useState('');
  var [nameB, setBok] = useState('');
  var [priceB, setPr] = useState('');
useEffect(() => {

db.collection('order').orderBy('datetime').onSnapshot(snapshot => {
 
  setConta(snapshot.docs.map(doc => {
    return {
      id: doc.id,
      contact: doc.data().contact,
      datatime: doc.data().datatime,
      nameB:doc.data().nameB,
      priceB:doc.data().priceB
    }

  }))

  })

}, []);

console.log(order);

      const classes = useStyles();
      
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
          setOpen(true);
        };

        const handleClose = () => {
          setOpen(false);
        };

  const orderBook=(event)=>{

    event.preventDefault();

    db.collection('order').add({
      contact: contact,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      nameB: nameB,
      priceB: priceB
   
    })
  
    alert('You have successfully ordered books. Our consultant will contact you!');
    setOpen(false);
    setContact('')

  }

      return(<div>

      <header className="userPage">
        
      <nav>

    <ul>
        <li>
          <img className="imgs" src="https://img.icons8.com/cotton/64/000000/book.png" alt=''/>
          </li>

        <li>
          <a href={"/"+user} className="title">Books Shop</a>
          </li>

        <li>
            <a href={"/"+user}>Books</a>
        </li>

          </ul>

        <div className="login">

        <div><img className="img"  src="https://img.icons8.com/fluency/48/000000/cat.png" alt=""/></div>

        <span id="text">{user}</span>

        <div> <a href='/'><img src="https://img.icons8.com/ios/50/000000/exit.png" alt=""/></a>  
        
        </div>
    
        </div>

        </nav>

        </header>

  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Basket
        </Button>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Basket
              </Typography>
              <Button autoFocus color="primary" onClick={handleClose}>
                save Order
              </Button>
            </Toolbar>
          </AppBar>
          <List>

          <table>

          <thead>

            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price $</th> 
              </tr>

              </thead>
              
      <tbody id="basket-list">
  
        {basket.map(book=>(
        
          <tr key={book.id}>
          <td>{book.name}</td>
          <td>1</td>
          <td className ="sum">{book.price}</td> 
          </tr>

        ))}
        
        </tbody>

          </table> 

          </List>
<form>
<input type="text" className='cont' value={contact} onChange={event => setContact(event.target.value)} placeholder="Enter Your Phone Numer or Email"  />
{basket.map(book => (

  <div key={book.id}>

<input type="text" className='cont' value={nameB=book.name} onChange={event => setBok(event.target.value)}  disabled />

<input type="text" className='cont' value={priceB=book.price} onChange={event => setPr(event.target.value)} disabled />

</div>))}     

<div className="buy"><button className="btnBuy" type="submit" onClick={orderBook}>Buy</button></div>
</form>
        </Dialog>

    <div className="list"> <h2>Order</h2> {
                    basket.map(book => (
                    <div className="lists" key={book.id}>
                    <div className="name">{book.name}</div>
                    <button className='del' onClick={() => deleteBooks(book.id)}>Delete</button>
                      </div>
                    ))}
                    
                    </div>
 
  <div className="cards">

  <div className="bCards"> {

     books.map(book => (

        <div className="list" key={book.id}>
        <div className="nameBook"> <h4 value={users} onChange={event => setUser(event.target.value)}>{book.name}</h4></div>
                      
            <div className="card">

        <div className="bookContainer"> <img className="bookImg" src={book.img} value={img} onChange={event => setImg(event.target.value)} alt=""/></div>
        <div className="nameBookDesc">{book.description}</div>

              </div>
        <div className="namePrice"> <h4 className="nameBook" value={price} onChange={event => setPrice(event.target.value)}>Price: {book.price}$</h4>  </div>
        
        <div className="buy"><button  id={book.id} className="btnBuy" onClick={busket}>Buy</button></div>
          
            </div>
                    ))}
                    
            </div>

        </div>


        </div>)

        }