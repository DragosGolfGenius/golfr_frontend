import { mutate } from 'swr'
import { getToken } from './userAuth'
import { FEED_URL } from './useScores'

const url = `${process.env.NEXT_PUBLIC_API_URL}/scores`

const useScorePost = () => {
  const postScore = async (totalScore, playedAt, number_of_scores) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: {
          total_score: totalScore,
          played_at: playedAt,
          number_of_scores: number_of_scores
        },
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors[0])
        } else {
          mutate(FEED_URL)
        }
      })
      .catch(e => {
        alert(e)
      })
  }

  return {
    postScore,
  }
}

export default useScorePost
