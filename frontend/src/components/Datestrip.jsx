import { Datepicker, DatepickerEvent} from "@meinefinsternis/react-horizontal-date-picker";
import { useState } from "react";
function Datestrip(props) {
  const [date, setDate] = useState({
    startValue: Date.parse(props.startValue),
    endValue: new Date(props.endValue),
    rangeDates: [],
  });
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
