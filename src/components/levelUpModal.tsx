import { useContext } from 'react'
import { ChallengeContext } from '../contexts/challengesContext'
import styles from '../styles/components/levelUpModal.module.css'

export function LevelUpModal(){
    const {level ,closeLevelUpModal} =  useContext(ChallengeContext)

    return(
        <div className= {styles.overLay}>
            <div className={styles.container}>
                <header className={styles.img}>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>
                <button 
                type='button' onClick={closeLevelUpModal}>
                    <img src='/icons/close.svg' alt="Fechar modal"/>
                </button>
            </div>
        </div>
    )
}