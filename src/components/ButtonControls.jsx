import PropTypes from 'prop-types'
import { VStack, Button, Flex } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

export const ButtonControls = ({
    onCheck,
    onPrev,
    onNext,
    onReset
}) => {
    return (
        <VStack width="full" spacing={2}>
            <Button
                onClick={onCheck}
                width="full"
                bg="green.700"
                _hover={{ bg: "gray.500" }}
                color="gray.300"
            >
                Check
            </Button>
            <Flex width="full" gap={2} mt={2}>
                <Button
                    onClick={onPrev}
                    _hover={{ bg: "green.600" }}
                    color="gray.100"
                    title="Mac: ⌘ + P | Win: Ctrl + P"
                    flex={1}
                >
                    <ChevronLeft size={16} />
                </Button>
                <Button
                    onClick={onNext}
                    _hover={{ bg: "green.600" }}
                    color="gray.100"
                    title="Mac: ⌘ + N | Win: Ctrl + N"
                    flex={1}
                >
                    <ChevronRight size={16} />
                </Button>
                <Button
                    onClick={onReset}
                    _hover={{ bg: "yellow.600" }}
                    color="yellow.100"
                    aria-label="Reset everything"
                    title="Reset progress"
                    flex={1}
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
    onReset: PropTypes.func.isRequired
}