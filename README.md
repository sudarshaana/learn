# Spelling Practice App

A modern web application designed to help users improve their English spelling through interactive practice. Built with React and Chakra UI, featuring a clean, dark-themed interface and comprehensive keyboard shortcuts.

🌐 [Live Demo](https://sudarshaana.github.io/learn/)

## 🌟 Features

- **Interactive Spelling Practice**: Practice spelling with immediate feedback
- **Text-to-Speech**: Listen to correct pronunciations (with fallback for unsupported devices)
- **Progress Tracking**: Track correct/incorrect attempts and maintain streaks
- **Multiple Word Sets**: Choose from different word collections
- **Random Mode**: Practice words in random order
- **Statistics**: View detailed stats about your practice sessions
- **History**: Review past attempts with timestamps
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with beautiful gradient backgrounds
- **Local Storage**: Progress persists between sessions
- **Streak System**: Track your current and best streaks
- **Common Mistakes**: Track frequently misspelled words

## ⌨️ Keyboard Shortcuts

- `⌘/Ctrl + N`: Next word
- `⌘/Ctrl + P`: Previous word
- `⌘/Ctrl + O`: Show/Hide answer
- `⌘/Ctrl + H`: View history
- `⌘/Ctrl + L`: Listen to pronunciation
- `⌘/Ctrl + U`: Toggle random mode
- `Enter`: Check answer
- `Esc`: Close modals

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

### Attribution
- [Spelling icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/spelling "spelling icons")

## 🛠️ Build Prompts

If you want to rebuild this project from scratch, you can follow these sequential prompts:

### Phase 1: Foundation Setup

#### Project Initialization
Create a new Vite React project with the following requirements:
- Use Chakra UI for styling
- Set up a dark theme
- Configure essential dependencies: Framer Motion, Lucide React icons
- Set up proper directory structure for components and hooks
- Configure basic routing and layout

#### Core Components Structure
Create the main spelling practice interface with these components:
1. WordDisplay component to show the word to spell
2. InputSection component for user input with:
   - Modern input field design
   - Real-time validation
   - Animation feedback for correct/incorrect answers
3. ButtonControls component with:
   - Check button with gradient design
   - Navigation buttons (prev/next)
   - Show/Hide answer toggle
Include proper TypeScript/PropTypes and styling.


### Phase 2: Core Functionality

#### Word Management System
Implement the core word management system:
1. Create a data structure for words (correct/incorrect pairs)
2. Implement word loading from CSV using PapaParse
3. Add word navigation logic (next/prev)
4. Create word set selection functionality
5. Add random/shuffle mode
Include proper state management and error handling.

#### Progress & Streak System
Create a comprehensive progress tracking system:
1. Implement streak counting logic
2. Add best streak tracking
3. Create progress bar component
4. Add statistics tracking:
   - Correct/incorrect counts
   - Average attempts
   - Common mistakes tracking
5. Implement localStorage persistence


### Phase 3: Advanced Features

#### Modal System
Create a modal system with these components:
1. WordInfoModal for displaying word details:
   - Fetch and display word meanings
   - Show synonyms/antonyms
   - Add pronunciation button
2. StatsModal for showing statistics
3. HistoryModal for attempt history
4. ShortcutsGuide modal
Include proper animations and mobile responsiveness.

#### Keyboard Shortcuts
Implement a keyboard shortcut system:
1. Create useKeyboardShortcuts hook
2. Add shortcuts for:
   - Navigation (next/prev)
   - Show/hide answer
   - Check answer
   - Modal controls
3. Add visual feedback for shortcuts
4. Create shortcuts guide display

### Phase 4: User Experience

#### Animation & Feedback

Add polish with animations and feedback:
1. Add Framer Motion animations for:
   - Word transitions
   - Feedback animations
   - Modal transitions
2. Implement loading states
3. Add error handling and user feedback
4. Create smooth transitions between states

#### Responsive Design
Implement responsive design:
1. Create mobile-first layouts
2. Add proper spacing and sizing
3. Implement touch-friendly controls
4. Add proper modal handling for mobile
5. Ensure proper keyboard handling across devices

### Phase 5: Final Polish

#### Data Persistence
Implement complete data persistence:
1. Set up localStorage for:
   - Current progress
   - Statistics
   - User preferences
   - Word set selection
2. Add data reset functionality
3. Implement proper data migration

#### Deployment Setup

Set up the project for deployment:
1. Configure proper meta tags
2. Add favicon with all required sizes
3. Create manifest files
4. Set up GitHub Pages deployment
5. Add proper documentation
Include performance optimization and testing.