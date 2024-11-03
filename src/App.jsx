"use client"

import { useState, useEffect } from "react"
import { History, Volume2, HelpCircle, Book, BarChart2, Shuffle, RotateCcw } from "lucide-react"
import {
  ChakraProvider,
  Box,
  VStack,
  Text,
  Button,
  Flex,
  Spinner,
  useColorMode,
  Link
} from "@chakra-ui/react"
import Papa from 'papaparse'
import { motion, AnimatePresence } from 'framer-motion'

import { WordDisplay } from './components/WordDisplay'
import { InputSection } from './components/InputSection'
import { ButtonControls } from './components/ButtonControls'
import { StatsDisplay } from './components/StatsDisplay'
import { HistoryModal } from './components/HistoryModal'
import { useSpeech } from './hooks/useSpeech'
import { theme } from './utils/theme'
import { ProgressBar } from './components/ProgressBar'
// import { StreakCounter } from './components/StreakCounter'
import { ShortcutsGuide } from './components/ShortcutsGuide'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { WordSetSelector } from './components/WordSetSelector'
import { wordSets } from './data/wordSets'
import { StatsModal } from './components/StatsModal'
import { useWordDetails } from './hooks/useWordDetails'
// import { WordInfo } from './components/WordInfo'
import { WordInfoModal } from './components/WordInfoModal'
import { ResetConfirmationModal } from './components/ResetConfirmationModal'
import { useGameState } from './hooks/useGameState'
import { useModalManager } from './hooks/useModalManager'

const correctSound = new Audio('https://raw.githubusercontent.com/sudarshaana/learn/refs/heads/main/public/sounds/correct-answer.mp3')

export default function HomeComponent() {
  const { colorMode } = useColorMode()
  const [words, setWords] = useState([])
  const [correctCount, setCorrectCount] = useState(() => {
    const saved = localStorage.getItem('correctCount')
    return saved ? parseInt(saved, 10) : 0
  })
  const [incorrectCount, setIncorrectCount] = useState(() => {
    const saved = localStorage.getItem('incorrectCount')
    return saved ? parseInt(saved, 10) : 0
  })
  const [wordHistory, setWordHistory] = useState(() => {
    const savedHistory = localStorage.getItem('wordHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  const { speakWord } = useSpeech()
  const [isLoading, setIsLoading] = useState(true)

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak')
    return saved ? parseInt(saved, 10) : 0
  })

  const [bestStreak, setBestStreak] = useState(() => {
    const saved = localStorage.getItem('bestStreak')
    return saved ? parseInt(saved, 10) : 0
  })

  const [currentWordSet, setCurrentWordSet] = useState(() => {
    const saved = localStorage.getItem('currentWordSet')
    return saved ? JSON.parse(saved) : null
  })

  const [commonMistakes, setCommonMistakes] = useState(() => {
    const saved = localStorage.getItem('commonMistakes')
    return saved ? JSON.parse(saved) : {}
  })

  const {
    showHistory,
    showStats,
    showShortcuts,
    showWordSets,
    showInfo,
    showResetConfirm,
    setShowHistory,
    setShowStats,
    setShowShortcuts,
    setShowWordSets,
    setShowInfo,
    setShowResetConfirm,
    handleOpenModal,
    handleCloseModal,
  } = useModalManager()

  const {
    currentWord,
    currentWordIndex,
    userInput,
    isCorrect,
    showCorrectWord,
    isRandomMode,
    randomGradient,
    handleInputChange,
    handleKeyDown,
    checkPronunciation,
    nextWord,
    prevWord,
    setShowCorrectWord,
    setIsRandomMode,
    resetWordState,
  } = useGameState({
    words,
    colorMode,
    onUpdateStats: ({ isCorrect, word, attempt }) => {
      if (isCorrect) {
        setStreak(prev => prev + 1)
        const newCount = correctCount + 1
        setCorrectCount(newCount)
        localStorage.setItem('correctCount', newCount.toString())
      } else {
        setStreak(0)
        const newMistakes = { ...commonMistakes }
        if (!newMistakes[word]) {
          newMistakes[word] = {
            count: 1,
            attempts: [attempt]
          }
        } else {
          newMistakes[word].count += 1
          if (!newMistakes[word].attempts.includes(attempt)) {
            newMistakes[word].attempts = [...(newMistakes[word].attempts || []), attempt]
          }
        }
        setCommonMistakes(newMistakes)
        localStorage.setItem('commonMistakes', JSON.stringify(newMistakes))

        const newCount = incorrectCount + 1
        setIncorrectCount(newCount)
        localStorage.setItem('incorrectCount', newCount.toString())
      }

      const newHistory = [{
        word,
        isCorrect,
        attempt,
        timestamp: Date.now()
      }, ...wordHistory.filter(item => item.word !== word)]

      setWordHistory(newHistory)
      localStorage.setItem('wordHistory', JSON.stringify(newHistory))
    }
  })

  useEffect(() => {
    correctSound.load()
  }, [])

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
    localStorage.setItem('streak', streak.toString())
  }, [streak])

  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak)
      localStorage.setItem('bestStreak', streak.toString())
    }
  }, [streak, bestStreak])

  useEffect(() => {
    localStorage.setItem('isRandomMode', isRandomMode.toString())
  }, [isRandomMode])

  // Define handleReset first since handleWordSetSelect uses it
  const handleReset = () => {
    resetWordState()
    setCorrectCount(0)
    setIncorrectCount(0)
    setWordHistory([])
    setStreak(0)
    setBestStreak(0)
    setCommonMistakes({})

    localStorage.removeItem('correctCount')
    localStorage.removeItem('incorrectCount')
    localStorage.removeItem('wordHistory')
    localStorage.removeItem('streak')
    localStorage.removeItem('bestStreak')
    localStorage.removeItem('commonMistakes')
  }

  // Define handleWordSetSelect before it's used in the conditional render
  const handleWordSetSelect = (wordSet) => {
    setCurrentWordSet(wordSet)
    localStorage.setItem('currentWordSet', JSON.stringify(wordSet))
    localStorage.setItem('hasVisitedBefore', 'true')
    setShowWordSets(false)
    handleReset()
  }

  const bgGradient = `linear(to-br, ${randomGradient.join(', ')})`

  //const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  // Then use the hook with currentWord
  const { wordDetails, isLoading: detailsLoading } = useWordDetails(
    showInfo ? currentWord?.correct : null
  )

  // Then use keyboard shortcuts
  useKeyboardShortcuts({
    showHistory,
    setShowHistory,
    nextWord,
    prevWord,
    setShowCorrectWord,
    speakWord,
    setIsRandomMode,
    setShowInfo,
    currentWord: currentWord?.correct
  })

  // Show loading state or word set selector if needed
  if (!currentWordSet || (showWordSets && !localStorage.getItem('hasVisitedBefore'))) {
    // If there's only one word set, don't show selector
    if (wordSets.length === 1) {
      return (
        <ChakraProvider theme={theme}>
          <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
            <Flex direction="column" align="center" gap={4}>
              <Spinner size="xl" color="blue.400" />
              <Text color="gray.400">Loading words...</Text>
            </Flex>
          </Box>
        </ChakraProvider>
      )
    }

    // Show selector if there are multiple word sets
    return (
      <ChakraProvider theme={theme}>
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
          <WordSetSelector
            isOpen={true}
            onClose={() => {
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

  const stats = {
    totalAttempts: correctCount + incorrectCount,
    correctCount,
    incorrectCount,
    bestStreak,
    currentStreak: streak,
    averageAttempts: correctCount + incorrectCount > 0 ?
      (correctCount + incorrectCount) / words.length :
      0,
    commonMistakes
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        position="relative"
        pt={{ base: 4, md: 8 }}
      >
        <Box
          flex="1"
          display="flex"
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent="center"
          p={{ base: 0, md: 4 }}
          minHeight="100vh"
          pt={{ base: 0, md: 8 }}
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
              pb={{ base: "100px", md: 0 }}
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
                    onReset={() => setShowResetConfirm(true)}
                    onInfo={() => setShowInfo(true)}
                    showCorrectWord={showCorrectWord}
                    onToggleAnswer={() => setShowCorrectWord(!showCorrectWord)}
                    onShuffle={() => setIsRandomMode(prev => !prev)}
                    onHistory={() => handleOpenModal('history')}
                    onStats={() => handleOpenModal('stats')}
                    onWordList={() => handleOpenModal('wordsets')}
                    isRandomMode={isRandomMode}
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


                    {/* Add Shuffle Toggle Button */}
                    <Button
                      size="sm"
                      color={isRandomMode ? "yellow.400" : "gray.500"}
                      onClick={() => setIsRandomMode(prev => !prev)}
                      title={isRandomMode ? "Random Mode On" : "Random Mode Off"}
                      aria-label="Toggle Random Mode"
                      width="full"
                      height="40px"
                      padding={0}
                      flex={1}
                    >
                      <Shuffle size={16} />
                    </Button>


                    {/* History Button */}
                    <Button
                      size="sm"
                      color="purple.500"
                      onClick={() => handleOpenModal('history')}
                      title="History (Mac: ⌘ + H | Win: Ctrl + H)"
                      aria-label="View History"
                      width="full"
                      height="40px"
                      padding={0}
                      flex={1}
                    >
                      <History size={16} />
                    </Button>

                    {/* Stats Button */}
                    <Button
                      size="sm"
                      color="blue.500"
                      onClick={() => handleOpenModal('stats')}
                      title="View Statistics"
                      aria-label="View Statistics"
                      width="full"
                      height="40px"
                      padding={0}
                      flex={1}
                    >
                      <BarChart2 size={16} />
                    </Button>

                    {/* Words Button */}
                    <Button
                      size="sm"
                      color="teal.500"
                      onClick={() => handleOpenModal('wordsets')}
                      title="Select Word Set"
                      aria-label="Select Word Set"
                      width="full"
                      height="40px"
                      padding={0}
                      flex={1}
                    >
                      <Book size={16} />
                    </Button>

                    {/* Show Reset Button */}
                    <Button
                      color="red.400"
                      size="sm"
                      onClick={() => setShowResetConfirm(true)}
                      title="Reset Progress"
                      aria-label="Reset Progress"
                      width="full"
                      height="40px"
                      padding={0}
                      flex={1}
                    >
                      <RotateCcw size={16} />
                    </Button>

                    {/* Shortcuts Button */}
                    <Button
                      size="sm"
                      color="gray.500"
                      onClick={() => {
                        handleOpenModal('shortcuts')
                        setShowShortcuts(true)
                      }}
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

                {/* Answer reveal section with improved animation */}
                <AnimatePresence>
                  {showCorrectWord && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 20, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ width: "100%", overflow: "hidden" }}
                    >
                      <Flex
                        width="full"
                        bg="whiteAlpha.100"
                        backdropFilter="blur(8px)"
                        borderRadius="lg"
                        p={4}
                        alignItems="center"
                        justifyContent="center"
                        gap={3}
                        borderWidth={1}
                        borderColor="whiteAlpha.200"
                        mt={4}
                      >
                        <Text
                          color="gray.100"
                          fontSize={{ base: "lg", md: "xl" }}
                          fontWeight="bold"
                          textAlign="center"
                        >
                          {currentWord.correct}
                        </Text>
                        <Button
                          size="sm"
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "gray.200", bg: "whiteAlpha.200" }}
                          onClick={() => speakWord(currentWord.correct)}
                          title="Listen to pronunciation"
                          aria-label="Listen to pronunciation"
                          opacity={1}
                          minW="36px"
                          h="36px"
                          p={2}
                          bg="whiteAlpha.100"
                          _active={{ bg: "whiteAlpha.300" }}
                          borderRadius="full"
                        >
                          <Volume2 size={16} />
                        </Button>
                      </Flex>
                    </motion.div>
                  )}
                </AnimatePresence>


              </Box>

              <Box
                height={{ base: "40px", md: "0" }}  // Height for mobile only
                display={{ base: "block", md: "none" }}  // Only show on mobile
                aria-hidden="true"  // For accessibility
              />
            </Box>
          )}

          <ShortcutsGuide
            isOpen={showShortcuts}
            onClose={handleCloseModal}
          />

          <HistoryModal
            isOpen={showHistory}
            onClose={handleCloseModal}
            history={wordHistory}
          />

          <WordSetSelector
            isOpen={showWordSets}
            onClose={handleCloseModal}
            onSelect={(wordSet) => {
              handleCloseModal()
              handleWordSetSelect(wordSet)
            }}
            currentSetId={currentWordSet?.id}
            hideCloseButton={!localStorage.getItem('hasVisitedBefore')}
          />

          <StatsModal
            isOpen={showStats}
            onClose={handleCloseModal}
            stats={stats}
          />

        </Box>
        {/* Footer */}
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          p={2}
          textAlign="center"
          bg="whiteAlpha.50"
          backdropFilter="blur(5px)"
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
          zIndex={1}
        >
          <Text fontSize="sm" color="gray.400">
            Developed by{" "}
            <Link
              href="https://www.linkedin.com/in/sudarshaana/"
              target="_blank"
              rel="noopener noreferrer"
              color="blue.400"
              _hover={{ color: "blue.300", textDecoration: "none" }}
            >
              @sudarshaana
            </Link>
          </Text>
        </Box>
      </Box>

      <WordInfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        word={currentWord.correct}
        wordDetails={wordDetails}
        isLoading={detailsLoading}
      />
      {/* <StreakCounter streak={streak} bestStreak={bestStreak} /> */}
      <ResetConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
      />
    </ChakraProvider>
  )
}