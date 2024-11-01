import PropTypes from 'prop-types'
import { Flex, Button, Tooltip } from "@chakra-ui/react"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export const WordDisplay = ({ word, onSpeak, isSpeechSupported }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={word.incorrect}
    >
      <Flex
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        textAlign="center"
        color="gray.100"
        wordBreak="break-word"
        px={2}
        mt={2}
        mb={2}
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        {word.incorrect}
        <Tooltip
          label={isSpeechSupported ?
            "Mac: ⌘ + L | Win: Ctrl + L" :
            "Speech not supported on this device"
          }
        >
          <Button
            size="sm"
            variant="ghost"
            color="gray.300"
            _hover={{ color: "gray.100" }}
            onClick={() => onSpeak(word.correct)}
            aria-label={isSpeechSupported ?
              "Listen to pronunciation" :
              "Speech not supported"
            }
          >
            {isSpeechSupported ? (
              <Volume2 size={20} />
            ) : (
              <VolumeX size={20} />
            )}
          </Button>
        </Tooltip>
      </Flex>
    </motion.div>
  )
}

WordDisplay.propTypes = {
  word: PropTypes.shape({
    correct: PropTypes.string.isRequired,
    incorrect: PropTypes.string.isRequired
  }).isRequired,
  onSpeak: PropTypes.func.isRequired,
  isSpeechSupported: PropTypes.bool
}

WordDisplay.defaultProps = {
  isSpeechSupported: true
}