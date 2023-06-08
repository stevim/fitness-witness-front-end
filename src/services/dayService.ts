import * as tokenService from './tokenService'

import { DayFormData, PhotoFormData } from '../types/forms'
import { Day } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/days`

async function index(): Promise<Day[]> {
  const res = await fetch(BASE_URL, {
    headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
  })
  return await res.json() as Day[]
}

async function create(
    dayFormData: DayFormData,
    // photoFormData: PhotoFormData
  ): Promise<Day> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dayFormData)
    }
  )
  // if (photoFormData) {
  //   await addDayPhoto(photoFormData)
  // }
  return await res.json() as Day
}

async function update(dayFormData: DayFormData, dayId: number): Promise<Day> {
  console.log('patching')  
  const res = await fetch(`${BASE_URL}/${dayId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dayFormData)
  })
  return await res.json() as Day
}

async function deleteDay(dayId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${dayId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  return await res.json()
}

// async function addDayPhoto(photoData: PhotoFormData, dayId: number): Promise<string> {
//   if (!photoData.photo) throw new Error('No photos found')
  
//   const photoFormData = new FormData()
//   photoFormData.append('photo', photoData.photo)

//   const res = await fetch(`${BASE_URL}/${dayId}/add-photo`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${tokenService.getToken()}`
//     },
//     body: photoFormData
//   })
//   return await res.json() as string
// }

export {
  create,
  index,
  update,
  deleteDay as delete,
}