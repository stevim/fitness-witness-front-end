import { Dispatch, SetStateAction } from "react";
import DayCard from "../../components/DayCard/DayCard"

import { Day } from '../../types/models'

interface DayListProps {
  days: Day[];
  setDays: Dispatch<SetStateAction<Day[]>>;
}

const DayList = ( props: DayListProps ) => {
  const { days, setDays } = props

  return (
    <main>
      {days.map((day: Day) => 
        <DayCard
          key={day.id}
          day={day}
          setDays={setDays}
        />
      )}
    </main>
  )
}

export default DayList