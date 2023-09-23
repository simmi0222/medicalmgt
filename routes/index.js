var express = require('express');
var router = express.Router();
const UserModel = require("../models/userModel")
const MedicalModel = require("../models/medicalModel")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

router.get('/sign-in', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

router.post('/sign-in',async function(req, res, next) {
  try {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
    if(user === null){
      return res.send(`<h1 style="text-align:center; margin-top:15vmax;color:salmon">User not found. <a href="/sign-in">Sign In</a></h1>`)
    }
    if(user.password !== password){
      return res.send(`<h1 style="text-align:center; margin-top:15vmax;color:salmon">Invalid Password. <a href="/sign-in">Sign In</a></h1>`)
    }
    res.redirect("/all-tablets")
  } catch (error) {
    res.send(error)
  }
});

router.get('/sign-up', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/sign-up',async function(req, res, next) {
  try {
    const newuser = new UserModel(req.body)
    await newuser.save()
    res.redirect("/sign-in")
  } catch (error) {
    res.send(error)
  }
});

router.get('/all-tablets',async function(req, res, next) {
  try {
    const tablets = await MedicalModel.find()
    res.render('alltablets', { title: 'All Tablets',tablets });
  } catch (error) {
    res.send(error)
  }
});



router.get('/add-tablets', function(req,res,next){
  res.render('addtablets', {title:"Add Tablets"})
})

router.post('/add-tablets',async function(req,res,next){
  try {
    const newtablet = new MedicalModel(req.body)
    await newtablet.save()
    res.redirect("/all-tablets")
  } catch (error) {
    res.send(error)
  }
})


router.get('/delete/:id',async function(req,res,next){
  try {
    await MedicalModel.findByIdAndDelete(req.params.id)
    res.redirect("/all-tablets")
  } catch (error) {
    res.send(error)
  }
})


router.get('/update/:id',async function(req,res,next){
  try {
    const updtTablets = await MedicalModel.findById(req.params.id)
    res.render("updatetablets", {title:"Update Tablets", updtTablets})
  } catch (error) {
    res.send(error)
  }
})



router.post('/update/:id',async function(req,res,next){
  try {
    await MedicalModel.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/all-tablets")
  } catch (error) {
    res.send(error)
  }
})

router.get('/sign-out', function(req,res,next){
  res.redirect("/sign-in")
})

module.exports = router;
