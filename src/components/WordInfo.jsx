import PropTypes from 'prop-types'
import { Box, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Badge } from "@chakra-ui/react"

export const WordInfo = ({ wordDetails, isLoading }) => {
  if (isLoading || !wordDetails?.[0]) return null

  const data = wordDetails[0]

  return (
    <Box
      width="full"
      bg="whiteAlpha.50"
      backdropFilter="blur(8px)"
      borderRadius="lg"
      p={4}
      mt={4}
      borderWidth={1}
      borderColor="whiteAlpha.100"
    >
      <VStack align="stretch" spacing={3}>
        {/* Pronunciation */}
        {data.phonetic && (
          <Text color="gray.400" fontSize="sm" textAlign="center">
            {data.phonetic}
          </Text>
        )}

        {/* Meanings */}
        <Accordion allowMultiple size="sm">
          {data.meanings.map((meaning, index) => (
            <AccordionItem
              key={index}
              border="none"
              mb={2}
            >
              <AccordionButton
                bg="whiteAlpha.100"
                _hover={{ bg: "whiteAlpha.200" }}
                borderRadius="md"
              >
                <Badge colorScheme="blue" fontSize="xs">
                  {meaning.partOfSpeech}
                </Badge>
                <AccordionIcon ml="auto" color="gray.400" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={2}>
                  {/* Definitions */}
                  {meaning.definitions.map((def, idx) => (
                    <Box key={idx}>
                      <Text color="gray.300" fontSize="sm">
                        • {def.definition}
                      </Text>
                      {def.example && (
                        <Text color="gray.500" fontSize="xs" pl={4} mt={1}>
                          "{def.example}"
                        </Text>
                      )}
                    </Box>
                  ))}

                  {/* Synonyms */}
                  {meaning.synonyms.length > 0 && (
                    <Text color="green.400" fontSize="xs">
                      Synonyms: {meaning.synonyms.slice(0, 5).join(", ")}
                    </Text>
                  )}

                  {/* Antonyms */}
                  {meaning.antonyms.length > 0 && (
                    <Text color="red.400" fontSize="xs">
                      Antonyms: {meaning.antonyms.slice(0, 5).join(", ")}
                    </Text>
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  )
}

WordInfo.propTypes = {
  wordDetails: PropTypes.array,
  isLoading: PropTypes.bool
}