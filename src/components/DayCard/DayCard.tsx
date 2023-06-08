import { Dispatch, SetStateAction, useState } from 'react'

import * as dayService from '../../services/dayService'

import { Day } from '../../types/models'

import { DayFormData } from '../../types/forms'

interface DayCardProps {
  day: Day;
  days: Day[]
  setDays: Dispatch<SetStateAction<Day[]>>;
  // handleUpdateDay: (dayFormData: DayFormData) => void;
}

const DayCard = ( props: DayCardProps ): JSX.Element => {
  const {
    day,
    days,
    setDays,
    // handleUpdateDay
  } = props
  const defaultDate = new Date()
  const [editMode, setEditMode] = useState(false)

  const formatDate = (dateStr: string): string => {
    console.log(dateStr)
    const formattedDate = dateStr.slice(0,10)
    console.log(formattedDate)
    return formattedDate
  }

  const [dayFormData, setDayFormData] = useState<DayFormData>({
    // dayDate: defaultDate.toISOString().slice(0,10),
    dayDate: day.dayDate,
    profileId: day.profileId,
    weight: day.weight,
    photo: day.photo,
  })
  
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
      // const daysData = await dayService.index()
      setDays(days.map((day) => {
        return day.id === updatedDay.id ? updatedDay : day
      }))
      console.log(days)      
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
      console.log(dayFormData)
      handleUpdateDay(dayFormData, day.id)
      setEditMode(false)
    } else {
      setEditMode(true)
    } 
  }
  const invalidDates: string[] = days.map(day => {
    return day.dayDate.slice(0,10)
  })

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
          invalidDates.includes(dayFormData.dayDate) ?
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
      {/* {day.dayDate} */}
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