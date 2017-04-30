//MAIN APP LAYOUT
import React from 'react';
import {BrowserRouter, Route, Link, PropsRoute, Switch} from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursePage from './course/CoursePage';
import AuthorPage from './author/AuthorPage';
import LoadingDots from './common/LoadingDots';


class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <div>Welcome to my page <br/>
                        {this.props.loading ? <LoadingDots dots={3} interval={100} /> : '' }
                    </div>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Route exact path="/course" component={CoursePage} />
                        <Route exact path="/course/:id" component={CoursePage} />
                        <Route exact path="/author" component={AuthorPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }


}

const NotFound = ()=>(<h1>Oops the page does not exist.</h1>);

App.propTypes = {
    loading : PropTypes.bool.isRequired
};

function mapStateToProps(storeState, ownProps){
    return {
        loading: storeState.ajaxStatus > 0
    };
}

export default connect(mapStateToProps)(App);