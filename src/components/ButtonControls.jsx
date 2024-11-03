import { Button, HStack, VStack, Text } from "@chakra-ui/react"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Info } from "lucide-react"
import PropTypes from 'prop-types'
import { motion } from "framer-motion"

export const ButtonControls = ({
  onCheck,
  onPrev,
  onNext,
  showCorrectWord,
  onToggleAnswer,
  onInfo,
}) => {
  return (
    <VStack spacing={2} width="full">
      {/* <Button
        onClick={onCheck}
        colorScheme="blue"
        width="full"
        title="Check Answer (Enter)"
        aria-label="Check Answer"
        size="lg"
      >
        <Check size={20} />
      </Button> */}
      <motion.div
                style={{ width: '100%' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Button
                    onClick={onCheck}
                    width="full"
                    height="50px"
                    fontSize="lg"
                    bgGradient="linear(to-r, teal.600, cyan.600)"
                    _hover={{
                        bgGradient: "linear(to-r, teal.500, cyan.500)",
                        transform: "translateY(-2px)",
                        boxShadow: "lg"
                    }}
                    _active={{
                        bgGradient: "linear(to-r, teal.700, cyan.700)",
                        transform: "translateY(0)",
                        boxShadow: "md"
                    }}
                    color="gray.100"
                    borderRadius="lg"
                    boxShadow="md"
                    transition="all 0.2s"
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    opacity={0.9}
                >
                    <Text>Check</Text>
                    <ArrowRight size={20} />
                </Button>
            </motion.div>

      <HStack spacing={2} width="full" mt={2}>
        <Button
          onClick={onPrev}
          flex={1}
          title="Previous Word (Mac: ⌘ + ← | Win: Ctrl + ←)"
          aria-label="Previous Word"
        >
          <ArrowLeft size={20} />
        </Button>



        <Button
          onClick={onNext}
          flex={1}
          title="Next Word (Mac: ⌘ + → | Win: Ctrl + →)"
          aria-label="Next Word"
        >
          <ArrowRight size={20} />
        </Button>

        <Button
          onClick={onToggleAnswer}
          flex={1}
          title={showCorrectWord ? "Hide Answer ⌘ + o" : "Show Answer"}
          aria-label={showCorrectWord ? "Hide Answer" : "Show Answer"}
        >
          {showCorrectWord ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>

        <Button
          onClick={onInfo}
          flex={1}
          title="Next Word (Mac: ⌘ + i | Win: Ctrl + i)"
          aria-label="Word Info"
        >
          <Info size={20} />
        </Button>
      </HStack>
    </VStack>
  )
}

ButtonControls.propTypes = {
  onCheck: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  showCorrectWord: PropTypes.bool.isRequired,
  onToggleAnswer: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
}