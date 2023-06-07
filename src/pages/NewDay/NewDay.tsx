import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { User } from '../../types/models'
import { DayFormData } from '../../types/forms';

interface NewDayProps {
  user: User | null;
  handleCreateDay: (dayFormData: DayFormData) => void;
}

const NewDay = (props: NewDayProps): JSX.Element => {
  const { handleCreateDay, user } = props
  const navigate = useNavigate()
  const defaultDate = new Date()
  const [dayFormData, setDayFormData] = useState<DayFormData>({
    id: 0,
    dayDate: defaultDate.toISOString().slice(0,10),
    profileId: user?.profile.id,
    weight: 0,
    photo: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>):void => {
    setDayFormData({
      ...dayFormData,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault()
    handleCreateDay(dayFormData)
    navigate('/days')
  }

  if (!user) return <div>...Loading</div>

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
        <label htmlFor='photo-input'>
          Upload Photo
        </label>
        <input
          type='string'
          name='photo'
          id='photo-input'
          value={dayFormData.photo}
          onChange={handleChange}
        />
        <br/>
        <button type='submit'>
          Create Day
        </button>
      </form>
    </div>
  )
}

export default NewDay