  const removePeriod = async () =>{
    if (!removeDate){
      setMessage('Please select a date')
    }else{
      const res =  await axios.post(`${process.env.REACT_APP_APIURL}/user/removePeriod`,{
        email, removeDate},{
          headers: {'Authorization': `Bearer ${token}`},
        })
        if (res.status === 201){
          dispatch(
            setPeriod({
              previousPeriod: res.data.previousPeriod
            })
          )
          setMessage(res.data.message)
        }
      }
    }

    const addPeriod = async () =>{
        console.log('test')
        const sendDates = await axios.post(`${process.env.REACT_APP_APIURL}/user/newuser`,{
          email, loggedPeriods},{
            headers: {'Authorization': `Bearer ${token}`},
          }
        )
        const res = await sendDates
        setPMessage(`${res.data.message}!`)
      };


      const userData = (date) =>{
        if (date[0].endDate){
          const start = date[0].startDate.getDate()
          const end = date[0].endDate.getDate()
          if (start != end){
            const startDate = Moment(date[0].startDate).format()
            const endDate = Moment(date[0].endDate).format()
            if (userInfo.length != 0){
              const dates = userInfo.map(function(element){return element;})
              let period = {
                startDate: startDate,
                endDate: endDate,
                count: userInfo.length,
              }
              dates.push(period)
              setDates(dates)
            }else{
              let period = {
                startDate: startDate,
                endDate: endDate,
                count: 0,
              }
              let dates = [period]
              setDates(dates)
            }
          }
        }
      }


       {/* <Field name='email'>
                        {({input, meta}) => (
                        <div className='email-input'>
                            <input {...input} type= 'email' required/>
                            <label htmlFor='email' className={`login-lable ${meta.error && meta.touched && !meta.active  ? `span-error` : ''}`}>
                                <span className='login-span'>Email<small>*</small></span>
                            </label>
                            {meta.error && meta.touched && <span className='error'>{meta.error} test</span>}
                        </div>
                        )}
                    </Field> */}
                    {/* <Field name='username'>
                        {({input, meta})=> (
                        <div className='username-input'>
                            <input {...input} type='text' required />
                            <label htmlFor='username' className={`login-lable ${meta.error && meta.touched && !meta.active  ? `span-error` : ''}`}>
                                <span className='login-span'>Username<small>*</small></span>
                            </label>
                            {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                        )}
                    </Field> */}
                    {/* <Field type='password' name='password'>
                        {({input, meta}) => (
                        <div className='password-input'>
                            <input {...input} type='password' required />
                            <label htmlFor='password' className={`login-lable ${meta.error && meta.touched && !meta.active  ? `span-error` : ''}`}>
                                <span className='login-span'>Password<small>*</small></span>
                            </label>
                            {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                    <Field type='password' name='passwordconfirm'>
                        {({input, meta}) => (
                        <div className='password-input'>
                            <input {...input} type='password' required />
                            <label htmlFor='passwordconfirm' className={`login-lable ${meta.error && meta.touched && !meta.active  ? `span-error` : ''}`}>
                                <span className='login-span'>Confirm Password<small>*</small></span>
                            </label>
                            {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                        )}
                    </Field> */}
                    
      //backend
//       userSchema.methods.calcAvgLength = function(user){
//     let totalDays = 0;
//     let totalCycle = 0;
//     let oldStartDate = null;
//     let cycleCount = 0;
//     if (user.previousPeriod.length <= 1){
//         return (false)
//     }
//     user.previousPeriod.forEach(date => {
//         totalDays += moment(date.endDate).diff(date.startDate, 'days')
//         if(oldStartDate != null){
//             const monthDif = moment(oldStartDate).diff(date.startDate, 'month', true);
//             if (Math.abs(monthDif) < 1.5){
//                 totalCycle += Math.abs(moment(date.startDate).diff(oldStartDate, 'days'))
//                 cycleCount += 1
//             }
//         }else{
//             oldStartDate = moment(date.startDate);
//         }
//     });
//     const avgLength = (Math.round(totalDays/user.previousPeriod.length));
//     const cycle = (Math.round(totalCycle/cycleCount));
//     user.cycle = cycle;
//     user.avgLength = avgLength;
//     return{avgLength, cycle}
// }

// userSchema.methods.estimateDate = function(user){
//     let lastPeriod = null;
//     let startDate;
//     let endDate;
//     let todaysDate = new Date();
//     if(!user.periodStartDate || !user.periodEndDate){
//         user.previousPeriod.forEach(date =>{
//             if (lastPeriod === null){
//                 lastPeriod = date.startDate
//             }else if(lastPeriod < date.startDate){
//                 lastPeriod = date.startDate
//             }
//         })
//         const monthDif = moment(todaysDate).diff(lastPeriod, 'month')
//         if (monthDif > 1){
//             const estimateLastPeriod = moment(lastPeriod).add((monthDif), 'months');
//             startDate = moment(estimateLastPeriod).add(user.cycle, 'days');
//             endDate = moment(startDate).add(user.avgLength, 'days');
//         }else{
//             lastPeriod = moment(lastPeriod).format();
//             startDate = moment(lastPeriod).add(user.cycle, 'days');
//             endDate = moment(startDate).add(user.avgLength, 'days');
//         }
//         user.periodStartDate = startDate
//         user.periodEndDate = endDate
//     }else{
//         return(false)
//     }
// }




        //   <h1>When was your last few periods?</h1>
        //   <p>Just select them below, and once your done hit next. Please try to make them as close as you can.</p>
        //   <DateRange
        //     editableDateInputs={true}
        //     showMonthAndYearPickers={false}
        //     fixedHeight = {true}
        //     onChange={item => setDate([item.selection])}
        //     moveRangeOnFirstSelection={false}
        //     ranges={date}
        //     // scroll = {{enabled: true}}
        //   />
        //   {isAuth ? (
        //     <button type='submit' className='nextButton' onClick={accountInfoButton}>Next</button>
        //   ):(
        //     <button type='submit' className='nextButton' onClick={demoAccount}>Next</button>
        //   )}


          // const accountInfo = async () =>{
  //   // setLoading(true)
  //   try{
  //     const dates = await axios.post(`${process.env.REACT_APP_APIURL}/user/newuser`,{
  //         email,
  //         userInfo
  //         },{
  //           headers: {'Authorization': `Bearer ${token}`},
  //         }
  //         );
  //         if (dates){
  //           navigate('/Home')
  //         }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  // const demoAccount = async () =>{
  //   // setLoading(true)
  //   const test = await axios.post(`${process.env.REACT_APP_APIURL}/demo`,{
  //     username
  //   })
  // }