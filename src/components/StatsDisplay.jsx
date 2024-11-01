import PropTypes from 'prop-types'
import { Flex, Text } from "@chakra-ui/react"

export const StatsDisplay = ({
  correctCount,
  incorrectCount,
  currentIndex,
  totalWords
}) => {
  return (
    <Flex width="full" justifyContent="space-between">
      <Text color="green.400" fontSize="lg">
        Correct: {correctCount}
      </Text>
      <Text color="red.400" fontSize="lg">
        Incorrect: {incorrectCount}
      </Text>
      <Text color="gray.300" fontSize="md">
        {currentIndex + 1} of {totalWords}
      </Text>
    </Flex>
  )
}

StatsDisplay.propTypes = {
  correctCount: PropTypes.number.isRequired,
  incorrectCount: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  totalWords: PropTypes.number.isRequired
}