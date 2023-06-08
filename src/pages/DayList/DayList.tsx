import { Dispatch, SetStateAction, useState } from "react";
import DayCard from "../../components/DayCard/DayCard"

import { Day } from '../../types/models'
// import { DayFormData } from "../../types/forms";

interface DayListProps {
  days: Day[];
  setDays: Dispatch<SetStateAction<Day[]>>;
  // handleUpdateDay: (dayFormData: DayFormData) => void;
}


const DayList = ( props: DayListProps ) => {
  const {
    days,
    setDays,
    // handleUpdateDay
  } = props
  const [currIdx, setCurrIdx] = useState(0)
  const [displayCount, setDisplayCount] = useState(5)
  const [selectedOption, setSelectedOption] = useState('')

  const handleIncrease = () => {
    let newIdx = currIdx
    newIdx = newIdx + displayCount
    if (newIdx > days.length) {
      return
    }
    setCurrIdx(newIdx)
  }

  const handleDecrease = () => {
    let newIdx = currIdx
    newIdx = newIdx - displayCount
    if (newIdx < 0) {
      return
    }
    setCurrIdx(newIdx)
  }

  const sortedDays = [...days]
    .sort((a,b) => b.dayDate.localeCompare(a.dayDate))

  const filteredDays = sortedDays
    .slice(currIdx, currIdx + displayCount)
    .map(day => <DayCard
      key={day.id}
      day={day}
      days={days}
      setDays={setDays}
    />)

  const handleDisplayCountChange = (newDisplayCount: number) => {
    setDisplayCount(newDisplayCount)
  }

  const handleSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    handleDisplayCountChange(Number(evt.target.value))
    setSelectedOption(evt.target.value)
  }

  return (
    <main>
      <button onClick={handleDecrease}>↞</button>
      <select value={selectedOption} onChange={handleSelect}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <button onClick={handleIncrease}>↠</button>
      {filteredDays}
    </main>
  )
}

export default DayList