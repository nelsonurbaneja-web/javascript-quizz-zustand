import { type Question } from '../types'

export const getAllQuestions = async (limit: number): Promise<Question[]> => {
  const response = await fetch('http://localhost:5173/data.json')
  const data = await response.json()
  const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)

  return questions
}
