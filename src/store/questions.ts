import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Question } from '../types'
import confetti from 'canvas-confetti'
import { getAllQuestions } from '../services/questions'

interface Store {
  questions: Question[]
  currentQuestion: number
  fetchQuestion: (limit: number) => Promise<void>
  selectAnswers: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviusQuestion: () => void
  resetGame: () => void
}

export const useQuestionStore = create<Store>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestion: async (limit) => {
      const questions = await getAllQuestions(limit)
      set({ questions })
    },

    selectAnswers: (questionId, answerIndex) => {
      const store = get()
      const newQuestions = structuredClone(store.questions)
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      set({
        questions: newQuestions
      })
    },

    goNextQuestion: () => {
      const { questions, currentQuestion } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({
          currentQuestion: nextQuestion
        })
      }
    },

    goPreviusQuestion: () => {
      const { currentQuestion } = get()
      const previusQuestion = currentQuestion - 1

      if (previusQuestion >= 0) {
        set({
          currentQuestion: previusQuestion
        })
      }
    },

    resetGame: () => {
      set({
        questions: [],
        currentQuestion: 0
      })
    }
  }
}, {
  name: 'questions'
}))
