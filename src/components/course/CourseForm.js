import React from 'react';
import PropTypes from 'prop-types';

const CourseForm = ({course, onChange, saving, errors}) => {

return (
    <form>
        <h1>New Course</h1>
        <input type="text" name="title" value={course.title} onChange={onChange}/>
        <input type = "submit" value = {saving ? 'Saving...' : 'Save'} disabled={saving && 'disabled'} />
        <p>{errors}</p>
    </form>
);


};

CourseForm.propTypes = {
    course : PropTypes.object,
    saving : PropTypes.bool,
    errors : PropTypes.object,
    onChange : PropTypes.func
};

export default CourseForm;
