import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GetEntries } from './services/contentful/content-delivery-api'
import { PhotoVoiceAppBar } from './components/app-bar/app-bar';
import { useState } from 'react';

function App() {

  const [selectedKeywords, setSelectedKeywords] = useState(['']);

  const handleSetSelectedKeywords = (keywords: string[]) => {
    console.log({keywords});
    setSelectedKeywords(keywords);
  }

  return (
    <div>
      <PhotoVoiceAppBar setSelectedKeywords={handleSetSelectedKeywords} />
      <GetEntries keywords={selectedKeywords} />
    </div>
  )
}

export default App
