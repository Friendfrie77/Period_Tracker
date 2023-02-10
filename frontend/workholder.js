// const User = require('../mongoose-schmea/User');
// const jwt = require('jsonwebtoken');

// const handleLogin = async (req, res) =>{
//     const cookies = req.cookies
    
//     const {email, password} = req.body
//     const loginUser = await User.findOne({email: email}, function(err, user){
//         if (!user){
//             return res.status(401)
//         } else {
//             user.authPassword(password, function(err, same){
//                 if (!same){
//                     return res.status(401)
//                 }else{
//                     const accessToken = jwt.sign(
//                         {
//                             "UserInfo":{
//                                 'userID': user._id,
//                                 'username': user.username
//                             }
//                         },
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {expiresIn: '15m'}
//                     );
//                     const newRefreshToken = jwt.sign(
//                         {
//                             "UserInfo":{
//                                 'userID': user._id,
//                                 'username': user.username
//                             }
//                         },
//                         process.env.REFRESH_TOKEN_SECRET,
//                         {expiresIn: '1h'}
//                     );
                    
//                 console.log(accessToken)
                
//                 let newRefreshTokenArray =
//                     !cookies?.jwt
//                         ? user.refreshToken
//                         : user.refreshToken.filter(rt => rt !== cookies.jwt);
//                 if (cookie?.jwt){
//                     const refreshToken = cookies.jwt;
//                     const foundToken =  User.findOne({refreshToken});
//                     if (!foundToken){
//                         newRefreshTokenArray = [];
//                     }
//                     res.clearCookie('jwt', {httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
//                     res.json({ accessToken });
//                 }
//             })
//         }
//     })
// }

// module.exports = { handleLogin };


  // useEffect(()=>{
  //     avgPeriodLength()
  // },[])
  // useEffect(()=>{
  //   estimateDate()
  // },[])
  // useEffect(()=>{
  //   daysTill()
  // },[isBleeding])
  // console.log(previousPeriod)
  // console.log(periodStartDate, periodEndDate)


    // const periodStarted = async () =>{
  //   let startDate;
  //   let endDate;
  //   if (!isBleeding){
  //     startDate = Moment(todaysDate).format()
  //     endDate = Moment(startDate).add(avgLength,'days')
  //     setCurrent(true)
  //   }else{
  //     startDate = periodStartDate
  //     endDate = Moment(todaysDate).format()
  //   }
  //   dispatch(
  //     setNewPeriod({
  //       periodStartDate: Moment(startDate).format(),
  //       periodEndDate: Moment(endDate).format()
  //     })
  //   )
  //   await axios.post('http://localhost:8080/user/addperiod', {
  //     email, periodStartDate, periodEndDate, current
  //   },{
  //     headers: {'Authorization': `Bearer ${token}`},
  //   })
  // }


  <section className="home">
  <h1>Welcome back, {userName}</h1>
  <div className="placeholder"></div>
  <div className="period-countdown">
    <h2>Your next period is in</h2>
    <div className='inner-circle'>
      <span>{daysTillPeriod} days</span>
    </div>
  </div>
  <div className="check-period">
    <label htmlFor = 'check-period'>Has your period started?</label>
    <button name='check-period' type='button' onClick={periodStarted}>Yes</button>)
  </div>
</section>