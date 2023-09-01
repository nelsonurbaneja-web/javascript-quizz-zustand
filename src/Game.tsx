import { Card, List, ListItem, ListItemButton, Typography, ListItemText, Stack, IconButton, Button } from '@mui/material'
import { useQuestionStore } from './store/questions'
import { type Question as QuestionType } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './components/footer'

const getBackgroundColor = (info: QuestionType, index: number): string => {
  const { userSelectedAnswer, correctAnswer } = info
  // El usuario no a seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent'
  // El usuario selecciono pero la solucion es incorrecta.
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si es la seleccion correcta
  if (index === correctAnswer) return 'green'
  // si esta la solucion del usuario pero la secciono incorrectamente
  if (index === userSelectedAnswer) return 'red'

  // Cualquier otro caso
  return 'transparent'
}

function Question ({ info }: { info: QuestionType }): JSX.Element {
  const selectAnswer = useQuestionStore(state => state.selectAnswers)

  const createHandleClick = (answerIndex: number): any => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', textAlign: 'left', padding: '1rem', marginTop: '1rem' }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => {
          return (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={() => createHandleClick(index)}
                sx={{ backgroundColor: getBackgroundColor(info, index) }}
              >
                <ListItemText sx={{ textAlign: 'center' }}>{answer}</ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}

export function Game (): JSX.Element {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestions = useQuestionStore(state => state.currentQuestion)
  const questionInfo = questions[currentQuestions]
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPreviusQuestion = useQuestionStore(state => state.goPreviusQuestion)
  const resetGame = useQuestionStore(state => state.resetGame)

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={() => goPreviusQuestion()} disabled={currentQuestions === 0}>
          <ArrowBackIosNew />
        </IconButton>
        <p>{currentQuestions + 1}/{questions.length}</p>
        <IconButton onClick={() => goNextQuestion()} disabled={currentQuestions + 1 === questions.length}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
      <Button sx={{ marginTop: '.5rem' }} onClick={() => resetGame()}>Empezar de nuevo</Button>
    </>
  )
}
