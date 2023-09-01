import { useQuestionStore } from "../store/questions";

export const useQuestionData = (): any => {
  const questions = useQuestionStore((state) => state.questions);

  const questionCorrect = questions.filter(
    (question) => question.userSelectedAnswer === question.correctAnswer
  );
  const questionIncorrect = questions.filter(
    (question) =>
      question.userSelectedAnswer != null &&
      question.userSelectedAnswer !== question.correctAnswer
  );
  const questionUnanswered = questions.filter(
    (question) => question.userSelectedAnswer == null
  );

  return { questionCorrect, questionIncorrect, questionUnanswered };
};
