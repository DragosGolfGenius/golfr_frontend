import { mutate } from 'swr'
import { getToken } from './userAuth'
import { FEED_URL } from './useScores'

const url = `${process.env.NEXT_PUBLIC_API_URL}/scores`

const getError = (totalScore, numberOfScores) => {
  var error = "Couldn't post: "
  if (numberOfScores == 9 && (totalScore < 27 || totalScore >= 90)) error = error.concat('the value of totalScore must be between 27 and 90 ')
  if (numberOfScores == 18 && (totalScore < 90 || totalScore >= 180)) error = error.concat('the value of totalScore must be between 90 and 180 ')
  return error
}

const useScorePost = () => {
  const postScore = async (totalScore, playedAt, numberOfScores) => {
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
          number_of_scores: numberOfScores,
        },
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          alert(getError(totalScore, numberOfScores))
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
