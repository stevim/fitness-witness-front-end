import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { User, Day } from '../../types/models'
import { DayFormData } from '../../types/forms';

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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='date-input'>
          Date:
        </label>
        <input
          required
          type='date'
          name='dayDate'
          id='date-input'
          value={dayFormData.dayDate}
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
        <br/>
        {
          invalidDates.includes(dayFormData.dayDate) ?
          'You have already created this date' :
          <button type='submit'>
            Create Day
          </button>
        }
      </form>
    </div>
  )
}

export default NewDay