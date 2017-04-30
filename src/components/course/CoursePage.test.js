import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {CoursePage} from './CoursePage';

describe('CoursePage', ()=>{
   it('sets an error message when trying to save course with blank title', ()=>{
       const props = {
           newCourse : {title: '', authorId: ''},
           courses: [],
           authors: [],
           actions: {
               loadCourses: () => {
               },
               loadAuthors: () => {
               },
               saveCourse: () => {
                   return Promise.resolve();
               }
           }
       };

       const wrapper = mount(<CoursePage {...props} />)
       wrapper.find('input[type="submit"]').last().simulate('click');
       expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
   });
});