// setUserInfo(user)
  // const fetchUserInfo = async () =>{
  //   const result = axios.post('http://localhost:8080/user/getuserinfo',{
  //     email
  //     },{
  //       headers: {'Authorization': `Bearer ${token}`},
  //     }
  //   )
  //   const user = await result
  //   if (user){
  //     dispatch(
  //       setUserInfo({
  //         periodStartDate: user.data.user.periodStartDate,
  //         avgLength: user.data.user.avgLength,
  //         cycle: user.data.user.cycle,
  //         periodEndDate: user.data.user.periodEndDate,
  //         previousPeriod: user.data.user.previousPeriod
  //       })
  //     )
  //   }
  // }

  // const avgPeriodLength = () =>{
  //   let totalDays = 0
  //   let totalCycle = 0
  //   let oldStartDate = null;
  //   let cycleCount = 0
  //   previousPeriod.forEach(date => {
  //     totalDays += Moment(date.endDate).diff(date.startDate, 'days')
  //     if (oldStartDate != null){
  //       const monthDif = Moment(oldStartDate).diff(date.startDate, 'month', true);
  //       if (Math.abs(monthDif) < 1.5){
  //         totalCycle += Math.abs(Moment(date.startDate).diff(oldStartDate, 'days'))
  //         cycleCount += 1
  //       }
  //     }else{
  //       oldStartDate = Moment(date.startDate);
  //     }
  //   })
  //   const avgLength =(Math.round(totalDays/periodLogged))
  //   const cycle = (Math.round(totalCycle/cycleCount))
  //   dispatch(
  //     setCycle({
  //       cycle: cycle,
  //       avgLength: avgLength
  //     })
  //   )
  // }
  // const estimateDate = () =>{
  //   let lastPeriod = null
  //   let startDate;
  //   let endDate;
  //   todaysDate = Moment(todaysDate).format()
  //   if(!periodStartDate && !periodEndDate){
  //     previousPeriod.forEach(date => {
  //       if (lastPeriod === null){
  //         lastPeriod = date.startDate
  //       }else if(lastPeriod < date.startDate){
  //         lastPeriod = date.startDate
  //       }
  //     })
  //     const monthDif = Moment(todaysDate).diff(lastPeriod, 'month')
  //     if(cycle && avgLength){
  //       if( monthDif > 1){
  //         const estimateLastPeriod = Moment(lastPeriod).add((monthDif), 'months')
  //         startDate = Moment(estimateLastPeriod).add(cycle, 'days');
  //         endDate = Moment(estimateLastPeriod).add(avgLength, 'days')
  //       }else{
  //         lastPeriod = Moment(lastPeriod).format()
  //         startDate = Moment(lastPeriod).add(cycle, 'days');
  //         endDate = Moment(startDate).add(avgLength, 'days')
  //       }
  //     }
  //     if(Moment(startDate).diff(todaysDate, 'day') == 0 && Moment(endDate).diff(todaysDate, 'day') >= 0 && startDate || periodStartDate  < todaysDate){
  //       setBleed (true)
  //     }
  //     return({startDate, endDate})
  //   }else if(Moment(periodStartDate).diff(todaysDate, 'day') == 0 && startDate || periodStartDate  < todaysDate){
  //     setBleed(true)
  //   }
  // }