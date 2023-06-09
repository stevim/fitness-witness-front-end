import { Dispatch, SetStateAction, useState } from 'react'

import * as dayService from '../../services/dayService'

import { Day } from '../../types/models'
import { DayFormData } from '../../types/forms'

import styles from './DayCard.module.css'

import editBtn from '../../assets/icons/edtBtn.svg'
import saveBtn from '../../assets/icons/saveBtn.svg'
import deleteBtn from '../../assets/icons/deleteBtn.svg'

interface DayCardProps {
  day: Day;
  days: Day[]
  setDays: Dispatch<SetStateAction<Day[]>>;
}

const DayCard = ( props: DayCardProps ): JSX.Element => {
  const {
    day,
    days,
    setDays,
  } = props
  const [editMode, setEditMode] = useState(false)
  const [dayFormData, setDayFormData] = useState<DayFormData>({
    dayDate: day.dayDate,
    profileId: day.profileId,
    weight: day.weight,
    photo: day.photo,
  })
  const [currentDay, setCurrentDay] = useState('')
  
  const handleDelete = async (): Promise<void> => {
    try {
      await dayService.delete(day.id)
      const daysData: Day[] = await dayService.index()
      setDays(daysData)
    } catch (err) {
      console.log(err)      
    }
  }

  const handleUpdateDay = async (dayFormData: DayFormData, dayId: number): Promise<void> => {
    try {
      const updatedDay = await dayService.update(dayFormData, dayId)
      setDays(days.map((day) => {
        return day.id === updatedDay.id ? updatedDay : day
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = evt.target
    setDayFormData({
      ...dayFormData,
      [name]: value
    })
  }

  const handleEdit = (evt: React.FormEvent) => {
    evt.preventDefault()
    if (editMode) {
      handleUpdateDay(dayFormData, day.id)
      setEditMode(false)
    } else {
      setCurrentDay(day.dayDate)
      setEditMode(true)
    } 
  }

  const invalidDates = days.map(day => {
    if (day.dayDate !== currentDay) {
      return day.dayDate.slice(0,10)
    } else {
      return ''
    }
  })

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1)
    const options: object = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  const editView = (
    <>
    <div className={styles.editDayCardDiv}>
      <form onSubmit={handleEdit} className={styles.editForm}>
        <div className={styles.editDateCard}>
          <label htmlFor='date-input'>
            Date:
          </label>
          <input
            required
            type='date'
            name='dayDate'
            id='date-input'
            value={dayFormData.dayDate.slice(0,10)}
            onChange={handleChange}
            className={styles.dateInput}
          />
        </div>
        <div className={styles.editWeightCard}>
          <label htmlFor='weight-input'>
            Weight:
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
          <p>lbs</p>
        </div>
        {
          (invalidDates.includes(dayFormData.dayDate) && dayFormData.dayDate !== currentDay) ?
          'Date already exists' :
          <button className={styles.saveBtn} type='submit'>
            <img src={saveBtn} height='20px'/>
          </button>
        }
      </form>
    </div>
    </>
  )

  const saveView = (
    <>
    <div className={styles.dayCardDiv}>
      <div className={styles.dayCardDate}>
        <h3>{formatDate(day.dayDate)}</h3>
        {/* <h3>{day.dayDate.slice(0,10)}</h3> */}
      </div>
      <div className={styles.dayCardWeight}>
        <h3>{day.weight} lbs</h3>
      </div>
      <div className={styles.saveViewBtns}>
        <button className={styles.editBtn} onClick={handleEdit}>
          <img src={editBtn} height='20px'/>
        </button>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          <img src={deleteBtn} height='20px'/>
        </button>
      </div>
    </div>
    </>
  )

  return (
    <div>
      { editMode ? editView : saveView }
    </div>
  )
}

export default DayCard