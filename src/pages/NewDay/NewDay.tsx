import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { User, Day } from '../../types/models'
import { DayFormData, PhotoFormData } from '../../types/forms';

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
  // const [message, setMessage] = useState('')
  // const [photoData, setPhotoData] = useState<PhotoFormData>({
  //   photo: null
  // })
  // const imgInputRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = evt.target
    setDayFormData({
      ...dayFormData,
      [name]: value
    })
  }

  // const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   if(!evt.target.files) return
  //   const file = evt.target.files[0]
  //   let isFileInvalid = false
  //   let errMsg = ''
  //   const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
  //   const photoFormat = file.name.split('.').at(-1)

  //   if (file.size >= 10485760) {
  //     errMsg = 'Image must be smaller than 10.4MB'
  //     isFileInvalid = true
  //   }
  //   if (photoFormat && !validFormats.includes(photoFormat)) {
  //     errMsg = 'Image must be in gif, jpeg/jpg, png, svg, or webp format'
  //     isFileInvalid = true
  //   }

  //   setMessage(errMsg)

  //   if (isFileInvalid && imgInputRef.current) {
  //     imgInputRef.current.value = ''
  //     return
  //   }

  //   setPhotoData({ photo: evt.target.files[0] })
  // }

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault()
    handleCreateDay(dayFormData,
      // photoData
    )
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
        {/* <label htmlFor='photo-input'>
          Upload Photo
        </label>
        <input
          type='file'
          name='photo'
          id='photo-input'
          // value={dayFormData.photo}
          onChange={handleChangePhoto}
          ref={imgInputRef}
        />
        <br/> */}
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