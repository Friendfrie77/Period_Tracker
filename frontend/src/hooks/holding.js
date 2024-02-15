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