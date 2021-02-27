import Head from 'next/head'
import styles from '../styles/pages/home.module.css'
import {GetServerSideProps} from 'next'

import { CompletedChallenges } from "../components/completedChallenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar";
import { Profile } from "../components/perfil";
import { ChallengeBox } from "../components/challengeBox";
import { CountdownProvider } from '../contexts/countdownContex';
import { ChallengesProvider } from '../contexts/challengesContext';

interface HomeProps{
  level:number
  currentExperience:number
  challengesCompleted:number
}

export default function Home(props) {


  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}
    >    
      <div className={styles.container}>
        <Head>
          <title>Inicio | mov.it</title>
        </Head>
        <ExperienceBar/>

        <section>
          <CountdownProvider>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </CountdownProvider>
        </section>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps : GetServerSideProps = async (ctx)=>{

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies
  
  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}