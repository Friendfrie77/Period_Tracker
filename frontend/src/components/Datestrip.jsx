import { Datepicker, DatepickerEvent} from "@meinefinsternis/react-horizontal-date-picker";
function Datestrip(props) {
  let endDate = new Date()
  const className = 'horizontal-date'
  return (
    <div className="horizontal-date-picker">
      <Datepicker
        startValue={new Date(props.startValue)}
        endValue = {new Date(props.endValue)}
        startDate = {Date.now()}
        endDate = {endDate.setDate(endDate.getDate() + 7)}
        className = {className}
      />
    </div>
  )
}

export default Datestrip
