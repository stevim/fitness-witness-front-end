import * as tokenService from './tokenService'

import { DayFormData } from '../types/forms'
import { Day } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/days`

async function index(): Promise<Day[]> {
  const res = await fetch(BASE_URL, {
    headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
  })
  return await res.json() as Day[]
}

async function create(dayFormData: DayFormData): Promise<Day> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dayFormData)
  })
  return await res.json() as Day
}

async function update(dayFormData: DayFormData): Promise<Day> {
  console.log('patching')  
  const res = await fetch(`${BASE_URL}/${dayFormData.id}`, {
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

export {
  create,
  index,
  update,
  deleteDay as delete,
}