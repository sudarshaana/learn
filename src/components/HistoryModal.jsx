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
  Container,
  Divider,
  HStack
} from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { CheckCircle, XCircle } from "lucide-react"

export const HistoryModal = ({ isOpen, onClose, history }) => {
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
          History
        </ModalHeader>
        <ModalCloseButton color="gray.400" />
        <ModalBody py={6}>
          <Container maxW="container.md" px={{ base: 2, md: 4 }}>
            <VStack spacing={4} align="stretch">
              {history.length === 0 ? (
                <Text color="gray.400" textAlign="center">No history yet</Text>
              ) : (
                history.map((item, index) => (
                  <Box key={index}>
                    <HStack
                      justify="space-between"
                      bg="whiteAlpha.50"
                      p={3}
                      borderRadius="md"
                    >
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text color="gray.300" fontWeight="medium">
                            {item.word}
                          </Text>
                          {item.isCorrect ? (
                            <CheckCircle size={16} color="var(--chakra-colors-green-400)" />
                          ) : (
                            <XCircle size={16} color="var(--chakra-colors-red-400)" />
                          )}
                        </HStack>
                        <Text color="gray.500" fontSize="sm">
                          Attempt: {item.attempt}
                        </Text>
                      </VStack>
                      <Text color="gray.500" fontSize="xs">
                        {format(item.timestamp, 'MMM d, h:mm a')}
                      </Text>
                    </HStack>
                    {index < history.length - 1 && (
                      <Divider borderColor="gray.700" my={2} />
                    )}
                  </Box>
                ))
              )}
            </VStack>
          </Container>
        </ModalBody>
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