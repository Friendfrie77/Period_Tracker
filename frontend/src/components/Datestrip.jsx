import { Datepicker, DatepickerEvent} from "@meinefinsternis/react-horizontal-date-picker";
import { useState, useEffect} from "react";
function Datestrip(props) {
  const [date, setDate] = useState({
    startValue: Date.parse(props.startValue),
    endValue: new Date(props.endValue),
    rangeDates: [],
  });
  useEffect(() =>{
    setDate({
      startValue: Date.parse(props.startValue),
      endValue: new Date(props.endValue)
    })
  }, [props.startValue, props.endValue])
  return (
    <div className="horizontal-date-picker">
      <Datepicker
        startValue={date.startValue}
        endValue = {date.endValue}
      />
    </div>
  )
}

export default Datestrip
