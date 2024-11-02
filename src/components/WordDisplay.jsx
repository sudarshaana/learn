import PropTypes from 'prop-types'
import { Flex, Button, Tooltip, Box } from "@chakra-ui/react"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export const WordDisplay = ({ word, onSpeak }) => {
    const isSpeechSupported = 'speechSynthesis' in window

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key={word.incorrect}
        >
            <Flex
                fontSize={["xl", "2xl", "3xl"]}
                fontWeight="bold"
                textAlign="center"
                color="gray.100"
                wordBreak="break-word"
                px={2}
                mt={{ base: 4, md: 12 }}
                mb={{ base: 4, md: 12 }}
                alignItems="center"
                justifyContent="center"
                gap={3}
                minHeight={{ base: "80px", md: "120px" }}
            >
                {word.incorrect}
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
                            _hover={{ color: "gray.100" }}
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