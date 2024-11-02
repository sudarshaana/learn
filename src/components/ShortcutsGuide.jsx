import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Tbody,
  Tr,
  Td,
  Badge
} from "@chakra-ui/react"

export const ShortcutsGuide = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: '⌘/Ctrl + ArrowRight', description: 'Next word' },
    { key: '⌘/Ctrl + ArrowLeft', description: 'Previous word' },
    { key: '⌘/Ctrl + O', description: 'Show/Hide answer' },
    { key: '⌘/Ctrl + H', description: 'Show history' },
    { key: '⌘/Ctrl + L', description: 'Listen to pronunciation' },
    { key: '⌘/Ctrl + U', description: 'Toggle Random Mode' },
    { key: 'Enter', description: 'Check answer' },
    { key: 'Esc', description: 'Close modals' }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader color="gray.100">Keyboard Shortcuts</ModalHeader>
        <ModalCloseButton color="gray.400" />
        <ModalBody pb={6}>
          <Table variant="simple">
            <Tbody>
              {shortcuts.map(({ key, description }) => (
                <Tr key={key}>
                  <Td><Badge colorScheme="blue">{key}</Badge></Td>
                  <Td color="gray.300">{description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}