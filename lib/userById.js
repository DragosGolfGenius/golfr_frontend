import useSWR from 'swr'
import { getToken } from './userAuth'

export const USER_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`

export const useUserById = id => {
  const fetcher = async url => {
    if (!id) {
      return {}
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occured while fetching the data')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(USER_URL + `/${id}`, fetcher)

  return {
    user: data,
    errorUser: error && error.message,
  }
}
