"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, History, Volume2, HelpCircle, Book } from "lucide-react"
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Spinner,
  useToast,
  useColorMode
} from "@chakra-ui/react"
import Papa from 'papaparse'

import { WordDisplay } from './components/WordDisplay'
import { InputSection } from './components/InputSection'
import { ButtonControls } from './components/ButtonControls'
import { StatsDisplay } from './components/StatsDisplay'
import { HistoryModal } from './components/HistoryModal'
import { useSpeech } from './hooks/useSpeech'
import { theme } from './utils/theme'
import { getRandomGradient } from './styles/gradients'
import { ProgressBar } from './components/ProgressBar'
import { StreakCounter } from './components/StreakCounter'
import { ShortcutsGuide } from './components/ShortcutsGuide'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { WordSetSelector } from './components/WordSetSelector'
import { wordSets } from './data/wordSets'

export default function HomeComponent() {
  const { colorMode } = useColorMode()
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const saved = localStorage.getItem('currentWordIndex')
    return saved ? parseInt(saved, 10) : 0
  })
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [randomGradient, setRandomGradient] = useState(getRandomGradient(colorMode))
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

  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak')
    return saved ? parseInt(saved, 10) : 0
  })

  const [bestStreak, setBestStreak] = useState(() => {
    const saved = localStorage.getItem('bestStreak')
    return saved ? parseInt(saved, 10) : 0
  })

  const [showShortcuts, setShowShortcuts] = useState(false)

  const [showWordSets, setShowWordSets] = useState(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore')
    return !hasVisited // Show word sets if never visited
  })

  const [currentWordSet, setCurrentWordSet] = useState(() => {
    const saved = localStorage.getItem('currentWordSet')
    return saved ? JSON.parse(saved) : null // Set to null initially
  })

  useEffect(() => {
    localStorage.setItem('currentWordIndex', currentWordIndex.toString())
  }, [currentWordIndex])

  useEffect(() => {
    if (!currentWordSet) return // Don't load words if no set is selected

    setIsLoading(true)
    fetch(currentWordSet.url)
      .then(response => response.text())
      .then(csvText => {
        const { data } = Papa.parse(csvText, {
          skipEmptyLines: true
        })

        const loadedWords = data
          .filter(row => row[0] && row[1])
          .map(row => ({
            correct: row[0].trim(),
            incorrect: row[1].trim()
          }))

        setWords(loadedWords)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error loading words:', error)
        setIsLoading(false)
      })
  }, [currentWordSet])

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
    localStorage.setItem('streak', streak.toString())
  }, [streak])

  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak)
      localStorage.setItem('bestStreak', streak.toString())
    }
  }, [streak, bestStreak])

  const currentWord = words.length > 0 ? words[currentWordIndex] : { correct: '', incorrect: '' }

  const checkPronunciation = () => {
    const isAnswerCorrect = userInput.toLowerCase().trim() === currentWord.correct.toLowerCase()
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setStreak(prev => prev + 1)
      const newCount = correctCount + 1
      setCorrectCount(newCount)
      localStorage.setItem('correctCount', newCount.toString())

      // Automatically move to next word after a short delay
      setTimeout(() => {
        nextWord()
      }, 1000) // 1 second delay to show the success state
    } else {
      setStreak(0)
      if (!hasCountedIncorrect) {
        const newCount = incorrectCount + 1
        setIncorrectCount(newCount)
        setHasCountedIncorrect(true)
        localStorage.setItem('incorrectCount', newCount.toString())
        localStorage.setItem('hasCountedIncorrect', 'true')
      }
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
      checkPronunciation()
    }
  }

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    setUserInput("")
    setIsCorrect(null)
    setHasCountedIncorrect(false)
    localStorage.setItem('hasCountedIncorrect', 'false')
    setRandomGradient(getRandomGradient(colorMode))
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
    setRandomGradient(getRandomGradient(colorMode))
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
    setStreak(0)
    setBestStreak(0)

    localStorage.removeItem('currentWordIndex')
    localStorage.removeItem('correctCount')
    localStorage.removeItem('incorrectCount')
    localStorage.removeItem('hasCountedIncorrect')
    localStorage.removeItem('wordHistory')
    localStorage.removeItem('streak')
    localStorage.removeItem('bestStreak')

    setRandomGradient(getRandomGradient(colorMode))
  }

  useEffect(() => {
    setRandomGradient(getRandomGradient(colorMode))
  }, [colorMode])

  const bgGradient = `linear(to-br, ${randomGradient.join(', ')})`

  //const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  useKeyboardShortcuts({
    showHistory,
    setShowHistory,
    nextWord,
    prevWord,
    setShowCorrectWord,
    speakWord,
    currentWord
  })

  const handleWordSetSelect = (wordSet) => {
    setCurrentWordSet(wordSet)
    localStorage.setItem('currentWordSet', JSON.stringify(wordSet))
    localStorage.setItem('hasVisitedBefore', 'true') // Mark as visited
    setShowWordSets(false)
    handleReset()
  }

  // Show loading state or word set selector if no set is selected
  if (!currentWordSet || (showWordSets && !localStorage.getItem('hasVisitedBefore'))) {
    return (
      <ChakraProvider theme={theme}>
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
          <WordSetSelector
            isOpen={true}
            onClose={() => {
              // Only allow closing if not first visit
              if (localStorage.getItem('hasVisitedBefore')) {
                setShowWordSets(false)
              }
            }}
            onSelect={handleWordSetSelect}
            currentSetId={currentWordSet?.id}
            hideCloseButton={!localStorage.getItem('hasVisitedBefore')}
          />
        </Box>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 0, md: 4 }}
      >
        {isLoading ? (
          <Flex direction="column" align="center" gap={4}>
            <Spinner size="xl" color="blue.400" />
            <Text color="gray.400">Loading words...</Text>
          </Flex>
        ) : (
          <Box
            width="full"
            maxWidth={{ base: "100%", md: "500px" }}
            mx="auto"
            position="relative"
            height={{ base: "100vh", md: "auto" }}
          >
            <Box
              p={{ base: 4, md: 6 }}
              bgGradient={bgGradient}
              borderRadius={{ base: 0, md: "lg" }}
              boxShadow={{ base: "none", md: "dark-lg" }}
              borderWidth={{ base: 0, md: 1 }}
              borderColor="gray.700"
              position="relative"
              height={{ base: "100%", md: "auto" }}
              display="flex"
              flexDirection="column"
            >
              <Box top="-2px" width='full'>
                <ProgressBar
                  current={currentWordIndex + 1}
                  total={words.length}
                />
              </Box>
              <StatsDisplay
                correctCount={correctCount}
                incorrectCount={incorrectCount}
                currentIndex={currentWordIndex}
                totalWords={words.length}
                streak={streak}
                bestStreak={bestStreak}
              />

              <VStack spacing={[3, 4]} pt={12}>

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


              </VStack>


              <Flex
                position={{ base: "relative", md: "absolute" }}
                bottom={{ base: "auto", md: "-70px" }}
                left="50%"
                transform="translateX(-50%)"
                mt={{ base: 4, md: 8 }}
                mb={{ base: 2, md: 0 }}
                alignItems="center"
                width={{ base: "full", md: "100%" }}
                maxWidth={{ base: "full", md: "500px" }}
                zIndex={2}
                bg="whiteAlpha.50"
                borderRadius="lg"
                p={2}
              >
                <Flex
                  gap={2}
                  justifyContent="center"
                  width="full"
                >
                  {/* Show Answer Button */}
                  <Button
                    size="sm"
                    // bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.100"
                    onClick={() => setShowCorrectWord(!showCorrectWord)}
                    title="Show/Hide Answer (Mac: ⌘ + O | Win: Ctrl + O)"
                    aria-label="Show/Hide Answer"
                    width="full"
                    height="40px"
                    padding={0}
                    flex={1}
                  >
                    {showCorrectWord ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>

                  {/* History Button */}
                  <Button
                    size="sm"
                    // bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.100"
                    onClick={() => setShowHistory(!showHistory)}
                    title="History (Mac: ⌘ + H | Win: Ctrl + H)"
                    aria-label="View History"
                    width="full"
                    height="40px"
                    padding={0}
                    flex={1}
                  >
                    <History size={16} />
                  </Button>

                  {/* Words Button */}
                  <Button
                    size="sm"
                    // bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.100"
                    onClick={() => setShowWordSets(true)}
                    title="Select Word Set"
                    aria-label="Select Word Set"
                    width="full"
                    height="40px"
                    padding={0}
                    flex={1}
                  >
                    <Book size={16} />
                  </Button>

                  {/* Shortcuts Button */}
                  <Button
                    size="sm"
                    // bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.100"
                    onClick={() => setShowShortcuts(true)}
                    title="Keyboard Shortcuts"
                    aria-label="Show Keyboard Shortcuts"
                    width="full"
                    height="40px"
                    padding={0}
                    flex={1}
                  >
                    <HelpCircle size={16} />
                  </Button>


                </Flex>
              </Flex>

              {showCorrectWord && (
                <Flex
                  position={{ base: "relative", md: "absolute" }}
                  bottom={{ base: "auto", md: "-120px" }}
                  left="50%"
                  transform="translateX(-50%)"
                  color="gray.300"
                  fontSize="lg"
                  fontWeight="bold"
                  alignItems="center"
                  gap={2}
                  mt={{ base: 4, md: 0 }}
                  mb={{ base: 2, md: 0 }}
                  width={{ base: "full", md: "auto" }}
                  justifyContent="center"
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
          </Box>
        )}

        <ShortcutsGuide
          isOpen={showShortcuts}
          onClose={() => setShowShortcuts(false)}
        />

        <HistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={wordHistory}
        />

        <WordSetSelector
          isOpen={showWordSets}
          onClose={() => setShowWordSets(false)}
          onSelect={handleWordSetSelect}
          currentSetId={currentWordSet.id}
        />
      </Box>
    </ChakraProvider>
  )
}