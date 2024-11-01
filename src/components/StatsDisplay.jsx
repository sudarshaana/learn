import PropTypes from 'prop-types'
import { Flex, Text } from "@chakra-ui/react"

export const StatsDisplay = ({
    correctCount,
    incorrectCount,
    currentIndex,
    totalWords
}) => {
    return (
        <Flex
            width="full"
            justifyContent="space-between"
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 0 }}
            alignItems="center"
        >
            <Text color="green.400" fontSize={{ base: "md", md: "lg" }}>
                Correct: {correctCount}
            </Text>
            <Text color="red.400" fontSize={{ base: "md", md: "lg" }}>
                Incorrect: {incorrectCount}
            </Text>
            <Text color="gray.300" fontSize={{ base: "sm", md: "md" }}>
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