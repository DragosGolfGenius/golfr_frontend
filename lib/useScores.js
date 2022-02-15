import useSWR from 'swr'
import { getToken } from './userAuth'

export const FEED_URL = `${process.env.NEXT_PUBLIC_API_URL}/feed`
export const SCORES_URL = `${process.env.NEXT_PUBLIC_API_URL}/scores`

const useScores = (id = null) => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.scores)
  }

  const URL = id === null ? FEED_URL : SCORES_URL.concat(`/${id}`)
  const { data, error } = useSWR(URL, fetcher)

  return {
    scores: data,
    error: error && error.message,
  }
}

export default useScores
