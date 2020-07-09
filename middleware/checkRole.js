function checkRole(req,res,next) 
{
  if(req.session.role==='admin')
  {
    next();
  }
  else{
    res.redirect('/');
  }
  
}

module.exports={
  checkRole
}