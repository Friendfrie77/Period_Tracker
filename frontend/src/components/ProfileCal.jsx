import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";


function ProfileCal(props) {
    const localizer = momentLocalizer(moment)
    const views = 'month'
    const eventStyleGetter = (event, start, end, isSelected) => {
      const currentDate = new Date();
      const backgoundColor = event.end < currentDate ? 'gray' :'red';
      
      const style = {
        backgroundColor: backgoundColor,
        opacity: .95,
        color: 'white',
        display: 'block',
        cursor: 'arrow',
      };

      return {
        style,
  };
    }
  return (
    <div className="profile-cal">
      <Calendar
        localizer={localizer}
        events={props.event}
        startAccessor= {props.start}
        endAccessor= {props.end}
        views = {views}
        selectable = {false}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}

export default ProfileCal
