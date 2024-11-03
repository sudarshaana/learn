import { useState, useEffect } from 'react'
import { getRandomGradient } from '../styles/gradients'

const correctSound = new Audio('https://raw.githubusercontent.com/sudarshaana/learn/refs/heads/main/public/sounds/correct-answer.mp3')

export const useGameState = ({ words = [], colorMode, onUpdateStats }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const saved = localStorage.getItem('currentWordIndex')
    return saved ? parseInt(saved, 10) : 0
  })
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [randomGradient, setRandomGradient] = useState(getRandomGradient(colorMode))
  const [showCorrectWord, setShowCorrectWord] = useState(false)
  const [hasCountedIncorrect, setHasCountedIncorrect] = useState(() => {
    const saved = localStorage.getItem('hasCountedIncorrect')
    return saved === 'true'
  })
  const [isRandomMode, setIsRandomMode] = useState(() => {
    const saved = localStorage.getItem('isRandomMode')
    return saved === 'true'
  })
  const [shuffledIndices, setShuffledIndices] = useState([])
  const [usedShuffleIndices, setUsedShuffleIndices] = useState([])

  // Load correct sound
  useEffect(() => {
    correctSound.load()
  }, [])

  // Save currentWordIndex to localStorage
  useEffect(() => {
    localStorage.setItem('currentWordIndex', currentWordIndex.toString())
  }, [currentWordIndex])

  // Save hasCountedIncorrect to localStorage
  useEffect(() => {
    localStorage.setItem('hasCountedIncorrect', hasCountedIncorrect.toString())
  }, [hasCountedIncorrect])

  // Save isRandomMode to localStorage
  useEffect(() => {
    localStorage.setItem('isRandomMode', isRandomMode.toString())
  }, [isRandomMode])

  // Update gradient when colorMode changes
  useEffect(() => {
    setRandomGradient(getRandomGradient(colorMode))
  }, [colorMode])

  // Handle shuffle mode
  useEffect(() => {
    if (words.length > 0 && isRandomMode) {
      const remainingIndices = Array.from({ length: words.length }, (_, i) => i)
        .filter(index => !usedShuffleIndices.includes(index))

      if (remainingIndices.length === 0) {
        setUsedShuffleIndices([])
        const allIndices = Array.from({ length: words.length }, (_, i) => i)
        const shuffled = shuffleArray([...allIndices])
        setShuffledIndices(shuffled)
      } else {
        const shuffled = shuffleArray([...remainingIndices])
        setShuffledIndices(shuffled)
      }
    } else {
      setShuffledIndices([])
      setUsedShuffleIndices([])
    }
  }, [words.length, isRandomMode, usedShuffleIndices.length === words.length])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const getCurrentWord = () => {
    if (!words.length) return { correct: '', incorrect: '' }
    return words[isRandomMode ? shuffledIndices[currentWordIndex] || 0 : currentWordIndex]
  }

  const checkPronunciation = () => {
    const currentWord = getCurrentWord()
    const isAnswerCorrect = userInput.toLowerCase().trim() === currentWord.correct.toLowerCase()
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      correctSound.currentTime = 0
      correctSound.play()
      onUpdateStats({ isCorrect: true, word: currentWord.correct, attempt: userInput })
      setTimeout(() => {
        nextWord()
      }, 1000)
    } else {
      onUpdateStats({ isCorrect: false, word: currentWord.correct, attempt: userInput })
      setHasCountedIncorrect(true)
    }
  }

  const nextWord = () => {
    if (isRandomMode) {
      const currentIndex = shuffledIndices[currentWordIndex]
      setUsedShuffleIndices(prev => [...prev, currentIndex])
    }
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    resetWordState(false)
  }

  const prevWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? words.length - 1 : newIndex
    })
    resetWordState(false)
  }

  const resetWordState = (resetIndex = false) => {
    if (resetIndex) {
      setCurrentWordIndex(0)
    }
    setUserInput("")
    setIsCorrect(null)
    setHasCountedIncorrect(false)
    setShowCorrectWord(false)
    setRandomGradient(getRandomGradient(colorMode))

    if (resetIndex) {
      localStorage.removeItem('currentWordIndex')
    }
    localStorage.setItem('hasCountedIncorrect', 'false')
  }

  const fullReset = () => {
    resetWordState(true)
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
    setIsCorrect(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkPronunciation()
    }
  }

  return {
    currentWord: getCurrentWord(),
    currentWordIndex,
    userInput,
    isCorrect,
    showCorrectWord,
    hasCountedIncorrect,
    isRandomMode,
    randomGradient,
    handleInputChange,
    handleKeyDown,
    checkPronunciation,
    nextWord,
    prevWord,
    setShowCorrectWord,
    setIsRandomMode,
    resetWordState: fullReset,
    setRandomGradient,
  }
}