"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Eye, EyeOff, History, X, Volume2 } from "lucide-react"
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
  ["blue.800", "blue.900", "gray.900"],
  ["gray.700", "gray.800", "gray.900"],
  ["blue.800", "gray.900", "gray.900"],
  ["cyan.800", "blue.900", "gray.900"],
  ["teal.800", "blue.900", "gray.900"],
  ["purple.800", "purple.900", "gray.900"],
  ["pink.800", "purple.900", "gray.900"],
  ["violet.800", "purple.900", "gray.900"],
  // ["orange.800", "red.900", "gray.900"],
  ["yellow.800", "orange.900", "gray.900"],
  ["teal.800", "cyan.900", "gray.900"],
  ["cyan.800", "teal.900", "gray.900"],
  ["blue.800", "teal.900", "gray.900"],
  ["gray.700", "gray.800", "gray.900"],
  ["gray.800", "blue.900", "gray.900"],
  ["gray.800", "purple.900", "gray.900"],
  ["purple.800", "blue.900", "gray.900"],
  ["teal.800", "purple.900", "gray.900"],
  ["blue.800", "purple.900", "gray.900"],
  ["cyan.800", "purple.900", "gray.900"],
  ["violet.800", "blue.900", "gray.900"]
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
    setWordHistory([])

    localStorage.removeItem('currentWordIndex')
    localStorage.removeItem('correctCount')
    localStorage.removeItem('incorrectCount')
    localStorage.removeItem('hasCountedIncorrect')
    localStorage.removeItem('wordHistory')

    setRandomGradient(darkGradientPalettes[Math.floor(Math.random() * darkGradientPalettes.length)])
  }

  const bgGradient = `linear(to-br, ${randomGradient.join(', ')})`

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      // Close history window with ESC key
      if (e.key === 'Escape' && showHistory) {
        e.preventDefault()
        setShowHistory(false)
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
      // Reset - Cmd/Ctrl + R
      // if (isModifierKey && e.key === 'r') {
      //   e.preventDefault()
      //   handleReset()
      // }
    }

    window.addEventListener('keydown', handleKeyboardShortcuts)
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts)
  }, [showHistory])

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(word)

      // Optional: Set voice properties
      utterance.rate = 0.9  // Slightly slower
      utterance.pitch = 1
      utterance.volume = 1

      // Optional: Use English voice if available
      const voices = window.speechSynthesis.getVoices()
      const englishVoice = voices.find(voice => voice.lang.includes('en'))
      if (englishVoice) {
        utterance.voice = englishVoice
      }

      window.speechSynthesis.speak(utterance)
    }
  }

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
            <Flex
              fontSize={["2xl", "3xl"]}
              fontWeight="bold"
              textAlign="center"
              color="gray.100"
              wordBreak="break-word"
              px={2}
              mt={2}
              mb={2}
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              {currentWord.incorrect}
              <Button
                size="sm"
                variant="ghost"
                color="gray.300"
                _hover={{ color: "gray.100" }}
                onClick={() => speakWord(currentWord.correct)}
                title="Listen to pronunciation"
                aria-label="Listen to pronunciation"
              >
                <Volume2 size={20} />
              </Button>
            </Flex>
            <Flex width="full" position="relative" alignItems="center" gap={4}>
              <Input
                placeholder="Type the correct spelling"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                aria-label="Enter correct spelling"
                bg="gray.800"
                mb={2}
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
              >
                <RotateCcw size={16} />
              </Button>
            </Flex>
            <Flex width="full" justifyContent="space-between">
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




      </Box>

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
    </ChakraProvider>
  )
}