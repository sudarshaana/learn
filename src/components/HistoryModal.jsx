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
  Badge,
  Flex
} from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

export const HistoryModal = ({ isOpen, onClose, history }) => {
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
            bgGradient="linear(to-r, purple.400, pink.400)"
            color="white"
            fontSize="2xl"
            py={4}
            flexShrink={0}
            textAlign="center"
            letterSpacing="wide"
          >
            History
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
              <VStack spacing={4} align="stretch">
                {history.length === 0 ? (
                  <Text color="gray.400" textAlign="center">No history yet</Text>
                ) : (
                  history.map((item, index) => (
                    <Box
                      key={index}
                      bg="whiteAlpha.50"
                      borderRadius="lg"
                      p={4}
                      borderWidth={1}
                      borderColor="whiteAlpha.100"
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text
                          color="gray.100"
                          fontSize="lg"
                          fontWeight="bold"
                        >
                          {item.word}
                        </Text>
                        {item.isCorrect ? (
                          <Badge colorScheme="green" variant="subtle">
                            Correct
                          </Badge>
                        ) : (
                          <Badge colorScheme="red" variant="subtle">
                            Incorrect
                          </Badge>
                        )}
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <Text color="gray.400" fontSize="sm">
                          Attempt: {item.attempt}
                        </Text>
                        <Text color="gray.500" fontSize="xs">
                          {format(item.timestamp, 'MMM d, h:mm a')}
                        </Text>
                      </Flex>
                    </Box>
                  ))
                )}
              </VStack>
            </motion.div>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}

HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      attempt: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ).isRequired
}