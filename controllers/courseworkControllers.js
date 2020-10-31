const courseworkDAO = require('../models/courseworkModel'); 

const db = new courseworkDAO(); 

exports.add_cw = function(req, res) {
    db.add();
    db.getAllEntries().then((list) => {
        res.render('entries',{
            'title': 'Coursework List',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
      
}
exports.landing_page = function(req, res) {
    db.init();
    db.getAllEntries().then((list) => {
        res.render('entries',{
            'title': 'Coursework List',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}

exports.update_entry = function(req, res) {
    db.update();
    db.getAllEntries().then((list) => {
        res.render('entries',{
            'title': 'Coursework List',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
} 

exports.remove_entry = function(req, res) {
    db.remove();
    db.getAllEntries().then((list) => {
        res.render('entries',{
            'title': 'Coursework List',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
} 

exports.cw_entries = function(req, res) {
    db.getCW1Entries().then((list) => {
        res.render('entries',{
            'title': 'Coursework 1',
            'entries': list
        });
})
}
 
