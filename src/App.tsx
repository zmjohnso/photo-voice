import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GetEntries } from './services/contentful/content-delivery-api'
import { PhotoVoiceAppBar } from './components/app-bar/app-bar';

function App() {

  return (
    <div>
      <PhotoVoiceAppBar />
      <GetEntries />
    </div>
  )
}

export default App
