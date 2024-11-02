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
  Center,
  Flex
} from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { motion } from "framer-motion"

export const WordInfoModal = ({ isOpen, onClose, word, wordDetails, isLoading }) => {
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
            color="gray.100"
            borderBottom="1px solid"
            borderColor="whiteAlpha.100"
            bg="whiteAlpha.50"
            backdropFilter="blur(8px)"
            fontSize="2xl"
            py={4}
            flexShrink={0}
          >
            {word}
          </ModalHeader>
          <ModalCloseButton color="gray.400" />
          <ModalBody
            py={6}
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {isLoading ? (
              <Center py={8}>
                <VStack spacing={4}>
                  <Spinner size="xl" color="blue.400" />
                  <Text color="gray.400">Loading word details...</Text>
                </VStack>
              </Center>
            ) : wordDetails && wordDetails[0] ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VStack align="stretch" spacing={6}>
                  {/* First definition highlight */}
                  {wordDetails[0].meanings[0]?.definitions[0] && (
                    <Box
                      p={4}
                      bg="whiteAlpha.100"
                      borderRadius="lg"
                      borderWidth={1}
                      borderColor="whiteAlpha.200"
                    >
                      <Text color="gray.300" fontSize="lg" lineHeight="tall">
                        {wordDetails[0].meanings[0].definitions[0].definition}
                      </Text>
                    </Box>
                  )}

                  {/* Phonetic */}
                  {wordDetails[0].phonetic && (
                    <Flex
                      justify="center"
                      bg="whiteAlpha.50"
                      py={2}
                      px={4}
                      borderRadius="full"
                      width="fit-content"
                      mx="auto"
                    >
                      <Text color="blue.300" fontSize="md" fontFamily="mono">
                        {wordDetails[0].phonetic}
                      </Text>
                    </Flex>
                  )}

                  <Accordion
                    allowMultiple
                    defaultIndex={Array.from(
                      { length: wordDetails[0].meanings.length },
                      (_, i) => i
                    )}
                  >
                    {wordDetails[0].meanings.map((meaning, index) => (
                      <AccordionItem
                        key={index}
                        border="none"
                        mb={3}
                      >
                        <AccordionButton
                          bg="whiteAlpha.100"
                          _hover={{ bg: "whiteAlpha.200" }}
                          borderRadius="lg"
                          p={3}
                        >
                          <Badge
                            colorScheme="blue"
                            fontSize="sm"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {meaning.partOfSpeech}
                          </Badge>
                          <AccordionIcon ml="auto" color="gray.400" />
                        </AccordionButton>
                        <AccordionPanel pt={4} pb={2}>
                          <VStack align="stretch" spacing={4}>
                            {meaning.definitions.map((def, idx) => (
                              <Box
                                key={idx}
                                bg="whiteAlpha.50"
                                p={3}
                                borderRadius="md"
                              >
                                <Text color="gray.300" fontSize="sm">
                                  {def.definition}
                                </Text>
                                {def.example && (
                                  <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    mt={2}
                                    fontStyle="italic"
                                  >
                                    Example: {def.example}
                                  </Text>
                                )}
                              </Box>
                            ))}

                            <Flex gap={4} wrap="wrap">
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
                            </Flex>
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </VStack>
              </motion.div>
            ) : (
              <Center py={8}>
                <Text color="gray.400">No additional information available</Text>
              </Center>
            )}
          </ModalBody>
        </Box>
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