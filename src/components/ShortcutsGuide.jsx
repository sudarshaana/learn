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
  Box,
  Divider,
  VStack,
  HStack,
  Text
} from "@chakra-ui/react"
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Info,
  Shuffle,
  History,
  BarChart2,
  Book,
  RotateCcw,
  HelpCircle
} from "lucide-react"
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

  const buttonHelp = [
    { icon: <ChevronLeft size={16} />, color: "gray.300", description: "Go to previous word" },
    { icon: <ChevronRight size={16} />, color: "gray.300", description: "Go to next word" },
    { icon: <Eye size={16} />, color: "green.400", description: "Show/Hide the correct spelling" },
    { icon: <Info size={16} />, color: "blue.300", description: "View word details and meanings" },
    { icon: <Shuffle size={16} />, color: "yellow.400", description: "Toggle random word order" },
    { icon: <History size={16} />, color: "purple.500", description: "View your attempt history" },
    { icon: <BarChart2 size={16} />, color: "blue.500", description: "View your statistics" },
    { icon: <Book size={16} />, color: "teal.500", description: "Select word set" },
    { icon: <RotateCcw size={16} />, color: "red.400", description: "Reset all progress" },
    { icon: <HelpCircle size={16} />, color: "gray.500", description: "Show this help guide" }
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
            Help Guide
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
              <VStack spacing={6} align="stretch">
                {/* Button Icons Section */}
                <Box>
                  <Text
                    color="gray.300"
                    fontSize="lg"
                    fontWeight="medium"
                    mb={4}
                  >
                    Button Guide
                  </Text>
                  <VStack spacing={3} align="stretch">
                    {buttonHelp.map((item, index) => (
                      <Box
                        key={index}
                        bg="whiteAlpha.50"
                        p={3}
                        borderRadius="md"
                      >
                        <HStack spacing={3}>
                          <Box
                            bg="whiteAlpha.100"
                            p={2}
                            borderRadius="md"
                            color={item.color}
                          >
                            {item.icon}
                          </Box>
                          <Text color="gray.300" fontSize="sm">
                            {item.description}
                          </Text>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                <Divider borderColor="gray.700" />

                {/* Keyboard Shortcuts Section */}
                <Box>
                  <Text
                    color="gray.300"
                    fontSize="lg"
                    fontWeight="medium"
                    mb={4}
                  >
                    Keyboard Shortcuts
                  </Text>
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
                </Box>
              </VStack>
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