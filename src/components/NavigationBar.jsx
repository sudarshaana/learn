import { Button, Flex } from "@chakra-ui/react"
import { Shuffle, History, BarChart2, Book, RotateCcw, HelpCircle } from "lucide-react"
import PropTypes from 'prop-types'

export const NavigationBar = ({
  isRandomMode,
  onShuffle,
  onHistory,
  onStats,
  onWordList,
  onReset,
  onHelp,
}) => {
  return (
    <Flex
      position={{ base: "relative", md: "absolute" }}
      bottom={{ base: "auto", md: "-70px" }}
      left="50%"
      transform="translateX(-50%)"
      mt={{ base: 4, md: 8 }}
      mb={{ base: 2, md: 0 }}
      alignItems="center"
      width={{ base: "full", md: "100%" }}
      maxWidth={{ base: "full", md: "500px" }}
      zIndex={2}
      bg="whiteAlpha.50"
      borderRadius="lg"
      p={2}
    >
      <Flex
        gap={2}
        justifyContent="center"
        width="full"
      >
        <Button
          size="sm"
          color={isRandomMode ? "yellow.400" : "gray.500"}
          onClick={onShuffle}
          title={isRandomMode ? "Random Mode On" : "Random Mode Off"}
          aria-label="Toggle Random Mode"
          width="full"
          height="40px"
          padding={0}
          flex={1}
        >
          <Shuffle size={16} />
        </Button>

        <Button
          size="sm"
          color="purple.500"
          onClick={onHistory}
          title="History (Mac: ⌘ + H | Win: Ctrl + H)"
          aria-label="View History"
          width="full"
          height="40px"
          padding={0}
          flex={1}
        >
          <History size={16} />
        </Button>

        <Button
          size="sm"
          color="blue.500"
          onClick={onStats}
          title="View Statistics"
          aria-label="View Statistics"
          width="full"
          height="40px"
          padding={0}
          flex={1}
        >
          <BarChart2 size={16} />
        </Button>

        <Button
          size="sm"
          color="teal.500"
          onClick={onWordList}
          title="Select Word Set"
          aria-label="Select Word Set"
          width="full"
          height="40px"
          padding={0}
          flex={1}
        >
          <Book size={16} />
        </Button>

        <Button
          color="red.400"
          size="sm"
          onClick={onReset}
          title="Reset Progress"
          aria-label="Reset Progress"
          width="full"
          height="40px"
          padding={0}
          flex={1}
        >
          <RotateCcw size={16} />
        </Button>

        <Button
          size="sm"
          color="gray.500"
          onClick={onHelp}
          title="Keyboard Shortcuts"
          aria-label="Show Keyboard Shortcuts"
          width="full"
          height="40px"
          padding={0}
          flex={1}
        >
          <HelpCircle size={16} />
        </Button>
      </Flex>
    </Flex>
  )
}

NavigationBar.propTypes = {
  isRandomMode: PropTypes.bool.isRequired,
  onShuffle: PropTypes.func.isRequired,
  onHistory: PropTypes.func.isRequired,
  onStats: PropTypes.func.isRequired,
  onWordList: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onHelp: PropTypes.func.isRequired,
}