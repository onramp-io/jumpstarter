const addInvestment = '/investments';
const getUser = '/users/get';
const getUserApi = '/api/users/get';
const profileRedirect = '/app/profile';
const comments = '/api/comments/';
const projectView = '/api/projects/views/';
const projects = '/api/projects/';
const edit = '/app/edit/';
const trending = '/api/projects/sort/TRENDING';

const urlCheck = async (router, user) => {
    if (!router && !user) {
        return false;
    } else {
        return true;
    }
}
    
export default { addInvestment, getUser, profileRedirect, 
    comments, projectView, projects, getUserApi, edit, urlCheck, trending }