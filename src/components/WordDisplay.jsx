import PropTypes from 'prop-types'
import { Flex, Button, Tooltip, Text, Box } from "@chakra-ui/react"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export const WordDisplay = ({ word, onSpeak }) => {
    const isSpeechSupported = 'speechSynthesis' in window

    // Function to determine font size based on word length
    const getFontSize = (word) => {
        const length = word.length
        if (length > 20) {
            return ["md", "lg", "xl"]
        } else if (length > 15) {
            return ["lg", "xl", "2xl"]
        } else if (length > 10) {
            return ["xl", "2xl", "3xl"]
        }
        return ["2xl", "3xl", "4xl"] // default size for short words
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key={word.incorrect}
            style={{ width: '100%' }}
        >
            <Flex
                direction="column"
                alignItems="center"
                width="full"
                mt={{ base: 4, md: 12 }}
                mb={{ base: 4, md: 12 }}
                px={{ base: 3, md: 6 }}
            >
                <Box
                    width="full"
                    bg="whiteAlpha.100"
                    backdropFilter="blur(8px)"
                    borderRadius="xl"
                    px={6}
                    py={5}
                    position="relative"
                    borderWidth={1}
                    borderColor="whiteAlpha.200"
                    boxShadow="lg"
                >
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={3}
                    >
                        <Text
                            fontSize={getFontSize(word.incorrect)}
                            fontWeight="bold"
                            color="gray.100"
                            textAlign="center"
                            letterSpacing="wide"
                        >
                            {word.incorrect}
                        </Text>
                        <Box display="inline-block" opacity={1}>
                            <Tooltip
                                label={isSpeechSupported ?
                                    "Mac: ⌘ + L | Win: Ctrl + L" :
                                    "Speech not supported on this device"
                                }
                            >
                                <Button
                                    size={{ base: "sm", md: "md" }}
                                    variant="ghost"
                                    color="gray.300"
                                    _hover={{ color: "gray.100", bg: "whiteAlpha.200" }}
                                    onClick={() => onSpeak(word.correct)}
                                    aria-label={isSpeechSupported ?
                                        "Listen to pronunciation" :
                                        "Speech not supported"
                                    }
                                    opacity={1}
                                    minW="40px"
                                    h="40px"
                                    p={2}
                                    bg="whiteAlpha.50"
                                    _active={{ bg: "whiteAlpha.100" }}
                                    borderRadius="full"
                                >
                                    {isSpeechSupported ? (
                                        <Volume2
                                            size={20}
                                            style={{
                                                minWidth: '20px',
                                                minHeight: '20px',
                                                opacity: 1
                                            }}
                                        />
                                    ) : (
                                        <VolumeX
                                            size={20}
                                            style={{
                                                minWidth: '20px',
                                                minHeight: '20px',
                                                opacity: 1
                                            }}
                                        />
                                    )}
                                </Button>
                            </Tooltip>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </motion.div>
    )
}

WordDisplay.propTypes = {
    word: PropTypes.shape({
        correct: PropTypes.string.isRequired,
        incorrect: PropTypes.string.isRequired
    }).isRequired,
    onSpeak: PropTypes.func.isRequired
}