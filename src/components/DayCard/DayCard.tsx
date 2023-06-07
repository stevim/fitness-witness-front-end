import { Dispatch, SetStateAction, useState } from 'react'

import * as dayService from '../../services/dayService'

import { Day } from '../../types/models'

interface DayCardProps {
  day: Day
  setDays: Dispatch<SetStateAction<Day[]>>
}

const DayCard = ( props: DayCardProps ): JSX.Element => {
  const { day, setDays } = props
  const [editMode, setEditMode] = useState(false)

  const formatDate = (dateStr: string): string => {
    const formattedDate = dateStr.slice(0,10)
    return formattedDate
  }

  const handleDelete = async () => {
    try {
      await dayService.delete(day.id)
      const daysData: Day[] = await dayService.index()
      setDays(daysData)
    } catch (err) {
      console.log(err)      
    }
  }

  const handleEdit = () => {
    editMode ? setEditMode(false) : setEditMode(true)
  }

  const editView = (
    <article>
      <button onClick={handleEdit}>
        Save
      </button>
    </article>
  )

  const saveView = (
    <article>
      {formatDate(day.dayDate)}
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