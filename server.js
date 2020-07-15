if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}
var cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const session=require('express-session')
const db=require('./config/database');       
const User=require('./models/User')
const flash=require('express-flash')
const checkApproved=require('./middleware/checkApproved')
const {checkRole} =require('./middleware/checkRole')
const admindb=require('./middleware/adminDb')
const { response } = require('express')
const { signedCookie } = require('cookie-parser')
//const {storeData}=require('./middleware/storeData')

let currentUser=null;
const SESSION_NAME="sid"
const age=1000*60*60*2
const inputData=[]
const dbData=[]

// app.use(express.json())
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(flash())
app.use(session({
  name:SESSION_NAME,
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:age,
    sameSite:true
  }
}))
app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))


app.get('/',checkApproved,(req,res)=>{
  res.render('index.ejs', {name:currentUser});
})
app.get('/login',(req,res)=>{
  res.render('login.ejs');
})

app.post('/login',storeData,(req,res)=>{
 setTimeout(()=>{
  checkUserData(res,req)
 },1000)

 const user={
  name:req.body.name,
 password:req.body.password
}

const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
res.cookie('AccessToken', accessToken, { maxAge: 8000});
res.cookie('RefreshToken', refreshToken);
console.log("Token generated")
})




app.post('/logout',(req,res)=>{
  currentUser=null;
  req.session.role=null;
  const token=req.cookies['AccessToken']
  const refreshToken=req.cookies['RefreshToken']
  res.cookie('AccessToken', token, { maxAge: 0});
  res.cookie('RefreshToken', refreshToken, { maxAge: 0});
  console.log("Tokens destroyed")
  res.redirect('/login');
  
})
app.get('/register',(req,res)=>{
  res.render('register.ejs');
})
app.post("/register", async(req,res)=>{
try{
  const hashedPassword=await bcrypt.hash(req.body.password,10)
  let {name,email,password}=req.body;
  User.create({     
    id:Date.now().toString(),
    name,
    email,
    password:hashedPassword,
    role:"basic"
  })
  .catch(err=>console.log(err))
  res.redirect('/login') 
}
catch
{
  res.redirect('/register')
}

})


app.get('/admin',checkApproved,checkRole,storeAdminData,async(req,res)=>{

  setTimeout(()=>{
    res.render('admin.ejs',{posts:adminDb})
   },1000)
})


app.post('/roleChange',(req,res)=>{
  let {inputId,inputRole}= req.body
let reqUser=null
User.findOne({ where: { id: inputId } })
  .then(function (person) {
    if (person) {
      person.update({
        role: inputRole
      })
      
     }
  })
  setTimeout(reloadAdminDB,'1000')
  req.flash('error','Successful Role Change')
  res.redirect('/admin')
})


app.post('/deleteEmployee',(req,res)=>{
  let {inputId,inputRole}= req.body
let reqUser=null
User.findOne({ where: { id: inputId } })
  .then(function (person) {
    if (person) {
      person.destroy()
      setTimeout(reloadAdminDB,'1000')
      req.flash('error','Employee Removed')
      res.redirect('/admin')
    }else{
      req.flash('error','No such Employee')
      res.redirect('/admin')
    }
  })
})


const checkUserData=async(res,req)=>{
  console.log(dbData)
  console.log(inputData)
  if(dbData.length===0)
  {
    inputData.pop();
    console.log("no user")
    req.flash('error','No such user')
    res.redirect('/login')
  }
  try{
    if(await bcrypt.compare(inputData[0].password,dbData[0].password)){
      inputData.pop();
      console.log("correct password")
      req.session.userID=dbData[0].id;
      req.session.role=dbData[0].role;
      dbData.pop();
      res.redirect('/')
    }else{
      dbData.pop();
      inputData.pop();
      console.log("wrong password")
      req.flash('error','wrong password')
      res.redirect('/login')
    }
  }catch(e){
    return (e)
  }
}




db.authenticate().then(()=>{console.log('database connected...')}).catch(err=>console.log(err))




function storeData(req,res,next) 
{
  const data={
    email:req.body.email,
    password:req.body.password
  }
  inputData.push(data)
  User.findAll({
      where: {
          email: req.body.email 
      },
      attributes: ['id', 'name','email','password','role'], 
  })
  .then((persons)=>{
    try{
      dbData.push(persons[0].dataValues)
      currentUser=dbData[0].name;
      console.log("passed")
    }catch(err)
    {
      console.log("no such user found")
    }
  })
     //jwt goes here

  return next()
}

const adminDb=[]
function storeAdminData(req,res,next) 
{
  adminDb.length=0;
  User.findAll({
    order: [ [ 'createdAt', 'DESC' ]]
  }).then(function(entries){
   for(let i=0;i<entries.length;i++)
   {
     adminDb.push(entries[i].dataValues)
   }
   console.log(adminDb)
  });
  return next()
}


function reloadAdminDB()
{
  adminDb.length=0;
  User.findAll({
    order: [ [ 'createdAt', 'DESC' ]]
  }).then(function(entries){
   for(let i=0;i<entries.length;i++)
   {
     adminDb.push(entries[i].dataValues)
   }
  });
}






const PORT=process.env.PORT || 3000
app.listen(3000,()=>{
  console.log(`server up and running on port ${PORT}`)
})