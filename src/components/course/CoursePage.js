import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/CourseActions';
import * as authorActions from '../../actions/AuthorActions';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {formatAuthorsForDropdown} from '../../selectors/selectors';

import CourseForm from './CourseForm';

export class CoursePage extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            course : Object.assign({},this.props.newCourse),
            errors : {},
            saving : false
        };

        this.OnClickSave = this.OnClickSave.bind(this);
        this.OnCourseChanged = this.OnCourseChanged.bind(this);
    }

    componentDidMount(){
        this.props.actions.loadCourses();
        this.props.actions.loadAuthors();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.newCourse.id != nextProps.newCourse.id){
            this.setState({
                course : Object.assign({}, nextProps.newCourse)
            });
        }
    }

    OnCourseChanged(event){
        const course = this.state.course;
        const name = event.target.name;
        course[name] = event.target.value;
        this.setState({ course : course});
    }

    isFormValid(){
        let isValid = true;
        let errors = {};
        if(this.state.course.title.length < 5){
            errors.title = "Title must be at least 5 characters.";
            isValid = false;
        }

        this.setState({errors : errors});

        return isValid;
    }

    OnClickSave(event){

        if(!this.isFormValid()){
            return;
        }

        this.setState({saving: true});

        //this.props.dispatch(courseActions.createCourse(this.state.course));
        //this.props.createCourse(this.state.course);

        this.props.actions.saveCourse(this.state.course)
            .then(()=> {
                this.setState({saving: false});
                this.redirect('/course');
                this.props.actions.loadCourses();
            })
            .catch(error => {
                alert('Error : ' + error);
                this.setState({saving: false});
            });


    }

    redirect(path){
        this.context.router.history.push(path);
    }

    render(){
        return (

            <div className="form-group">
                <h1>Courses</h1>
                {this.props.courses.map((course, index) => {
                    return (
                        <div key={course.id}>
                            <Link to={'/course/' + course.id}>{course.title}</Link>
                        </div>);
                    })}


                <p><strong>Course Title : </strong></p>
                <input
                    className="form-control"
                    type="text"
                    name = "title"
                    value={this.state.course.title}
                    onChange={this.OnCourseChanged}
                    />
                { this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}

                <br/><br/>

                <p><strong>Course Author :</strong></p>
                <select
                    className="form-control"
                    name = "authorId"
                    value={this.state.course.authorId}
                    onChange={this.OnCourseChanged}>

                    <option value="">Select a value</option>
                    {
                        this.props.authors.map((author)=>{

                            return (<option key={author.value} value={author.value}>{author.text}</option>);

                        })
                    }
                </select>

                <br/>
                <br/>

                <input
                    className="btn btn-primary"
                    disabled={this.state.saving && 'disabled'}
                    type="submit"
                    value={this.state.saving ? 'Saving ...' : 'Save'}
                    onClick={this.OnClickSave}
                    />

            </div>
        );
    }
}


CoursePage.propTypes = {
    newCourse : PropTypes.object.isRequired,
    courses : PropTypes.array.isRequired,
    authors : PropTypes.array.isRequired,
    actions : PropTypes.object.isRequired,
};

CoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const results = courses.filter(course => course.id == id);
    if(results.length) return results[0];
    return null;
}

function mapStateToProps(storeState, ownProps){
    let course = {title: "", authorId: ""};
    const courseId = ownProps.match.params.id;

    if(courseId && storeState.courses.length > 0){
        course = getCourseById(storeState.courses, courseId);
    }

    const formattedAuthorsList = formatAuthorsForDropdown(storeState.authors);


    return {
        newCourse : course,
        courses : storeState.courses,
        authors : formattedAuthorsList
    };
}

function mapDispatchToProps(dispatch){
    let actions = Object.assign({}, courseActions, authorActions);
    return {
        actions : bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps ,mapDispatchToProps)(CoursePage);