import React, { useState } from 'react'
import { useNavigate, useRoutes, Outlet } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Topic from '@mui/icons-material/Topic'

import Collapse from '@mui/material/Collapse'

import { CatalogueMenu } from '_global/constant'

import routes from './routes'
import UseMatchedRoute from 'components/useMatchedRoute'

const drawerWidth = 300

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open === true && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open === true && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

// eslint-disable react/prop-types
export default function DefaultLayout() {
  const theme = useTheme()
  // console.log('keycloak', keycloak)

  const [open, setOpen] = useState(true)
  const [openCatalogue, setOpenCatalogue] = useState(false)

  const route = UseMatchedRoute()

  const routesElem = useRoutes(routes)

  const navigate = useNavigate()

  const handleDrawerOpen = (): void => {
    setOpen(!open)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Toolbar>
            {/*
            <img
              src={logoFarabella}
              alt="logo"
              style={{ width: 200, height: 30, marginLeft: -36 }}
            />
  */}
          </Toolbar>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#D7D7D7',
            color: '#333333'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              navigate('/dashboard')
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              setOpenCatalogue(!openCatalogue)
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Topic />
              </ListItemIcon>
              <ListItemText primary="Catálogos" />
              {openCatalogue ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCatalogue} timeout="auto" unmountOnExit>
            {CatalogueMenu.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  navigate(item.path)
                }}
                sx={{
                  backgroundColor: route.path === item.path ? 'red' : undefined
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>
        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {route.name !== '' && (
          <Typography variant="h5" mb={1} component="h1">
            {route.name}
          </Typography>
        )}
        {routesElem}
        <Outlet />
      </Main>
    </Box>
  )
}
