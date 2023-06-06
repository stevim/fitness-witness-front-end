import DayCard from "../../components/DayCard/DayCard"

import { Day } from '../../types/models'

interface DayListProps {
  days: Day[];
}

const DayList = ( props: DayListProps ) => {
  const { days } = props

  return (
    <main>
      {days.map((day: Day) => 
        <DayCard
          key={day.id}
          day={day}
        />
      )}
    </main>
  )
}

export default DayList