import PropTypes from 'prop-types'
import { VStack, Button, Flex, Box } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRight } from "lucide-react"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from 'react'

export const ButtonControls = ({
    onCheck,
    onPrev,
    onNext,
    onReset,
    isEnterPressed
}) => {
    const controls = useAnimationControls()

    useEffect(() => {
        if (isEnterPressed) {
            controls.start({
                scale: [1, 0.95, 1],
                transition: { duration: 0.2 }
            })
        }
    }, [isEnterPressed, controls])

    return (
        <VStack width="full" spacing={2}>
            <motion.div
                style={{ width: '100%' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={controls}
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
                    <Box>Check</Box>
                    <ArrowRight size={20} />
                </Button>
            </motion.div>

            <Flex width="full" gap={2} mt={2}>
                <Button
                    onClick={onPrev}
                    _hover={{ bg: "gray.700" }}
                    color="gray.300"
                    title="Mac: ⌘ + P | Win: Ctrl + P"
                    flex={1}
                    opacity={0.9}
                >
                    <ChevronLeft size={16} />
                </Button>
                <Button
                    onClick={onNext}
                    _hover={{ bg: "gray.700" }}
                    color="gray.300"
                    title="Mac: ⌘ + N | Win: Ctrl + N"
                    flex={1}
                    opacity={0.9}
                >
                    <ChevronRight size={16} />
                </Button>
                <Button
                    onClick={onReset}
                    _hover={{ bg: "gray.700" }}
                    color="gray.300"
                    aria-label="Reset everything"
                    title="Reset progress"
                    flex={1}
                    opacity={0.9}
                >
                    <RotateCcw size={16} />
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
    isEnterPressed: PropTypes.bool
}

ButtonControls.defaultProps = {
    isEnterPressed: false
}