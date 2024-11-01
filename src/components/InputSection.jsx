import PropTypes from 'prop-types'
import { Flex, Input, Box } from "@chakra-ui/react"
import { CheckCircle, XCircle } from "lucide-react"

export const InputSection = ({
  userInput,
  onInputChange,
  onKeyDown,
  isCorrect
}) => {
  return (
    <Flex width="full" position="relative" alignItems="center" gap={4}>
      <Input
        placeholder="Type the correct spelling"
        value={userInput}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        aria-label="Enter correct spelling"
        bg="gray.800"
        mb={2}
        borderColor="gray.700"
        color="gray.100"
        textAlign="center"
        _placeholder={{ color: "gray.400" }}
        _focus={{ borderColor: "indigo.600" }}
      />
      {isCorrect !== null && (
        <Box
          minWidth="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isCorrect ? (
            <CheckCircle color="green" size={24} aria-label="Correct" />
          ) : (
            <XCircle color="red" size={24} aria-label="Incorrect" />
          )}
        </Box>
      )}
    </Flex>
  )
}

InputSection.propTypes = {
  userInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool
}