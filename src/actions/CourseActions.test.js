import expect from 'expect';
import * as types from './actionTypes';
import {loadCourses} from './CourseActions';
import thunk from 'redux-thunk';
import nock from 'nock';
import ConfigureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = ConfigureMockStore(middleware);

describe('Async Actions', ()=>{
    afterEach(()=>{
        nock.cleanAll();
    });

    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done)=>{
        //call api with nock
        //nock('http://www.example.com/api/')
        //    .get('/courses')
        //    .reply(200, { body : {course : [{id: '1', title: 'course title', author: 'nabil daden'}]}});


        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_COURSES_SUCCESS, body : { courses : [{id:'clean-code',title:'Clean Code'}]}}
        ];


        const store = mockStore({courses : []}, expectedActions);
        store.dispatch(loadCourses()).then(()=>{
            const actions = store.getActions();

            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
            done();
        });



    });
});