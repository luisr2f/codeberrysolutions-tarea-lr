import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

export default function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Container component="main" maxWidth="xs" sx={{ pt: 4 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 1,
              mb: 0
            }}
          >
            <Box
              sx={{
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box sx={{ mt: 3 }}>
                {/* <img
                  src={logoLogin}
                  alt="logo"
                  style={{ width: 210, height: 126 }}
            /> */}
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    navigate('/dashboard')
                  }}
                >
                  Entrar
                </Button>

                {/* <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  sx={{ py: 1 }}
                >
                  <Link href="#" variant="body2">
                    ---
                  </Link>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
