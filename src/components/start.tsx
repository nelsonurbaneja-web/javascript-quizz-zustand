import { Button } from '@mui/material'
import { useQuestionStore } from '../store/questions'

const LIMIT_QUESTIONS = 5

export function Start (): JSX.Element {
  const fetchQuestion = useQuestionStore(state => state.fetchQuestion)

  const handleFetchCuestions = (): any => {
    void fetchQuestion(LIMIT_QUESTIONS)
  }

  return (
    <Button variant='contained' onClick={() => handleFetchCuestions()}>¡Empezar!</Button>
  )
}
