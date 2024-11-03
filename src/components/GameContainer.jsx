import { Box, VStack, Text, Button, Flex } from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { WordDisplay } from './WordDisplay'
import { InputSection } from './InputSection'
import { ButtonControls } from './ButtonControls'
import { ProgressBar } from './ProgressBar'
import { StatsDisplay } from './StatsDisplay'
import { NavigationBar } from './NavigationBar'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2 } from "lucide-react"

export const GameContainer = ({
  currentWord,
  currentWordIndex,
  totalWords,
  userInput,
  isCorrect,
  showCorrectWord,
  isRandomMode,
  bgGradient,
  correctCount,
  incorrectCount,
  streak,
  bestStreak,
  onInputChange,
  onKeyDown,
  onCheck,
  onPrev,
  onNext,
  onReset,
  onInfo,
  onToggleAnswer,
  onShuffle,
  onHistory,
  onStats,
  onWordList,
  onSpeak,
  onHelp,
}) => {
  return (
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
            total={totalWords}
          />
        </Box>

        <StatsDisplay
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          currentIndex={currentWordIndex}
          totalWords={totalWords}
          streak={streak}
          bestStreak={bestStreak}
        />

        <VStack spacing={[3, 4]} pt={12}>
          <WordDisplay
            word={currentWord}
            onSpeak={onSpeak}
          />

          <InputSection
            userInput={userInput}
            onInputChange={onInputChange}
            onKeyDown={onKeyDown}
            isCorrect={isCorrect}
          />

          <ButtonControls
            onCheck={onCheck}
            onPrev={onPrev}
            onNext={onNext}
            showCorrectWord={showCorrectWord}
            onToggleAnswer={onToggleAnswer}
            onInfo={onInfo}
          />

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
                    onClick={() => onSpeak(currentWord.correct)}
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
        </VStack>
      </Box>

      <NavigationBar
        isRandomMode={isRandomMode}
        onShuffle={onShuffle}
        onHistory={onHistory}
        onStats={onStats}
        onWordList={onWordList}
        onReset={onReset}
        onHelp={onHelp}
      />
    </Box>
  )
}

GameContainer.propTypes = {
  currentWord: PropTypes.shape({
    correct: PropTypes.string,
    incorrect: PropTypes.string
  }).isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  totalWords: PropTypes.number.isRequired,
  userInput: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool,
  showCorrectWord: PropTypes.bool.isRequired,
  isRandomMode: PropTypes.bool.isRequired,
  bgGradient: PropTypes.string.isRequired,
  correctCount: PropTypes.number.isRequired,
  incorrectCount: PropTypes.number.isRequired,
  streak: PropTypes.number.isRequired,
  bestStreak: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  onToggleAnswer: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired,
  onHistory: PropTypes.func.isRequired,
  onStats: PropTypes.func.isRequired,
  onWordList: PropTypes.func.isRequired,
  onSpeak: PropTypes.func.isRequired,
  onHelp: PropTypes.func.isRequired,
}