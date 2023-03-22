import { Calendar } from '@fullcalendar/core'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { DateRange } from 'react-date-range';

const Test = () => {    
    const calendar = (
      <div>
        <DateRange
        editableDateInputs = {false}
        showMonthAndYearPickers = {false}
        />
      </div>
    )
    return calendar
}

export default Test
