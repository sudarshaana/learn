import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Text,
  Box,
  Flex
} from "@chakra-ui/react"
import { Check } from "lucide-react"
import PropTypes from 'prop-types'
import { wordSets } from '../data/wordSets'
import { motion } from "framer-motion"

export const WordSetSelector = ({ isOpen, onClose, onSelect, currentSetId, hideCloseButton }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "2xl" }}
      isCentered
      closeOnOverlayClick={!hideCloseButton}
      closeOnEsc={!hideCloseButton}
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
            bgGradient="linear(to-r, teal.400, cyan.400)"
            color="white"
            fontSize="2xl"
            py={4}
            flexShrink={0}
            textAlign="center"
            letterSpacing="wide"
          >
            {hideCloseButton ? 'Select a Word Set to Begin' : 'Select Word Set'}
          </ModalHeader>
          {!hideCloseButton && <ModalCloseButton color="white" />}
          <ModalBody py={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VStack spacing={3} align="stretch">
                {wordSets.map((set) => (
                  <Button
                    key={set.id}
                    onClick={() => onSelect(set)}
                    variant="unstyled"
                    height="auto"
                    p={0}
                  >
                    <Box
                      bg="whiteAlpha.100"
                      p={4}
                      borderRadius="lg"
                      borderWidth={1}
                      borderColor={currentSetId === set.id ? "blue.500" : "whiteAlpha.200"}
                      _hover={{ bg: "whiteAlpha.200" }}
                      transition="all 0.2s"
                    >
                      <Flex direction="column" align="flex-start">
                        <Text
                          color="gray.100"
                          fontSize="lg"
                          fontWeight="medium"
                          whiteSpace="normal"
                          textAlign="left"
                        >
                          {set.name}
                        </Text>
                        <Text
                          color={currentSetId === set.id ? "green.400" : "gray.400"}
                          fontSize="sm"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mt={2}
                        >
                          {currentSetId === set.id ? (
                            <>
                              <Check size={14} />
                              Currently Selected
                            </>
                          ) : (
                            'Click to select this word set'
                          )}
                        </Text>
                      </Flex>
                    </Box>
                  </Button>
                ))}
              </VStack>
            </motion.div>
          </ModalBody>
        </Box>
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