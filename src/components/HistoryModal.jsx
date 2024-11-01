import PropTypes from 'prop-types'
import { Box, Button, VStack, Heading, Flex, Text } from "@chakra-ui/react"
import { CheckCircle, XCircle, X } from "lucide-react"

export const HistoryModal = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      onClick={onClose}
    >
      <Box
        bg="gray.800"
        borderRadius="lg"
        p={6}
        maxHeight="80vh"
        maxWidth="500px"
        width="90%"
        overflowY="auto"
        borderWidth={1}
        borderColor="gray.700"
        boxShadow="dark-lg"
        position="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          position="absolute"
          right={2}
          top={2}
          size="sm"
          variant="ghost"
          color="gray.400"
          _hover={{ bg: "gray.700" }}
          onClick={onClose}
        >
          <X size={20} />
        </Button>

        <VStack spacing={4} align="stretch" pt={2}>
          <Heading size="md" color="gray.100" mb={2}>Attempt History</Heading>
          {history.map((item) => (
            <Flex
              key={item.timestamp}
              justify="space-between"
              align="center"
              p={3}
              bg="gray.900"
              borderRadius="md"
            >
              <VStack align="start" spacing={1}>
                <Text color="gray.100">{item.word}</Text>
                <Text color="gray.400" fontSize="sm">
                  Attempt: {item.attempt}
                </Text>
                <Text color="gray.500" fontSize="xs">
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
              </VStack>
              {item.isCorrect ? (
                <CheckCircle color="green" size={20} />
              ) : (
                <XCircle color="red" size={20} />
              )}
            </Flex>
          ))}
          {history.length === 0 && (
            <Text color="gray.400" textAlign="center">
              No attempts yet
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    attempt: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired
  })).isRequired
}