import PropTypes from 'prop-types'
import { Flex, Text, Box } from "@chakra-ui/react"
import { StreakCounter } from './StreakCounter'

export const StatsDisplay = ({
    correctCount,
    incorrectCount,
    currentIndex,
    totalWords,
    streak,
    bestStreak
}) => {
    return (
        <Box width="full">
            {/* Progress text */}
            {/* <Text
                color="gray.400"
                fontSize="sm"
                textAlign="right"
                mb={2}
            >
                {currentIndex + 1} of {totalWords}
            </Text> */}

            {/* Stats row */}
            <Flex
                justify="space-between"
                align="center"
                bg="whiteAlpha.50"
                p={3}
                borderRadius="lg"
            >
                <Text
                    color="green.400"
                    fontSize="sm"
                    fontWeight="bold"
                >
                    Correct: {correctCount}
                </Text>
                <StreakCounter
                    streak={streak}
                    bestStreak={bestStreak}
                />
                <Text
                    color="red.400"
                    fontSize="sm"
                    fontWeight="bold"
                >
                    Wrong: {incorrectCount}
                </Text>
            </Flex>
        </Box>
    )
}

StatsDisplay.propTypes = {
    correctCount: PropTypes.number.isRequired,
    incorrectCount: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    totalWords: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    bestStreak: PropTypes.number.isRequired
}