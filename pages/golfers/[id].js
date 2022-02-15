import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useScores  from '../../lib/useScores'
import User from '../../components/User'
import { getUsernameById } from '../../lib/userById'

const ids = () => {
  var id_retrieved = null;
  if ( typeof window !== 'undefined' ) {
    var pathArray = window.location.pathname.split('/')
    id_retrieved = pathArray[pathArray.length - 1]
  }
  const { scores, error } = useScores(id_retrieved)
  const { user, errorUser} = getUsernameById(id_retrieved)

  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (
          <>
            {user && <User name = {user.name} />}
            {scores && scores.map(score => (
              <ScoreCard
                key = {score.id}
                id = {score.id}
                totalScore = {score.total_score}
                playedAt = {score.played_at}
                userId = {score.user_id}
                userName = {score.user_name}
              />
            ))}
          </>
        )}
      </>
    </Layout>
  )
}

export default ids
