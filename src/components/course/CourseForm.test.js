import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving) {
    const props = {
        course : {}, saving : saving, errors: undefined,
        onChange: () => {}
    };

    return shallow(<CourseForm {...props} />);
}

describe('Display CourseForm', () => {
    it('Renders form and h1', ()=>{
        const wrapper = setup(false);

        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('New Course');
    });

    it('Save button is labeled "Save" when not saving', ()=>{
        const wrapper = setup(false);
        expect(wrapper.find('input[type="submit"]').props().value).toBe('Save');
    });

    it('Save button is disabled and labeled "Saving..." when saving', ()=>{
        const wrapper = setup(true);
        expect(wrapper.find('input[type="submit"]').props().value).toBe('Saving...');
        expect(wrapper.find('input[type="submit"]').props().disabled).toBe('disabled');
    });
});
