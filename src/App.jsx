import Home from './pages/Home';
import './App.css'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Home />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
    )
}

export default App
