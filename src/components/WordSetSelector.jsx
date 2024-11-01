import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Text
} from "@chakra-ui/react"
import { Book } from "lucide-react"
import PropTypes from 'prop-types'
import { wordSets } from '../data/wordSets'

export const WordSetSelector = ({ isOpen, onClose, onSelect, currentSetId, hideCloseButton }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!hideCloseButton}
      closeOnEsc={!hideCloseButton}
    >
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader color="gray.100">
          {hideCloseButton ? 'Select a Word Set to Begin' : 'Select Word Set'}
        </ModalHeader>
        {!hideCloseButton && <ModalCloseButton color="gray.400" />}
        <ModalBody pb={6}>
          <VStack spacing={3} align="stretch">
            {wordSets.map((set) => (
              <Button
                key={set.id}
                onClick={() => onSelect(set)}
                variant="outline"
                colorScheme={currentSetId === set.id ? "blue" : "gray"}
                justifyContent="flex-start"
                height="auto"
                py={3}
                px={4}
              >
                <VStack align="start" spacing={1}>
                  <Text>{set.name}</Text>
                  {currentSetId === set.id && (
                    <Text fontSize="xs" color="blue.200">Currently Selected</Text>
                  )}
                </VStack>
              </Button>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

WordSetSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentSetId: PropTypes.string,
  hideCloseButton: PropTypes.bool
}