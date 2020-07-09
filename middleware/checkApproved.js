const checkApproved=async (req,res,next)=>{
  if(!req.session.userID|| req.session.userID===null)
  {
    res.redirect('/login')
  }else
  {
    return next()
  }
}

module.exports=checkApproved