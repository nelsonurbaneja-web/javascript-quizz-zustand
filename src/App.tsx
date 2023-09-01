import './App.css'
import { Container, Typography, Stack } from '@mui/material'
import { JavaScriptLogo } from './components/javascript-logo'
import { Start } from './components/start'
import { useQuestionStore } from './store/questions'
import { Game } from './Game'

function App (): JSX.Element {
  const questions = useQuestionStore(state => state.questions)

  console.log({ questions })
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript quizz
          </Typography>
        </Stack>
        {questions.length < 1 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
