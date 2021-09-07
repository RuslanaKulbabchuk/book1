import './Header.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminPage from '../admPage/AdminPage';
import db from '../admPage/firebase-config';
import firebase from 'firebase';
import UserPage from '../userPage/UserPage';


  export default function Header(){
  
    const [show, signin] = React.useState(false);
    const [showS, signup] = React.useState(false);
    const [emails, setEm] = useState([]);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');


    useEffect(() => {
      
      db.collection('emails').orderBy('datetime', 'desc','pass', 'confPass').onSnapshot(snapshot => {
        setEm(snapshot.docs.map(doc => {
       
          return {
            id: doc.id,
            name: doc.data().email,
            datatime: doc.data().datatime,
            pass:doc.data().pass,
            passConf:doc.data().passConf
          }
        }))
      })
    
    }, []);
    
      const addEmails = (event) => {
        event.preventDefault();
        db.collection('emails').add({
          email: email,
          pass:pass,
          passConf:passConf,
          datetime: firebase.firestore.FieldValue.serverTimestamp(),
          
        })
   
        setEmail('');
        setPass('');
        setPassConf('');
   alert('Register is successfully! Now Login!')
      }
  
function admin(event) {
  
  let inputEmail = document.querySelector('#login-email');
  let inputPass = document.querySelector('#login-password');
  let em = emails.find(emailS => (emailS.name===inputEmail.value&&emailS.pass===inputPass.value))
  


      if (inputEmail.value ==="admin@gmail.com"&& inputPass.value === "qwerty") {
      
      window.location.href='/admin' 
   
      }else if(em){
     
 window.location.href='/'+em.name;
       
        
      
      }else{
        alert("You have entered an incorrect login or password. Please enter your data again or register!")
    
      }
  
      event.preventDefault()
      return false
      }
  
    
     
    return(
        <div>

      <header className="homePage">
      <nav>

        <ul>

            <li><img className="imgs" src="https://img.icons8.com/cotton/64/000000/book.png" alt=''/></li>
           
          <li><a href="/" className="title">Books Shop</a></li>

            
        </ul>

  <div className="login">

            <div> <button id="signIn"
                onClick={() => signin(!show)}
              >
            {show ? 'Close' : 'Login'} 
              </button>    
            
            </div>
            <div> <button
                onClick={() => signup(!showS)}
              >
            {showS ? 'Close' : 'SignUp'} 
              </button>    
            
            </div>

      </div>

    </nav>

</header>

<Router>
    <div>
    {
        emails.map(em => (
        <div className="lis" key={em.id}>
        {em.name? <Route exact path={('/'+em.name)} component={UserPage} />: alert('You have entered an incorrect login or password. Please enter your data again or register!')} 
         </div>
          ))}

      <Route exact path="/admin" component={AdminPage} />
    </div>
  </Router>

<section className="forms-section">
   
  <div className="forms">
     {show && 
    <div className="form-wrapper is-active">
  
      <form className="form form-login" onSubmit={(event)=>admin(event)}>
        <fieldset>
          <legend>Please, enter your email and password for login.</legend>
          <div className="input-block">
            <label htmlFor="login-email">E-mail</label>
            <input id="login-email" type="email"  required />
          </div>
          <div className="input-block">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" required />
          </div>
        </fieldset>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
}
{showS &&
    <div className="form-wrapper is-active">
          <form className="form form-signup">
        <fieldset>
          <legend>Please, enter your email, password and password confirmation for sign up.</legend>
          <div className="input-block">
            <label htmlFor="signup-email">E-mail</label>
            <input id="signup-email" type="email" name='email' required  value={email}
            onChange={event => setEmail(event.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" name='pass' required  value={pass}
            onChange={event => setPass(event.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="signup-password-confirm">Confirm password</label>
            <input id="signup-password-confirm" type="password" name='passConf' value={passConf}
            onChange={event => setPassConf(event.target.value)} required />
          </div>
        </fieldset>
        <button type="submit" className="btn-signup" onClick={addEmails}>Continue</button>
      </form>
    </div>
}
  </div>
</section> 


    </div>
   
    
)


}