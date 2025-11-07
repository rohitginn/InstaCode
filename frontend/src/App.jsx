import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      {/* Header */}
      <main >
        <AppRoutes />
        <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 1500}} />
      </main>
      {/* Footer */}
    </>

  )
}

export default App
