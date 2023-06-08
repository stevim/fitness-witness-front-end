import { Dispatch, SetStateAction, useState } from 'react'

import * as dayService from '../../services/dayService'

import { Day } from '../../types/models'

import { DayFormData } from '../../types/forms'

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

  console.log(invalidDates, currentDay, dayFormData.dayDate)

  const editView = (
    <article>
      <form onSubmit={handleEdit}>
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
        />
        <br/>
        <label htmlFor='weight-input'>
          Weight (lbs):
        </label>
        <input
          required
          type='number'
          name='weight'
          id='weight-input'
          value={dayFormData.weight}
          onChange={handleChange}
        />
        {
          (invalidDates.includes(dayFormData.dayDate) && dayFormData.dayDate !== currentDay) ?
          'Cant' :
          <button type='submit'>
            Save
          </button>
        }
      </form>
    </article>
  )

  const saveView = (
    <article>
      {day.dayDate.slice(0,10)}
      <button onClick={handleEdit}>
        Edit
      </button>
      <br/>
      {day.weight} 
      <br/>
      <button onClick={handleDelete}>
        Delete
      </button>
    </article>  
  )

  return (
    <>
      { editMode ? editView : saveView }
    </>
  )
}

export default DayCard