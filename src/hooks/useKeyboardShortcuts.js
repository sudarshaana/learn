import { useEffect } from 'react'

export const useKeyboardShortcuts = ({
  showHistory,
  setShowHistory,
  nextWord,
  prevWord,
  setShowCorrectWord,
  speakWord,
  setIsRandomMode,
  setShowInfo,
  currentWord
}) => {
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      // Handle ESC key for history window first
      if (e.key === 'Escape' && showHistory) {
        e.preventDefault()
        setShowHistory(false)
        return
      }

      // If history is open, don't process other shortcuts
      if (showHistory) {
        return
      }

      const isModifierKey = e.metaKey || e.ctrlKey

      // Next Word - Cmd/Ctrl + ArrowRight
      if (isModifierKey && e.key === 'ArrowRight') {
        e.preventDefault()
        nextWord()
      }
      // Show/Hide Answer - Cmd/Ctrl + O
      if (isModifierKey && e.key === 'o') {
        e.preventDefault()
        setShowCorrectWord(prev => !prev)
      }
      // History - Cmd/Ctrl + H
      if (isModifierKey && e.key === 'h') {
        e.preventDefault()
        setShowHistory(prev => !prev)
      }
      // Listen shortcut - Cmd/Ctrl + L
      if (isModifierKey && e.key === 'l') {
        e.preventDefault()
        speakWord(currentWord.correct)
      }
      // Previous Word - Cmd/Ctrl + ArrowLeft
      if (isModifierKey && e.key === 'ArrowLeft') {
        e.preventDefault()
        prevWord()
      }
      // Toggle Random Mode - Cmd/Ctrl + U
      if (isModifierKey && e.key === 'u') {
        e.preventDefault()
        setIsRandomMode(prev => !prev)
      }
      // Info shortcut - Cmd/Ctrl + I
      if (isModifierKey && e.key === 'i') {
        e.preventDefault()
        setShowInfo(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcuts)
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts)
  }, [showHistory, currentWord, nextWord, prevWord, setShowCorrectWord,
      setShowHistory, speakWord, setIsRandomMode, setShowInfo])
}