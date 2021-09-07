import './Footer.css'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Book from '../bookHome/Book'


export default function Footer() {


    return (<div>

<Router>

    <div>

      <Route exact path="/book" component={Book} />

    </div>

  </Router>

        <footer>
 
        <h2 className="welcom">Welcome to the bookstore! To order, please login or register!</h2>
       
        <a href="/book" className="book">See book</a>
        
        </footer>
        
        
        </div>)
    
}