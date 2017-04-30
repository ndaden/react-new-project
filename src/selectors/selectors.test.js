import expect from 'expect';
import {formatAuthorsForDropdown} from './selectors';

describe('Authors Selectors', ()=>{
    describe('formatAuthorsForDropdown', ()=> {
        it('formats the authors list for dropdown', () => {
            const authors = [
                {id: 'cory-hourse', firstName: 'Cory', lastName: 'House'},
                {id: 'daniel-coper', firstName: 'Daniel', lastName: 'Coper'}
            ];

            const expectedAuthors = [
                {value: 'cory-hourse', text: 'Cory House'},
                {value: 'daniel-coper', text: 'Daniel Coper'}
            ];

            expect(formatAuthorsForDropdown(authors)).toEqual(expectedAuthors);
        });
    });
});