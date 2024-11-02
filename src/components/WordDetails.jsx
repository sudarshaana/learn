import PropTypes from 'prop-types'
import { Box, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"

export const WordDetails = ({ wordData }) => {
  if (!wordData || !wordData[0]) return null

  const data = wordData[0]

  return (
    <Box
      width="full"
      bg="whiteAlpha.100"
      backdropFilter="blur(8px)"
      borderRadius="xl"
      p={4}
      borderWidth={1}
      borderColor="whiteAlpha.200"
      mt={4}
    >
      <VStack align="stretch" spacing={3}>
        {data.phonetic && (
          <Text color="gray.400" fontSize="sm" textAlign="center">
            Pronunciation: {data.phonetic}
          </Text>
        )}

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
                <Box flex="1" textAlign="left" color="gray.300">
                  {meaning.partOfSpeech}
                </Box>
                <AccordionIcon color="gray.300" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={2}>
                  {meaning.definitions.map((def, idx) => (
                    <Box key={idx}>
                      <Text color="gray.300" fontSize="sm">
                        • {def.definition}
                      </Text>
                      {def.example && (
                        <Text color="gray.500" fontSize="xs" pl={4} mt={1}>
                          Example: "{def.example}"
                        </Text>
                      )}
                    </Box>
                  ))}
                  {meaning.synonyms.length > 0 && (
                    <Text color="gray.400" fontSize="xs" mt={2}>
                      Synonyms: {meaning.synonyms.join(", ")}
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

WordDetails.propTypes = {
  wordData: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    phonetic: PropTypes.string,
    meanings: PropTypes.arrayOf(PropTypes.shape({
      partOfSpeech: PropTypes.string.isRequired,
      definitions: PropTypes.arrayOf(PropTypes.shape({
        definition: PropTypes.string.isRequired,
        example: PropTypes.string
      })).isRequired,
      synonyms: PropTypes.arrayOf(PropTypes.string)
    })).isRequired
  }))
}