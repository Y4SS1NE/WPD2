const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseworkControllers'); 
module.exports = router;

router.get('/', controller.landing_page);

router.get('/add', controller.add_cw);

router.get('/update', controller.update_entry);

router.get('/remove', controller.remove_entry);

router.get('/cw', controller.cw_entries); 

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
 
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}) 
router.use( function(req, res) {
    res.status(404);
    res.type('text/plain');

res.send('Oops! We didn\'t find what you are looking for.');
});

