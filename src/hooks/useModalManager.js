import { useState, useEffect } from 'react'
import { wordSets } from '../data/wordSets'

export const useModalManager = () => {
  const [showHistory, setShowHistory] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showWordSets, setShowWordSets] = useState(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore')
    return !hasVisited && wordSets.length > 1
  })
  const [showInfo, setShowInfo] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [modalHistory, setModalHistory] = useState([])

  useEffect(() => {
    const handlePopState = () => {
      if (modalHistory.length > 0) {
        const lastModal = modalHistory[modalHistory.length - 1]
        switch (lastModal) {
          case 'history':
            setShowHistory(false)
            break
          case 'shortcuts':
            setShowShortcuts(false)
            break
          case 'wordsets':
            setShowWordSets(false)
            break
          case 'stats':
            setShowStats(false)
            break
        }
        setModalHistory(prev => prev.slice(0, -1))
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [modalHistory])

  const handleOpenModal = (modalType) => {
    window.history.pushState(null, '')
    setModalHistory(prev => [...prev, modalType])

    switch (modalType) {
      case 'history':
        setShowHistory(true)
        break
      case 'shortcuts':
        setShowShortcuts(true)
        break
      case 'wordsets':
        setShowWordSets(true)
        break
      case 'stats':
        setShowStats(true)
        break
    }
  }

  const handleCloseModal = () => {
    if (modalHistory.length > 0) {
      window.history.back()
    }
  }

  return {
    showHistory,
    showStats,
    showShortcuts,
    showWordSets,
    showInfo,
    showResetConfirm,
    setShowHistory,
    setShowStats,
    setShowShortcuts,
    setShowWordSets,
    setShowInfo,
    setShowResetConfirm,
    handleOpenModal,
    handleCloseModal,
  }
}