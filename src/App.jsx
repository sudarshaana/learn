"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from "lucide-react"
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
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [hasCountedIncorrect, setHasCountedIncorrect] = useState(false)

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
    setRandomGradient(darkGradientPalettes[Math.floor(Math.random() * darkGradientPalettes.length)])
  }

  const bgGradient = `linear(to-br, ${randomGradient[0]}, ${randomGradient[1]}, ${randomGradient[2]})`

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
        >
          <VStack spacing={4} p={6}>
            <Heading as="h1" size="xl" textAlign="center" color="gray.100">
              Spelling Checker
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
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  )
}