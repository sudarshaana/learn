import { Box, Progress, Text } from "@chakra-ui/react"

export const ProgressBar = ({ current, total }) => {
    const progress = (current / total) * 100

    return (
        <Box width="full" pl={2} pe={2}>
            <Progress
                value={progress}
                colorScheme="blue"
                height="2px"
                bg="gray.700"
                borderRadius="full"
            />
            {/* <Text color="gray.400" fontSize="xs" mt={1} textAlign="right">
                {Math.round(progress)}%
            </Text> */}
        </Box>
    )
}