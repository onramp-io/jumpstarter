const addInvestment = '/investments';
const getUser = '/users/get';
const getUserApi = '/api/users/get';
const profileRedirect = '/app/profile';
const comments = '/api/comments/';
const projectView = '/api/projects/views/';
const projects = '/api/projects/';
const edit = '/app/edit/';
const trending = '/api/projects/sort/TRENDING';
const newest = '/api/projects/sort/NEWEST';
const likes = '/likes/';
const checkout = '/app/checkout/';
const loginRedirect = '/login';
const projectRedirect = '/app/project/';
const recommend = '/users/recommend';
const upload = '/api/upload';
const categories = '/api/categories';
const deleteUser = '/users/delete';
const userUpdate = '/api/users/update';
const userInvestments = '/investments/get';
const payout = '/users/payout';
const getAllUserProjects = '/users/projects/getAll';
const SSRURL = 'http://localhost:3000';

const urlCheck = async (router, user) => {
  if (!router && !user) {
    return false;
  } else {
    return true;
  }
};

export default {
  addInvestment,
  getUser,
  profileRedirect,
  comments,
  projectView,
  projects,
  getUserApi,
  edit,
  urlCheck,
  trending,
  likes,
  checkout,
  loginRedirect,
  projectRedirect,
  newest,
  upload,
  recommend,
  categories,
  deleteUser,
  userUpdate,
  userInvestments,
  payout,
  getAllUserProjects,
  SSRURL,
};
