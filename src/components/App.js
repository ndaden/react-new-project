//MAIN APP LAYOUT
import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';


import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../styles/styles.css';

class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route exact path="/about" component={AboutPage}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }


}

const NotFound = ()=>(<h1>Oops the page does not exist.</h1>);

export default App;