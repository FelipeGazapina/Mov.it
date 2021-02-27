import { useContext } from 'react'
import { ChallengeContext } from '../contexts/challengesContext'
import styles from '../styles/components/profile.module.css'
export function Profile(){
    const {level} = useContext(ChallengeContext)
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/FelipeGazapina.png" alt="Felipe Gazapina"/>
            <div>
                <strong>Felipe Rico Gazapina</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}