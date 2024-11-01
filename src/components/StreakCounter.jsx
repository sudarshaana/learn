import PropTypes from 'prop-types'
import { Flex, Text, Icon, HStack } from "@chakra-ui/react"
import { Flame, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const StreakCounter = ({ streak, bestStreak }) => {
  return (
    <HStack spacing={4} align="center">
      <Flex
        align="center"
        gap={2}
        bg="orange.900"
        px={3}
        py={1}
        borderRadius="full"
        opacity={streak > 0 ? 1 : 0.5}
        position="relative"
      >
        <Icon as={Flame} color="orange.400" />
        <Text color="orange.100" fontSize="sm" fontWeight="bold">
          {streak}
        </Text>

        <AnimatePresence>
          {streak > 0 && (
            <motion.div
              key={streak}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], y: -20, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'absolute',
                right: -20,
                color: '#F6AD55',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              +1
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>

      <Flex
        align="center"
        gap={2}
        bg="yellow.900"
        px={3}
        py={1}
        borderRadius="full"
        opacity={bestStreak > 0 ? 1 : 0.5}
      >
        <Icon as={Trophy} color="yellow.400" />
        <Text color="yellow.100" fontSize="sm" fontWeight="bold">
          {bestStreak}
        </Text>
      </Flex>
    </HStack>
  )
}

StreakCounter.propTypes = {
  streak: PropTypes.number.isRequired,
  bestStreak: PropTypes.number.isRequired
}