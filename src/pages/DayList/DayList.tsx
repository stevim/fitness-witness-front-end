import { Dispatch, SetStateAction, useState } from "react";
import DayCard from "../../components/DayCard/DayCard"

import { Day, User } from '../../types/models'

import arrowLeft from '../../assets/icons/arrowLeft.svg'
import arrowRight from '../../assets/icons/arrowRight.svg'

import styles from './DayList.module.css'

interface DayListProps {
  days: Day[];
  setDays: Dispatch<SetStateAction<Day[]>>;
  user: User | null;
}


const DayList = ( props: DayListProps ) => {
  const {
    days,
    setDays,
  } = props
  const [currIdx, setCurrIdx] = useState(0)
  const [displayCount, setDisplayCount] = useState(7)
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
    .map(day =>
      <div>
        <DayCard
          key={day.id}
          day={day}
          days={days}
          setDays={setDays}
        />
      </div>
    )

  const handleDisplayCountChange = (newDisplayCount: number) => {
    setDisplayCount(newDisplayCount)
  }

  const handleSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    handleDisplayCountChange(Number(evt.target.value))
    setSelectedOption(evt.target.value)
  }

  return (
    <main>
      <div className={styles.dropdownContainer}>
        <div id={styles.dropdown}>
          <button onClick={handleDecrease} className={styles.arrowBtn}>
            <img src={arrowLeft} height='40px'/>
          </button>
          <div className={styles.dropdownOptions}>
            <select value={selectedOption} onChange={handleSelect} id={styles.dropdownSelect}>
              <option value={7}>7</option>
              <option value={14}>14</option>
              <option value={30}>30</option>
            </select>
          </div>
          <button onClick={handleIncrease} className={styles.arrowBtn}>
            <img src={arrowRight} height='40px'/>
          </button>
        </div>
      </div>
      <div className={styles.dayCardContainer}>
        {filteredDays}
      </div>
    </main>
  )
}

export default DayList