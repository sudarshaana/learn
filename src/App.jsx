"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, RotateCcw, Eye, EyeOff, History, X, Volume2 } from "lucide-react"
import {
  ChakraProvider,
  extendTheme,
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Flex
} from "@chakra-ui/react"

import { wordsPromise } from "./data/words.js"
import { WordDisplay } from './components/WordDisplay'
import { InputSection } from './components/InputSection'
import { ButtonControls } from './components/ButtonControls'
import { StatsDisplay } from './components/StatsDisplay'
import { HistoryModal } from './components/HistoryModal'
import { useSpeech } from './hooks/useSpeech'
import { theme } from './utils/theme'
import { getRandomGradient } from './styles/gradients'

export default function HomeComponent() {
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const saved = localStorage.getItem('currentWordIndex')
    return saved ? parseInt(saved, 10) : 0
  })
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [randomGradient, setRandomGradient] = useState(getRandomGradient)
  const [correctCount, setCorrectCount] = useState(() => {
    const saved = localStorage.getItem('correctCount')
    return saved ? parseInt(saved, 10) : 0
  })
  const [incorrectCount, setIncorrectCount] = useState(() => {
    const saved = localStorage.getItem('incorrectCount')
    return saved ? parseInt(saved, 10) : 0
  })
  const [hasCountedIncorrect, setHasCountedIncorrect] = useState(() => {
    const saved = localStorage.getItem('hasCountedIncorrect')
    return saved === 'true'
  })
  const [showCorrectWord, setShowCorrectWord] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [wordHistory, setWordHistory] = useState(() => {
    const savedHistory = localStorage.getItem('wordHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  const { speakWord } = useSpeech()

  useEffect(() => {
    localStorage.setItem('currentWordIndex', currentWordIndex.toString())
  }, [currentWordIndex])

  useEffect(() => {
    wordsPromise.then(loadedWords => {
      setWords(loadedWords)
      const saved = localStorage.getItem('currentWordIndex')
      if (saved && parseInt(saved, 10) >= loadedWords.length) {
        setCurrentWordIndex(0)
      }
    }).catch(error => {
      console.error('Error loading words:', error)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('correctCount', correctCount.toString())
  }, [correctCount])

  useEffect(() => {
    localStorage.setItem('incorrectCount', incorrectCount.toString())
  }, [incorrectCount])

  useEffect(() => {
    localStorage.setItem('hasCountedIncorrect', hasCountedIncorrect.toString())
  }, [hasCountedIncorrect])

  const currentWord = words.length > 0 ? words[currentWordIndex] : { correct: '', incorrect: '' }

  const checkPronunciation = () => {
    const isAnswerCorrect = userInput.toLowerCase().trim() === currentWord.correct.toLowerCase()
    setIsCorrect(isAnswerCorrect)
    if (isAnswerCorrect) {
      const newCount = correctCount + 1
      setCorrectCount(newCount)
      localStorage.setItem('correctCount', newCount.toString())
    } else if (!hasCountedIncorrect) {
      const newCount = incorrectCount + 1
      setIncorrectCount(newCount)
      setHasCountedIncorrect(true)
      localStorage.setItem('incorrectCount', newCount.toString())
      localStorage.setItem('hasCountedIncorrect', 'true')
    }

    const newHistory = [{
      word: currentWord.correct,
      isCorrect: isAnswerCorrect,
      attempt: userInput,
      timestamp: Date.now()
    }, ...wordHistory.filter(item => item.word !== currentWord.correct)]

    setWordHistory(newHistory)
    localStorage.setItem('wordHistory', JSON.stringify(newHistory))
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
    setIsCorrect(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isCorrect === true) {
        nextWord()
      } else {
        checkPronunciation()
      }
    }
  }

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    setUserInput("")
    setIsCorrect(null)
    setHasCountedIncorrect(false)
    localStorage.setItem('hasCountedIncorrect', 'false')
    setRandomGradient(getRandomGradient())
  }

  const prevWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? words.length - 1 : newIndex
    })
    setUserInput("")
    setIsCorrect(null)
    setHasCountedIncorrect(false)
    localStorage.setItem('hasCountedIncorrect', 'false')
    setRandomGradient(getRandomGradient())
  }

  useEffect(() => {
    setUserInput("")
    setIsCorrect(null)
  }, [currentWordIndex])

  const handleReset = () => {
    setCurrentWordIndex(0)
    setUserInput("")
    setIsCorrect(null)
    setCorrectCount(0)
    setIncorrectCount(0)
    setHasCountedIncorrect(false)
    setWordHistory([])

    localStorage.removeItem('currentWordIndex')
    localStorage.removeItem('correctCount')
    localStorage.removeItem('incorrectCount')
    localStorage.removeItem('hasCountedIncorrect')
    localStorage.removeItem('wordHistory')

    setRandomGradient(getRandomGradient())
  }

  const bgGradient = `linear(to-br, ${randomGradient.join(', ')})`

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      // Handle ESC key for history window first
      if (e.key === 'Escape' && showHistory) {
        e.preventDefault()
        setShowHistory(false)
        return
      }

      // If history is open, don't process other shortcuts
      if (showHistory) {
        return
      }

      const isModifierKey = e.metaKey || e.ctrlKey

      // Skip (Next Word) - Cmd/Ctrl + S or Space
      if ((isModifierKey && e.key === 's') || (e.key === ' ' && !e.target.matches('input'))) {
        e.preventDefault()
        nextWord()
      }
      // Show/Hide Answer - Cmd/Ctrl + A
      if (isModifierKey && e.key === 'a') {
        e.preventDefault()
        setShowCorrectWord(prev => !prev)
      }
      // History - Cmd/Ctrl + H
      if (isModifierKey && e.key === 'h') {
        e.preventDefault()
        setShowHistory(prev => !prev)
      }

      // Listen shortcut - Cmd/Ctrl + L
      if (isModifierKey && e.key === 'l') {
        e.preventDefault()
        speakWord(currentWord.correct)
      }

      // Previous Word - Cmd/Ctrl + P
      if (isModifierKey && e.key === 'p') {
        e.preventDefault()
        prevWord()
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcuts)
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts)
  }, [showHistory, currentWord])

  return (
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
        <Box
          width="full"
          maxWidth="md"
          bgGradient={bgGradient}
          borderRadius="lg"
          boxShadow="dark-lg"
          borderWidth={1}
          borderColor="gray.700"
          position="relative"
        >
          <VStack spacing={4} p={6}>
            <Heading as="h1" size="xl" textAlign="center" color="gray.100">
              Spelling Checker
            </Heading>

            <Text textAlign="center" color="gray.300" fontSize={["sm", "md"]}>
              Type the correct spelling for the word below
            </Text>

            <WordDisplay
              word={currentWord}
              onSpeak={speakWord}
            />

            <InputSection
              userInput={userInput}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              isCorrect={isCorrect}
            />

            <ButtonControls
              onCheck={checkPronunciation}
              onPrev={prevWord}
              onNext={nextWord}
              onReset={handleReset}
            />

            <StatsDisplay
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              currentIndex={currentWordIndex}
              totalWords={words.length}
            />
          </VStack>

          <Flex
            position="absolute"
            bottom="-50px"
            left="50%"
            transform="translateX(-50%)"
            gap={2}
          >
            <Button
              size="sm"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              color="gray.100"
              onClick={() => setShowCorrectWord(!showCorrectWord)}
              leftIcon={showCorrectWord ? <EyeOff size={16} /> : <Eye size={16} />}
              title="Mac: ⌘ + A | Win: Ctrl + A"
            >
              {showCorrectWord ? 'Hide Answer' : 'Show Answer'}
            </Button>

            <Button
              size="sm"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              color="gray.100"
              onClick={() => setShowHistory(!showHistory)}
              leftIcon={<History size={16} />}
              title="Mac: ⌘ + H | Win: Ctrl + H"
            >
              History
            </Button>
          </Flex>
          {showCorrectWord && (
            <Flex
              position="absolute"
              bottom="-80px"
              left="50%"
              transform="translateX(-50%)"
              color="gray.300"
              fontSize="lg"
              fontWeight="bold"
              alignItems="center"
              gap={2}
            >
              {currentWord.correct}
              <Button
                size="xs"
                variant="ghost"
                color="gray.400"
                _hover={{ color: "gray.200" }}
                onClick={() => speakWord(currentWord.correct)}
                title="Listen to pronunciation"
                aria-label="Listen to pronunciation"
              >
                <Volume2 size={16} />
              </Button>
            </Flex>
          )}
        </Box>

        <HistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={wordHistory}
        />
      </Box>
    </ChakraProvider>
  )
}