import { useEffect } from 'react'
import { useHashRoute } from './logic/useHashRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import StudyPage from './pages/StudyPage'
import QuizPage from './pages/QuizPage'

export default function App() {
  const route = useHashRoute()

  useEffect(() => {
    if (route.page !== 'study') window.scrollTo(0, 0)
  }, [route.page])

  return (
    <>
      <Header page={route.page} />
      <div className="wrap">
        {route.page === 'home' && <HomePage />}
        {route.page === 'study' && <StudyPage section={route.section} />}
        {route.page === 'quiz' && <QuizPage />}
      </div>
      <Footer />
    </>
  )
}
