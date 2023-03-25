import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import { useMemo } from 'react';

function ProfileCal(props) {
    const localizer = momentLocalizer(moment)
    const views = 'month'
    console.log(props.event)
  return (
    <div className="profile-cal">
      <Calendar
        localizer={localizer}
        events={props.event}
        startAccessor= {props.start}
        endAccessor= {props.end}
        views = {views}
        // selectable = {false}
      />
    </div>
  )
}

export default ProfileCal
