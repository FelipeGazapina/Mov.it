import { useContext } from 'react'
import { ChallengeContext } from '../contexts/challengesContext'
import styles from '../styles/components/completedChallenges.module.css'

export function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengeContext)
    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}