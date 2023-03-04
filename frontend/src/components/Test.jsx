import { Calendar } from '@fullcalendar/core'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

const Test = () => {    
    const calendarEl = document.getElementById('calendar')
    const calendar = new Calendar(calendarEl, {
      plugins: [resourceTimelinePlugin],
      initialView: 'resourceTimelineWeek',
      resources: [
        { title: 'Resource A' },
        { title: 'Resource B' }
      ]
    })
    
    calendar.render()
}

export default Test
