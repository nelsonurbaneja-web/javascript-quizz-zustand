import { useQuestionData } from '../hooks/useQuestionData'

export function Footer (): JSX.Element {
  const { questionCorrect, questionIncorrect, questionUnanswered } = useQuestionData()

  return (
    <footer style={{ marginTop: '2rem' }}>
      ✅ {questionCorrect.length} correctas /
      ❌ {questionIncorrect.length} incorrectas /
      ❔ {questionUnanswered.length} sin responder
    </footer>
  )
}
