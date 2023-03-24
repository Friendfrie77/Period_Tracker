import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

function ProfileCal(props) {
    const localizer = momentLocalizer(moment)
  return (
    <div className="profile-cal">
      <Calendar
        localizer={localizer}
        events={props.event}
        startAccessor= {props.start}
        endAccessor= {props.end}
        // toolbar= {false}
      />
    </div>
  )
}

export default ProfileCal
