import PropTypes from 'prop-types'
import { VStack, Button, Flex, Text } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, RotateCcw, Info, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export const ButtonControls = ({
    onCheck,
    onPrev,
    onNext,
    onReset,
    onInfo
}) => {
    return (
        <VStack width="full" spacing={2}>
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

            <Flex width="full" gap={2} mt={2}>
                <Button
                    onClick={onPrev}
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.300"
                    title="Mac: ⌘ + P | Win: Ctrl + P"
                    flex={1}
                >
                    <ChevronLeft size={16} />
                </Button>
                <Button
                    onClick={onNext}
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.300"
                    title="Mac: ⌘ + N | Win: Ctrl + N"
                    flex={1}
                >
                    <ChevronRight size={16} />
                </Button>
                <Button
                    onClick={onReset}
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="gray.300"
                    title="Reset progress"
                    flex={1}
                >
                    <RotateCcw size={16} />
                </Button>
                <Button
                    onClick={onInfo}
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                    color="blue.300"
                    title="Word Info (Mac: ⌘ + I | Win: Ctrl + I)"
                    flex={1}
                >
                    <Info size={16} />
                </Button>
            </Flex>
        </VStack>
    )
}

ButtonControls.propTypes = {
    onCheck: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onInfo: PropTypes.func.isRequired
}