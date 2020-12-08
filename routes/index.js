const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const controller = require('../controllers/courseworkController');


router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
router.get('/dashboard', ensureAuthenticated,controller.landing_page);
router.get('/add',ensureAuthenticated,controller.add_cw);
router.post("/add", ensureAuthenticated, controller.post_new_cw);
router.get("/view-incomplete", ensureAuthenticated, controller.view_incomplete);
router.get("/view-complete", ensureAuthenticated, controller.view_complete);
router.post('/edit/:id', ensureAuthenticated, controller.update_cw);
router.get('/edit/:id', ensureAuthenticated, controller.edit_cw);
router.get('/delete/coursework/:id', ensureAuthenticated, controller.delete_cw);
router.get('/coursework/:id', ensureAuthenticated, controller.view_cw);
router.get('/shorturl', ensureAuthenticated, controller.get_shorturl);
router.post('/shortUrls', ensureAuthenticated, controller.post_shorturl);
router.get('/:shortUrl', ensureAuthenticated, controller.url_redirect);

module.exports = router;
