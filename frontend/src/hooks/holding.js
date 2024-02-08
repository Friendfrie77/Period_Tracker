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