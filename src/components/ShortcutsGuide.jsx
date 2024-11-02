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
  Badge,
  Box
} from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { motion } from "framer-motion"

export const ShortcutsGuide = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: '⌘/Ctrl + N', description: 'Next word' },
    { key: '⌘/Ctrl + P', description: 'Previous word' },
    { key: '⌘/Ctrl + O', description: 'Show/Hide answer' },
    { key: '⌘/Ctrl + H', description: 'Show history' },
    { key: '⌘/Ctrl + L', description: 'Listen to pronunciation' },
    { key: '⌘/Ctrl + U', description: 'Toggle Random Mode' },
    { key: 'Enter', description: 'Check answer' },
    { key: 'Esc', description: 'Close modals' }
  ]

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
            bgGradient="linear(to-r, cyan.400, blue.400)"
            color="white"
            fontSize="2xl"
            py={4}
            flexShrink={0}
            textAlign="center"
            letterSpacing="wide"
          >
            Keyboard Shortcuts
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
              <Table variant="simple">
                <Tbody>
                  {shortcuts.map(({ key, description }) => (
                    <Tr key={key}>
                      <Td border="none" py={3}>
                        <Badge
                          colorScheme="blue"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="sm"
                        >
                          {key}
                        </Badge>
                      </Td>
                      <Td
                        border="none"
                        color="gray.300"
                        fontSize="sm"
                      >
                        {description}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </motion.div>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}

ShortcutsGuide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}