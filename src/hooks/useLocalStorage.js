import { useEffect } from 'react'

export const useLocalStorage = ({
  currentWordIndex,
  correctCount,
  incorrectCount,
  hasCountedIncorrect,
  wordHistory
}) => {
  useEffect(() => {
    localStorage.setItem('currentWordIndex', currentWordIndex.toString())
  }, [currentWordIndex])

  useEffect(() => {
    localStorage.setItem('correctCount', correctCount.toString())
  }, [correctCount])

  useEffect(() => {
    localStorage.setItem('incorrectCount', incorrectCount.toString())
  }, [incorrectCount])

  useEffect(() => {
    localStorage.setItem('hasCountedIncorrect', hasCountedIncorrect.toString())
  }, [hasCountedIncorrect])

  useEffect(() => {
    localStorage.setItem('wordHistory', JSON.stringify(wordHistory))
  }, [wordHistory])
}