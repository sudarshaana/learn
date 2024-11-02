import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    Spinner,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Badge,
    Center,
    Flex,
    Wrap,
    WrapItem
} from "@chakra-ui/react"
import React from 'react';
import PropTypes from 'prop-types'
import { motion } from "framer-motion"
import { useEffect } from 'react'

export const WordInfoModal = ({ isOpen, onClose, word, wordDetails, isLoading }) => {
    // Handle back button
    useEffect(() => {
        if (!isOpen) return

        const handlePopState = (e) => {
            e.preventDefault()
            onClose()
        }

        window.history.pushState(null, '')
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [isOpen, onClose])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: "full", md: "2xl" }}
            isCentered
        >
            <ModalOverlay backdropFilter="blur(8px)" />
            <ModalContent
                bg="transparent"
                mx={{ base: 0, md: 4 }}
                my={{ base: 0, md: 4 }}
                boxShadow="none"
                maxHeight={{ base: "100vh", md: "90vh" }}
                height={{ base: "100vh", md: "auto" }}
                display="flex"
                flexDirection="column"
            >
                <Box
                    bgGradient="linear(to-br, gray.800, gray.900)"
                    borderRadius="xl"
                    borderWidth={1}
                    borderColor="whiteAlpha.200"
                    height="full"
                    display="flex"
                    flexDirection="column"
                >
                    {/* Fixed Header */}
                    <Box
                        bgGradient="linear(to-r, blue.400, purple.400)"
                        borderTopRadius="xl"
                        position="sticky"
                        top={0}
                        zIndex={10}
                        borderBottom="1px solid"
                        borderColor="whiteAlpha.200"
                    >
                        <ModalHeader
                            color="white"
                            fontSize="2xl"
                            py={4}
                            textAlign="center"
                            letterSpacing="wide"
                        >
                            {word}
                        </ModalHeader>
                        <ModalCloseButton color="white" />
                    </Box>

                    {/* Scrollable Content */}
                    <Box
                        flex={1}
                        overflowY="auto"
                        pt={6}
                        mt={4}
                        css={{
                            '&::-webkit-scrollbar': { width: '4px' },
                            '&::-webkit-scrollbar-track': { background: 'transparent' },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '2px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <ModalBody py={0} px={6}>
                            {isLoading ? (
                                <Center py={8}>
                                    <VStack spacing={4}>
                                        <Spinner size="xl" color="blue.400" />
                                        <Text color="gray.400">Loading word details...</Text>
                                    </VStack>
                                </Center>
                            ) : wordDetails && wordDetails[0] ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <VStack align="stretch" spacing={6}>
                                        {/* First definition highlight */}
                                        {wordDetails[0].meanings[0]?.definitions[0] && (
                                            <Box
                                                p={4}
                                                bg="whiteAlpha.100"
                                                borderRadius="lg"
                                                borderWidth={1}
                                                borderColor="whiteAlpha.200"
                                            >
                                                <Text color="gray.300" fontSize="lg" lineHeight="tall">
                                                    {wordDetails[0].meanings[0].definitions[0].definition}
                                                </Text>
                                            </Box>
                                        )}

                                        {/* Synonyms and Antonyms */}
                                        {wordDetails[0].meanings.some(m => m.synonyms.length > 0 || m.antonyms.length > 0) && (
                                            <Flex gap={4} wrap="wrap">
                                                {wordDetails[0].meanings.map((meaning, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {meaning.synonyms.length > 0 && (
                                                            <Box
                                                                bg="whiteAlpha.50"
                                                                p={3}
                                                                borderRadius="md"
                                                                flex="1"
                                                                minW={{ base: "full", md: "200px" }}
                                                            >
                                                                <Text color="green.400" fontSize="sm" mb={2}>
                                                                    Synonyms:
                                                                </Text>
                                                                <Wrap spacing={2}>
                                                                    {meaning.synonyms.slice(0, 5).map((syn, i) => (
                                                                        <WrapItem key={i}>
                                                                            <Badge colorScheme="green" variant="subtle">
                                                                                {syn}
                                                                            </Badge>
                                                                        </WrapItem>
                                                                    ))}
                                                                </Wrap>
                                                            </Box>
                                                        )}
                                                        {meaning.antonyms.length > 0 && (
                                                            <Box
                                                                bg="whiteAlpha.50"
                                                                p={3}
                                                                borderRadius="md"
                                                                flex="1"
                                                                minW={{ base: "full", md: "200px" }}
                                                            >
                                                                <Text color="red.400" fontSize="sm" mb={2}>
                                                                    Antonyms:
                                                                </Text>
                                                                <Wrap spacing={2}>
                                                                    {meaning.antonyms.slice(0, 5).map((ant, i) => (
                                                                        <WrapItem key={i}>
                                                                            <Badge colorScheme="red" variant="subtle">
                                                                                {ant}
                                                                            </Badge>
                                                                        </WrapItem>
                                                                    ))}
                                                                </Wrap>
                                                            </Box>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </Flex>
                                        )}

                                        {/* Meanings */}
                                        <Accordion
                                            allowMultiple
                                            defaultIndex={Array.from(
                                                { length: wordDetails[0].meanings.length },
                                                (_, i) => i
                                            )}
                                        >
                                            {wordDetails[0].meanings.map((meaning, index) => (
                                                <AccordionItem
                                                    key={index}
                                                    border="none"
                                                    mb={3}
                                                >
                                                    <AccordionButton
                                                        bg="whiteAlpha.100"
                                                        _hover={{ bg: "whiteAlpha.200" }}
                                                        borderRadius="lg"
                                                        p={3}
                                                    >
                                                        <Badge
                                                            colorScheme="blue"
                                                            fontSize="sm"
                                                            px={3}
                                                            py={1}
                                                            borderRadius="full"
                                                        >
                                                            {meaning.partOfSpeech}
                                                        </Badge>
                                                        <AccordionIcon ml="auto" color="gray.400" />
                                                    </AccordionButton>
                                                    <AccordionPanel pt={4} pb={2}>
                                                        <VStack align="stretch" spacing={4}>
                                                            {meaning.definitions.map((def, idx) => (
                                                                <Box
                                                                    key={idx}
                                                                    bg="whiteAlpha.50"
                                                                    p={3}
                                                                    borderRadius="md"
                                                                >
                                                                    <Text color="gray.300" fontSize="sm">
                                                                        {def.definition}
                                                                    </Text>
                                                                    {def.example && (
                                                                        <Text
                                                                            color="gray.500"
                                                                            fontSize="sm"
                                                                            mt={2}
                                                                            fontStyle="italic"
                                                                        >
                                                                            Example: {def.example}
                                                                        </Text>
                                                                    )}
                                                                </Box>
                                                            ))}
                                                        </VStack>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </VStack>
                                </motion.div>
                            ) : (
                                <Center py={8}>
                                    <Text color="gray.400">No additional information available</Text>
                                </Center>
                            )}
                        </ModalBody>
                    </Box>
                </Box>
            </ModalContent>
        </Modal>
    )
}

WordInfoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired,
    wordDetails: PropTypes.array,
    isLoading: PropTypes.bool
}