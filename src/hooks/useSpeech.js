import { useCallback, useState, useEffect } from 'react'

export const useSpeech = () => {
  const [voices, setVoices] = useState([])
  const [isSpeechSupported, setIsSpeechSupported] = useState(true)

  // Load and update voices when they change
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis?.getVoices() || []
      setVoices(availableVoices)
    }

    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      setIsSpeechSupported(false)
      return
    }

    loadVoices()

    // Chrome requires this event to load voices
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const speakWord = useCallback((word) => {
    // If speech synthesis is not supported, use alert as fallback
    if (!isSpeechSupported) {
      alert(`Speech synthesis is not supported on this device.\nThe word is: ${word}`)
      return
    }

    try {
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(word)

      // Configure speech settings
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      // Try to find an English voice
      const englishVoice = voices.find(voice =>
        voice.lang.includes('en') && voice.localService
      )
      if (englishVoice) {
        utterance.voice = englishVoice
      }

      // Add error handling
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        alert(`Unable to play speech. The word is: ${word}`)
      }

      window.speechSynthesis.speak(utterance)
    } catch (error) {
      console.error('Speech synthesis error:', error)
      alert(`Unable to play speech. The word is: ${word}`)
    }
  }, [voices, isSpeechSupported])

  return {
    speakWord,
    isSpeechSupported
  }
}