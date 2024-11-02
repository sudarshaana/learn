import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Box,
  Divider,
  Progress,
  SimpleGrid,
  Container,
  Flex
} from "@chakra-ui/react"
import { Trophy, Target, Clock, Zap, Percent } from "lucide-react"
import PropTypes from 'prop-types'

export const StatsModal = ({ isOpen, onClose, stats }) => {
  const {
    totalAttempts,
    correctCount,
    incorrectCount,
    bestStreak,
    currentStreak,
    averageAttempts,
    commonMistakes
  } = stats

  const accuracy = totalAttempts ? (correctCount / totalAttempts) * 100 : 0

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "2xl" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        mx={{ base: 0, md: 4 }}
        my={{ base: 0, md: 4 }}
        maxH={{ base: "100vh", md: "90vh" }}
        overflow="auto"
      >
        <ModalHeader
          color="gray.100"
          borderBottom="1px solid"
          borderColor="gray.700"
          py={4}
        >
          Your Statistics
        </ModalHeader>
        <ModalCloseButton color="gray.400" />
        <ModalBody py={6}>
          <Container maxW="container.md" px={{ base: 2, md: 4 }}>
            <VStack spacing={8} align="stretch">
              {/* Overview Cards - Always 2 columns */}
              <SimpleGrid
                columns={2}
                spacing={{ base: 3, md: 4 }}
                width="full"
              >
                {/* First Row */}
                <Box bg="whiteAlpha.100" p={4} borderRadius="lg">
                  <HStack spacing={2}>
                    <Target size={16} color="#CBD5E0" />
                    <Text color="gray.300" fontSize="sm">Accuracy</Text>
                  </HStack>
                  <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                    {accuracy.toFixed(1)}%
                  </Text>
                </Box>

                <Box bg="whiteAlpha.100" p={4} borderRadius="lg">
                  <HStack spacing={2}>
                    <Trophy size={16} color="#CBD5E0" />
                    <Text color="gray.300" fontSize="sm">Best Streak</Text>
                  </HStack>
                  <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                    {bestStreak}
                  </Text>
                </Box>

                {/* Second Row */}
                <Box bg="whiteAlpha.100" p={4} borderRadius="lg">
                  <HStack spacing={2}>
                    <Zap size={16} color="#CBD5E0" />
                    <Text color="gray.300" fontSize="sm">Current</Text>
                  </HStack>
                  <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                    {currentStreak}
                  </Text>
                </Box>

                <Box bg="whiteAlpha.100" p={4} borderRadius="lg">
                  <HStack spacing={2}>
                    <Clock size={16} color="#CBD5E0" />
                    <Text color="gray.300" fontSize="sm">Avg Attempts</Text>
                  </HStack>
                  <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                    {stats.averageAttempts.toFixed(1)}
                  </Text>
                </Box>
              </SimpleGrid>

              <Divider borderColor="gray.600" />

              {/* Progress Section */}
              <Box>
                <Text color="gray.300" mb={4} fontWeight="medium">Progress Overview</Text>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text color="green.400" fontSize="sm">Correct</Text>
                    <Text color="green.400" fontSize="sm">{correctCount}</Text>
                  </HStack>
                  <Progress
                    value={(correctCount / totalAttempts) * 100}
                    colorScheme="green"
                    size="sm"
                    borderRadius="full"
                  />

                  <HStack justify="space-between" mt={2}>
                    <Text color="red.400" fontSize="sm">Incorrect</Text>
                    <Text color="red.400" fontSize="sm">{incorrectCount}</Text>
                  </HStack>
                  <Progress
                    value={(incorrectCount / totalAttempts) * 100}
                    colorScheme="red"
                    size="sm"
                    borderRadius="full"
                  />
                </VStack>
              </Box>

              <Divider borderColor="gray.600" />

              {/* Common Mistakes */}
              <Box>
                <Text color="gray.300" mb={2}>Common Mistakes</Text>
                <VStack spacing={2} align="stretch">
                  {Object.entries(stats.commonMistakes)
                    .sort(([, a], [, b]) => b.count - a.count)
                    .slice(0, 5)
                    .map(([word, data]) => (
                      <Box
                        key={word}
                        bg="whiteAlpha.50"
                        p={3}
                        borderRadius="md"
                      >
                        <Flex justify="space-between" mb={2}>
                          <Text color="gray.300" fontWeight="medium">{word}</Text>
                          <Text color="red.400" fontSize="sm">
                            {data.count} {data.count === 1 ? 'time' : 'times'}
                          </Text>
                        </Flex>
                        {data.attempts && (
                          <VStack align="start" spacing={1}>
                            {data.attempts.map((attempt, index) => (
                              <Text
                                key={index}
                                color="gray.500"
                                fontSize="sm"
                                pl={2}
                              >
                                • {attempt}
                              </Text>
                            ))}
                          </VStack>
                        )}
                      </Box>
                    ))}
                </VStack>
              </Box>
            </VStack>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

StatsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    totalAttempts: PropTypes.number.isRequired,
    correctCount: PropTypes.number.isRequired,
    incorrectCount: PropTypes.number.isRequired,
    bestStreak: PropTypes.number.isRequired,
    currentStreak: PropTypes.number.isRequired,
    averageAttempts: PropTypes.number.isRequired,
    commonMistakes: PropTypes.object.isRequired
  }).isRequired
}