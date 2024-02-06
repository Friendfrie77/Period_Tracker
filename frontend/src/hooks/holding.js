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