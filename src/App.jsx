"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Eye, EyeOff, History, X } from "lucide-react"
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

const darkGradientPalettes = [
  ["gray.800", "gray.900", "gray.950"],
  ["slate.800", "slate.900", "gray.950"],
  ["zinc.800", "zinc.900", "gray.950"],
  ["neutral.800", "neutral.900", "gray.950"],
  ["stone.800", "stone.900", "gray.950"]
]

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.950",
      },
    },
  },
})

export default function HomeComponent() {
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const saved = localStorage.getItem('currentWordIndex')
    return saved ? parseInt(saved, 10) : 0
  })
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [randomGradient, setRandomGradient] = useState(
    darkGradientPalettes[Math.floor(Math.random() * darkGradientPalettes.length)]
  )
  const [correctCount, setCorrectCount] = useState(() => {
    const saved = localStorage.getItem('correctCount')
    return saved ? parseInt(saved, 10) : 0
  })
  const [incorrectCount, setIncorrectCount] = useState(() => {
    const saved = localStorage.getItem('incorrectCount')
    return saved ? parseInt(saved, 10) : 0
  })
  const [hasCountedIncorrect, setHasCountedIncorrect] = useState(false)
  const [showCorrectWord, setShowCorrectWord] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [wordHistory, setWordHistory] = useState(() => {
    const savedHistory = localStorage.getItem('wordHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

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

  const currentWord = words.length > 0 ? words[currentWordIndex] : { correct: '', incorrect: '' }

  const checkPronunciation = () => {
    const isAnswerCorrect = userInput.toLowerCase().trim() === currentWord.correct.toLowerCase()
    setIsCorrect(isAnswerCorrect)
    if (isAnswerCorrect) {
      setCorrectCount(prev => prev + 1)
    } else if (!hasCountedIncorrect) {
      setIncorrectCount(prev => prev + 1)
      setHasCountedIncorrect(true)
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
    setHasCountedIncorrect(false) // Reset for the new word
    setRandomGradient(darkGradientPalettes[Math.floor(Math.random() * darkGradientPalettes.length)])
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
    localStorage.setItem('currentWordIndex', '0')
    localStorage.removeItem('correctCount')
    localStorage.removeItem('incorrectCount')
    setRandomGradient(darkGradientPalettes[Math.floor(Math.random() * darkGradientPalettes.length)])
    setWordHistory([])
    localStorage.removeItem('wordHistory')
  }

  const bgGradient = `linear(to-br, ${randomGradient[0]}, ${randomGradient[1]}, ${randomGradient[2]})`

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
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
      // Reset - Cmd/Ctrl + R
      if (isModifierKey && e.key === 'r') {
        e.preventDefault()
        handleReset()
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcuts)
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts)
  }, [])

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
              {/* Spelling Checker */}
            </Heading>
            <Text textAlign="center" color="gray.300" fontSize={["sm", "md"]}>
              Type the correct spelling for the word below
            </Text>
            <Text
              fontSize={["2xl", "3xl"]}
              fontWeight="bold"
              textAlign="center"
              color="gray.100"
              wordBreak="break-word"
              px={2}
            >
              {currentWord.incorrect}
            </Text>
            <Flex width="full" position="relative" alignItems="center" gap={4}>
              <Input
                placeholder="Type the correct pronunciation"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                aria-label="Enter correct pronunciation"
                bg="gray.800"
                borderColor="gray.700"
                color="gray.100"
                _placeholder={{ color: "gray.400" }}
                _focus={{ borderColor: "indigo.600" }}
              />
              {isCorrect !== null && (
                <Box
                  minWidth="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {isCorrect ? (
                    <CheckCircle color="green" size={24} aria-label="Correct" />
                  ) : (
                    <XCircle color="red" size={24} aria-label="Incorrect" />
                  )}
                </Box>
              )}
            </Flex>
            <Flex width="full" gap={2}>
              <Button
                onClick={checkPronunciation}
                flex={1}
                bg="gray.700"
                _hover={{ bg: "gray.600" }}
                color="gray.100"
              >
                Check
              </Button>
              <Button
                onClick={nextWord}
                bg="green.700"
                _hover={{ bg: "green.600" }}
                color="gray.100"
                title="Mac: ⌘ + S | Win: Ctrl + S | Space"
              >
                <ChevronRight size={16} />
              </Button>
              <Button
                onClick={handleReset}
                bg="yellow.700"
                _hover={{ bg: "yellow.600" }}
                color="yellow.100"
                aria-label="Reset everything"
                title="Mac: ⌘ + R | Win: Ctrl + R"
              >
                <RotateCcw size={16} />
              </Button>
            </Flex>
            <Flex width="full" justifyContent="center" gap={8}>
              <Text color="green.400" fontSize="lg">
                Correct: {correctCount}
              </Text>
              <Text color="red.400" fontSize="lg">
                Incorrect: {incorrectCount}
              </Text>
              <Text color="gray.300" fontSize="md">
                {currentWordIndex + 1} of {words.length}
              </Text>
            </Flex>
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
              <Text
                position="absolute"
                bottom="-80px"
                left="50%"
                transform="translateX(-50%)"
                color="gray.300"
                fontSize="lg"
                fontWeight="bold"
              >
                {currentWord.correct}
              </Text>
            )}

            {showHistory && (
              <Box
                position="fixed"
                inset={0}
                bg="blackAlpha.600"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1000}
                onClick={() => setShowHistory(false)}
              >
                <Box
                  bg="gray.800"
                  borderRadius="lg"
                  p={6}
                  maxHeight="80vh"
                  maxWidth="500px"
                  width="90%"
                  overflowY="auto"
                  borderWidth={1}
                  borderColor="gray.700"
                  boxShadow="dark-lg"
                  position="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    position="absolute"
                    right={2}
                    top={2}
                    size="sm"
                    variant="ghost"
                    color="gray.400"
                    _hover={{ bg: "gray.700" }}
                    onClick={() => setShowHistory(false)}
                  >
                    <X size={20} />
                  </Button>

                  <VStack spacing={4} align="stretch" pt={2}>
                    <Heading size="md" color="gray.100" mb={2}>Attempt History</Heading>
                    {wordHistory.map((item, index) => (
                      <Flex
                        key={item.timestamp}
                        justify="space-between"
                        align="center"
                        p={3}
                        bg="gray.900"
                        borderRadius="md"
                      >
                        <VStack align="start" spacing={1}>
                          <Text color="gray.100">{item.word}</Text>
                          <Text color="gray.400" fontSize="sm">
                            Attempt: {item.attempt}
                          </Text>
                          <Text color="gray.500" fontSize="xs">
                            {new Date(item.timestamp).toLocaleString()}
                          </Text>
                        </VStack>
                        {item.isCorrect ? (
                          <CheckCircle color="green" size={20} />
                        ) : (
                          <XCircle color="red" size={20} />
                        )}
                      </Flex>
                    ))}
                    {wordHistory.length === 0 && (
                      <Text color="gray.400" textAlign="center">
                        No attempts yet
                      </Text>
                    )}
                  </VStack>
                </Box>
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  )
}