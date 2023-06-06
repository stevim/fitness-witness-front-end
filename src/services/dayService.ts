import * as tokenService from './tokenService'

import { DayFormData } from '../types/forms'
import { Day } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/days`

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

async function index(): Promise<Day[]> {
  const res = await fetch(BASE_URL, {
    headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
  })
  return await res.json() as Day[]
}

export {
  create,
  index,
}