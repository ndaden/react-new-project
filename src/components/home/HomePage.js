import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component{


    render(){

        return (
          <div className="jumbotron">
              <h1>Welcome to the HomePage</h1>
              <Link to="/about" className="btn btn-primary btn-lg">About</Link>
          </div>
        );


    }

}

export default HomePage;