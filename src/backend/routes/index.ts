import { Router } from 'express';
const router = Router();
const appHandler = require('../handlers/appHandler');

//Basic ping/pong endpoint to test server functionality
router.get('/ping', appHandler.pingHandler);

/**************** USER API INTERFACE BEGIN ****************/

router.route('/api/users/new', (req, res) => {
  res.send('HLEO');
});
/*.post(appHandler.addNewUser)*/ //Add new user
//Request Body: JSON object containing user data to be added, should match USER DB model

router.route('/api/users/user/:id');
/*.get()*/ //Get specified user
//Parameters: User ID
/*.put()*/ //Update specified user data
//Request Body: JSON object containing user data to be updated, should match USER DB model

//api interface associated with specific user's projects
router.route('/api/users/projects/:id');
/*.get()*/ //Get all projects associated with user
//Parameters: User ID
/*.post()*/ //Submit new project
//Parameters: User ID
//Request Body: JSON object containing project data, should match PROJECT DB model

/***************** USER API INTERFACE END *****************/

/**************** PROJECT API INTERFACE BEGIN ****************/

router.route('/api/projects/interests');
/*.get()*/ //Get all projects that match interests: GET /api/projects/interests
//Request Body: JSON object containing array of interests { interests: [] }

router.route('/api/projects/new');
/*.get()*/ //Get all new projects

router.route('/api/projects/trending');
/*.get()*/ //Get all trending projects

//api interface associated with a specified project
router.route('/api/projects/project/:id');
/*.get()*/ //Get project (viewing on single page)
//Parameters: Project ID
/*.put()*/ //Update project
//Parameters: Project ID
//Request Body: JSON object containing project data to be updated, should match PROJECT DB model

/***************** PROJECT API INTERFACE END *****************/

export { router };
