import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const DefaultLayout = React.lazy(
  async () => await import('layout/DefaultLayout')
)

const loading = <div className="pt-3 text-center"></div>

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="*" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
