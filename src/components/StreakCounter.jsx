import { Flex, Text, Icon } from "@chakra-ui/react"
import { Flame } from "lucide-react"

export const StreakCounter = ({ streak }) => {
  return (
    <Flex
      align="center"
      gap={2}
      bg="orange.900"
      px={3}
      py={1}
      borderRadius="full"
      opacity={streak > 0 ? 1 : 0.5}
    >
      <Icon as={Flame} color="orange.400" />
      <Text color="orange.100" fontSize="sm" fontWeight="bold">
        {streak}
      </Text>
    </Flex>
  )
}