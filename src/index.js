import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';
//import {loadCourses} from './actions/CourseActions';
//import  {loadAuthors} from './actions/AuthorActions';

const store = configureStore();

//store.dispatch(loadCourses());
//store.dispatch(loadAuthors());

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);