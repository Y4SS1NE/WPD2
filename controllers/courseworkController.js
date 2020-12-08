const connectDB = require('../models/db');
const Coursework = require('../models/Coursework');
const ShortUrl = require('../models/shortUrl');

connectDB();

//landing page

exports.landing_page = async(req, res) => {
    try {
        const coursework = await Coursework.find({ user: req.user }).lean();
        console.log(coursework);
        res.render('dashboard', {
            user: req.user,
            coursework
        })
    } catch(err) {
        console.error(err);
        res.render('../views/error/500.ejs');
    }
    
}

exports.add_cw = function(req, res) {
    res.render("add");
};


exports.post_new_cw = async (req, res) => {
    console.log("Adding new coursework...");
    try {
        req.body.user = req.user.id;
        await Coursework.create(req.body);
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        res.render('../views/error/500.ejs');
    }

    if(!req.body.courseTitle) {
        res.status(400).send("Coursework Title required");
        return;
    }
    if(!req.body.milestones) {
        res.status(400).send("Milestone required");
        return;
    }
    if(!req.body.start) {
        res.status(400).send("Start date is mandatory");
        return;
    }
}

// Edit coursework
exports.edit_cw = async(req, res) => {
    const coursework = await Coursework.findOne({
        _id: req.params.id
    }).lean();
    if(!coursework) {
        return res.render('../views/error/400.ejs');
    } else {
        res.render('edit', {
            coursework,
        });
    }
}

// Update edited coursework
exports.update_cw = async(req, res) => {
    try {
        let coursework = await Coursework.findById(req.params.id);

        coursework = await Coursework.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
    });
        res.redirect('/dashboard');
    } catch(err) {
        return res.render('../views/error/500.ejs');
    }
    
}

exports.delete_cw = async(req, res) => {
    console.log('Deleting coursework');
    try {
        await Coursework.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        return res.render('../views/error/500.ejs');
    }

}

exports.view_incomplete = async (req, res) => {
    try {
      const coursework = await Coursework.find({ status: 'Not Completed' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
  
      res.render('view-incomplete', {
        coursework,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
}
exports.view_complete = async (req, res) => {
    try {
      const coursework = await Coursework.find({ status: 'Completed' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
  
      res.render('view-complete', {
        coursework,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
}


exports.view_cw = async(req,res) => {
    try {
        const coursework = await Coursework.find({ _id: req.params.id }).lean();
        res.render('coursework', {
            coursework
        })
    } catch (error) {
        console.error(err)
        res.render('error/500')        
    }
}
exports.get_shorturl = async(req, res) =>{
   try {
        const shortUrls = await ShortUrl.find()
        res.render('shorturl', { shortUrls: shortUrls })
   } catch (error) {
        console.error(err)
        res.render('error/500') 
   } 
}

exports.post_shorturl = async(req, res) =>{
    try {
        await ShortUrl.create({ full: req.body.fullUrl })
        res.redirect('shorturl')
    } catch (error) {
        console.error(err)
        res.render('error/500') 
    }
}

exports.url_redirect = async(req, res) =>{
    try {
        const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
        if (shortUrl == null) return res.sendStatus(404)
            shortUrl.clicks++
            shortUrl.save()
            res.redirect(shortUrl.full)
    } catch (error) {
        console.error(err)
        res.render('error/500') 
    }
}
