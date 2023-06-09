import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { User, Day } from '../../types/models'
import { DayFormData } from '../../types/forms'

import saveBtn from '../../assets/icons/saveBtn.svg'

import styles from './NewDay.module.css'

interface NewDayProps {
  user: User | null;
  days: Day[];
  handleCreateDay: (dayFormData: DayFormData) => void;
}

const NewDay = (props: NewDayProps): JSX.Element => {
  const {
    days,
    user,
    handleCreateDay,
  } = props
  const defaultDate = new Date()
  const [dayFormData, setDayFormData] = useState<DayFormData>({
    dayDate: defaultDate.toISOString().slice(0,10),
    profileId: user?.profile.id,
    weight: 0,
  })

  const navigate = useNavigate()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = evt.target
    setDayFormData({
      ...dayFormData,
      [name]: value
    })
  }

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault()
    handleCreateDay(dayFormData)
    navigate('/days')
  }

  const invalidDates: string[] = days.map(day => {
    return day.dayDate.slice(0,10)
  })

  return (
    <div className={styles.newDayContainer}>
      <div className={styles.newDayDiv}>
        <form onSubmit={handleSubmit} className={styles.newDayForm}>
          <div className={styles.dateDiv}>
            <label htmlFor='date-input'>
              <h2>Date:</h2>
            </label>
            <input
              required
              type='date'
              name='dayDate'
              id='date-input'
              value={dayFormData.dayDate}
              onChange={handleChange}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.weightDiv}>
            <label htmlFor='weight-input'>
              <h2>Weight:</h2>
            </label>
            <input
              required
              type='number'
              name='weight'
              id='weight-input'
              value={dayFormData.weight}
              onChange={handleChange}
              className={styles.weightInput}
            />
            <h3>lbs</h3>
          </div>
          {
            invalidDates.includes(dayFormData.dayDate) ?
            'Date already exists' :
            <button type='submit' className={styles.saveBtn}>
              <img src={saveBtn} height='40px'/>
            </button>
          }
        </form>
      </div>
    </div>
  )
}

export default NewDay