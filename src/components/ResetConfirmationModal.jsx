import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  VStack,
  UnorderedList,
  ListItem
} from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { AlertTriangle } from "lucide-react"

export const ResetConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "md" }}
      isCentered
    >
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent
        bg="transparent"
        mx={{ base: 0, md: 4 }}
        my={{ base: 0, md: 4 }}
        boxShadow="none"
      >
        <Box
          bgGradient="linear(to-br, gray.800, gray.900)"
          borderRadius="xl"
          overflow="hidden"
          borderWidth={1}
          borderColor="whiteAlpha.200"
        >
          <ModalHeader
            bgGradient="linear(to-r, red.500, orange.500)"
            color="white"
            fontSize="xl"
            py={4}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <AlertTriangle size={20} />
            Reset Progress
          </ModalHeader>

          <ModalBody py={6}>
            <VStack align="stretch" spacing={4}>
              <Text color="gray.300">
                Are you sure you want to reset? This will clear:
              </Text>
              <UnorderedList spacing={2} color="gray.300" pl={4}>
                <ListItem>Current progress</ListItem>
                <ListItem>Correct/Incorrect counts</ListItem>
                <ListItem>Current streak</ListItem>
                <ListItem>Best streak</ListItem>
                <ListItem>Word history</ListItem>
                <ListItem>Common mistakes</ListItem>
              </UnorderedList>
              <Text color="red.400" fontSize="sm">
                This action cannot be undone.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            gap={3}
          >
            <Button
              onClick={onClose}
              variant="ghost"
              color="gray.400"
              _hover={{ bg: "whiteAlpha.100" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              bg="red.500"
              _hover={{ bg: "red.600" }}
              color="white"
            >
              Reset Everything
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}

ResetConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}