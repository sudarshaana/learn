import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Spinner,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Center
} from "@chakra-ui/react"
import PropTypes from 'prop-types'

export const WordInfoModal = ({ isOpen, onClose, word, wordDetails, isLoading }) => {
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
      >
        <ModalHeader
          color="gray.100"
          borderBottom="1px solid"
          borderColor="gray.700"
        >
          Word Details: {word}
        </ModalHeader>
        <ModalCloseButton color="gray.400" />
        <ModalBody py={6}>
          {isLoading ? (
            <Center py={8}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.400" />
                <Text color="gray.400">Loading word details...</Text>
              </VStack>
            </Center>
          ) : wordDetails && wordDetails[0] ? (
            <VStack align="stretch" spacing={4}>
              {wordDetails[0].phonetic && (
                <Box
                  p={3}
                  bg="whiteAlpha.50"
                  borderRadius="md"
                  textAlign="center"
                >
                  <Text color="gray.300">
                    {wordDetails[0].phonetic}
                  </Text>
                </Box>
              )}

              <Accordion allowMultiple>
                {wordDetails[0].meanings.map((meaning, index) => (
                  <AccordionItem
                    key={index}
                    border="none"
                    mb={2}
                  >
                    <AccordionButton
                      bg="whiteAlpha.50"
                      _hover={{ bg: "whiteAlpha.100" }}
                      borderRadius="md"
                    >
                      <Badge colorScheme="blue">
                        {meaning.partOfSpeech}
                      </Badge>
                      <AccordionIcon ml="auto" />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <VStack align="stretch" spacing={3}>
                        {meaning.definitions.map((def, idx) => (
                          <Box key={idx}>
                            <Text color="gray.300" fontSize="sm">
                              • {def.definition}
                            </Text>
                            {def.example && (
                              <Text color="gray.500" fontSize="sm" pl={4} mt={1}>
                                "{def.example}"
                              </Text>
                            )}
                          </Box>
                        ))}
                        {meaning.synonyms.length > 0 && (
                          <Text color="green.400" fontSize="sm">
                            Synonyms: {meaning.synonyms.slice(0, 5).join(", ")}
                          </Text>
                        )}
                        {meaning.antonyms.length > 0 && (
                          <Text color="red.400" fontSize="sm">
                            Antonyms: {meaning.antonyms.slice(0, 5).join(", ")}
                          </Text>
                        )}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          ) : (
            <Center py={8}>
              <Text color="gray.400">No additional information available</Text>
            </Center>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

WordInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
  wordDetails: PropTypes.array,
  isLoading: PropTypes.bool
}