import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authorActions from '../../actions/AuthorActions';
import {bindActionCreators} from 'redux';

class AuthorPage extends React.Component{
    constructor(props, context){
        super(props, context);
    }

    componentDidMount()
    {
        this.props.actions.loadAuthors();
    }

    render(){
        return (
            <div>
                <h1>Authors</h1>
                {this.props.authors.map((author, index) => {
                    return (<div key={index}>{author.firstName + ' ' + author.lastName}</div>);
                })}
            </div>
        );
    }
}


AuthorPage.propTypes = {
    authors : PropTypes.array.isRequired,
    actions : PropTypes.object.isRequired
};

function mapStateToProps(storeState, ownProps){
    return {
        authors : storeState.authors
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps ,mapDispatchToProps)(AuthorPage);