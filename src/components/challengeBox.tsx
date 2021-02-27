import { useContext, useEffect } from 'react'
import { ChallengeContext } from '../contexts/challengesContext'
import { CountdownContext } from '../contexts/countdownContex'
import styles from '../styles/components/challengeBox.module.css'

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenges,level} = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext)
    

    const hasActiveChallenge = true

    function handleChallengeSucceeded(){
        completeChallenges()
        resetCountdown()
    }
    function handleChallengeFailed(){
        resetChallenge()
        resetCountdown()
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ?(
                <div className={styles.challengeBoxActive}>
                    <header>Ganhe {(activeChallenge.amount * Math.pow(Math.floor((level + 1)*0.5),2))} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type='button'
                        className={styles.challengeFailedButton}
                        onClick = {handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                        type='button'
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
            ):(
            <div className={styles.challengeBoxNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt=""/>
                    Avance de level completando desafios
                </p>
            </div>
            )}
        </div>
    )
}