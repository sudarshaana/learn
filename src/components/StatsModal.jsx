import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Box,
  SimpleGrid,
  Flex,
  Badge
} from "@chakra-ui/react"
import { Trophy, Target, Clock, Zap } from "lucide-react"
import PropTypes from 'prop-types'
import { motion } from "framer-motion"

export const StatsModal = ({ isOpen, onClose, stats }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "2xl" }}
      isCentered
    >
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent
        bg="transparent"
        mx={{ base: 0, md: 4 }}
        my={{ base: 0, md: 4 }}
        boxShadow="none"
        maxHeight={{ base: "100vh", md: "90vh" }}
        display="flex"
        flexDirection="column"
      >
        <Box
          bgGradient="linear(to-br, gray.800, gray.900)"
          borderRadius="xl"
          overflow="hidden"
          borderWidth={1}
          borderColor="whiteAlpha.200"
          flex={1}
          display="flex"
          flexDirection="column"
        >
          <ModalHeader
            bgGradient="linear(to-r, green.400, teal.400)"
            color="white"
            fontSize="2xl"
            py={4}
            flexShrink={0}
            textAlign="center"
            letterSpacing="wide"
          >
            Statistics
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody
            py={6}
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VStack spacing={6}>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} width="full">
                  <Box
                    bg="whiteAlpha.100"
                    p={4}
                    borderRadius="lg"
                    borderWidth={1}
                    borderColor="whiteAlpha.200"
                  >
                    <Flex align="center" gap={2} mb={2}>
                      <Target size={16} color="var(--chakra-colors-blue-400)" />
                      <Text color="gray.400" fontSize="sm">Accuracy</Text>
                    </Flex>
                    <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                      {((stats.correctCount / stats.totalAttempts) * 100 || 0).toFixed(1)}%
                    </Text>
                  </Box>

                  <Box
                    bg="whiteAlpha.100"
                    p={4}
                    borderRadius="lg"
                    borderWidth={1}
                    borderColor="whiteAlpha.200"
                  >
                    <Flex align="center" gap={2} mb={2}>
                      <Trophy size={16} color="var(--chakra-colors-yellow-400)" />
                      <Text color="gray.400" fontSize="sm">Best Streak</Text>
                    </Flex>
                    <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                      {stats.bestStreak}
                    </Text>
                  </Box>

                  <Box
                    bg="whiteAlpha.100"
                    p={4}
                    borderRadius="lg"
                    borderWidth={1}
                    borderColor="whiteAlpha.200"
                  >
                    <Flex align="center" gap={2} mb={2}>
                      <Zap size={16} color="var(--chakra-colors-orange-400)" />
                      <Text color="gray.400" fontSize="sm">Current</Text>
                    </Flex>
                    <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                      {stats.currentStreak}
                    </Text>
                  </Box>

                  <Box
                    bg="whiteAlpha.100"
                    p={4}
                    borderRadius="lg"
                    borderWidth={1}
                    borderColor="whiteAlpha.200"
                  >
                    <Flex align="center" gap={2} mb={2}>
                      <Clock size={16} color="var(--chakra-colors-purple-400)" />
                      <Text color="gray.400" fontSize="sm">Avg Attempts</Text>
                    </Flex>
                    <Text color="gray.100" fontSize="2xl" fontWeight="bold">
                      {stats.averageAttempts.toFixed(1)}
                    </Text>
                  </Box>
                </SimpleGrid>

                <Box
                  bg="whiteAlpha.50"
                  p={4}
                  borderRadius="lg"
                  width="full"
                  borderWidth={1}
                  borderColor="whiteAlpha.100"
                >
                  <Text color="gray.300" mb={4} fontWeight="medium">Common Mistakes</Text>
                  <VStack spacing={3} align="stretch">
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
                            <Badge colorScheme="red" variant="subtle">
                              {data.count} times
                            </Badge>
                          </Flex>
                          <VStack align="start" spacing={1}>
                            {data.attempts.map((attempt, idx) => (
                              <Text
                                key={idx}
                                color="gray.500"
                                fontSize="sm"
                                pl={2}
                              >
                                • {attempt}
                              </Text>
                            ))}
                          </VStack>
                        </Box>
                      ))}
                  </VStack>
                </Box>
              </VStack>
            </motion.div>
          </ModalBody>
        </Box>
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