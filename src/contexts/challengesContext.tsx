import {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/levelUpModal'


interface Challenge{
    type: 'body'| 'eye',
    description:String,
    amount:number
}
interface ChallengesProviderProps{
    children: ReactNode
    level:number
    currentExperience:number
    challengesCompleted:number
}
interface ChallengesContextData{
    level:number,
    currentExperience:number,
    challengesCompleted:number,
    experienceToNextLevel:number;
    activeChallenge:Challenge,
    levelUp:()=> void,
    startNewChallenge:() => void,
    resetChallenge:() => void,
    completeChallenges:() => void,
    closeLevelUpModal:()=>void
}


export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperiece] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState( rest.challengesCompleted ?? 0)

    const [activeChallenge,setActiveChallenge] = useState(null)
    const experienceToNextLevel = Math.pow((level + 1)* 12,2)
    const [isLeveUpModalOpen, setIsLeveUpModalOpen] = useState(false)

    useEffect(()=>{
        Cookies.set('level',String(level))
        Cookies.set('currentExperience',String(currentExperience))
        Cookies.set('challengesCompleted',String(challengesCompleted))
    },[level, currentExperience, challengesCompleted])

    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    function resetChallenge(){
        setActiveChallenge(null)
    }
    function levelUp(){
      setLevel(level + 1)
      setIsLeveUpModalOpen(true)
    }
    function closeLevelUpModal(){
        
      setIsLeveUpModalOpen(false)
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === "denied"){
            new Notification('Novo desafio',{
                body: `Valendo ${challenge.amount} xp!` 
            })
        }
    }
    function completeChallenges(){
        if(!activeChallenge){
            return
        }

        const {amount} = activeChallenge

        let finalExperience = currentExperience + (amount * Math.pow(Math.floor((level + 1)*0.5),2))

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()

        }
        setCurrentExperiece(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }
    return(
        <ChallengeContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenges,
            closeLevelUpModal}}>

            {children}

            { isLeveUpModalOpen && <LevelUpModal/>}
            
            
        </ChallengeContext.Provider>
    )
}