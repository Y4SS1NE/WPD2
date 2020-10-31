const nedb = require('nedb');

class Coursework{
    constructor() {
        this.db = new nedb({ filename: 'courseworks.db', autoload: true });
        console.log('DB connected to courseworks.db');
        
    } 
    init() {
        this.db.insert({
        'Coursework Name': 'CW1',
        'Module Name': 'Big Data',
        'Coursework Level': '4',
        'Priority': 'High',
        'Due Date':'20/10/2020',
        'Task 1':'Develop basic operations',
        'Task 2':'Develop advanced operation',
        'Task 3':'Write the report',
        'Status':'In-Progress'
        });
        console.log('db entry CW1 inserted');
        this.db.insert({
        'Coursework Name': 'CW2',
        'Module Name': 'Web Platform Development',
        'Coursework Level': '3',
        'Priority': 'High',
        'Due Date':'31/10/2020',
        'Task 1':'Client Server communication',
        'Task 2':'Trello update',
        'Task 3':'Push changes to github',
        'Status':'In-Progress'
        }); 
    console.log('db entry CW2 Presentation inserted');
    }
    update(){
        return new Promise((resolve, reject) => {
        this.db.update({ 'Coursework Name': 'CW3' }, { $set: { 'Status': 'Completed' } }, { multi: true }, function (err, entries) {
        if (err) {
        reject(err);
        } else {
        resolve(entries);
        console.log('update() returns: ', entries);
            }
        })
        })
    }
    remove(){
        return new Promise((resolve, reject) => {
        this.db.remove({}, { multi: true }, function (err, entries) {
        if (err) {
        reject(err);
        } else {
        resolve(entries);
        console.log('remove() returns: ', entries);
            }
        })
        })
    }
    getAllEntries() {
        return new Promise((resolve, reject) => {
        this.db.find({}, function(err, entries) {
        if (err) {
        reject(err);
        } else {
        resolve(entries);
        console.log('getAllEntries() returns: ', entries);
            }
        })
        })
    } 
    getCW1Entries() {
        return new Promise((resolve, reject) => {
        this.db.find({ 'Coursework Name': 'CW1' }, function(err, entries) {
        if (err) {
        reject(err);
        } else {
        resolve(entries);
        console.log('getCW1Entries() returns: ', entries);
        }
        })
        })
    } 
    add() {
        this.db.insert({
        'Coursework Name': 'CW3',
        'Module Name': 'AADP',
        'Coursework Level': '3',
        'Priority': 'Medium',
        'Due Date':'15/11/2020',
        'Task 1':'Develop basic operations',
        'Task 2':'Develop advanced operation',
        'Task 3':'Write the report',
        'Status':'In-Progress'
        });
        console.log('db entry CW3 inserted');
        this.db.insert({
        'Coursework Name': 'CW4',
        'Module Name': 'Systems Programming',
        'Coursework Level': '3',
        'Priority': 'High',
        'Due Date':'23/10/2020',
        'Task 1':'Learn Bash Scripting',
        'Task 2':'Develop a trashcan ',
        'Task 3':'Test',
        'Status':'In-Progress'
        }); 
    console.log('db entry CW4 Presentation inserted');
    }
    
}

module.exports = Coursework; 