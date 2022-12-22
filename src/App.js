import './App.css';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { createContext, useEffect, useState } from 'react';
import Main from './Pages/Dashboard/Customer/Main/Main';
import { createTheme, ThemeProvider } from '@mui/material';
import Orders from './Pages/Dashboard/Customer/Orders/Orders';
import ProtectedRoute from './Components/ProtectedRoute';

export const UserStatusContext = createContext()
export const UserContext = createContext()

function App() {

  const [userStatus, setUserStatus] = useState(false);
  const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   const loggedInUser = window.localStorage.getItem('user')
  //   if(loggedInUser){
  //     setUserStatus(true)
  //     setUser(JSON.parse(loggedInUser))
  //   }
  // },[])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <UserStatusContext.Provider value={[userStatus, setUserStatus]}>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
              <Route path='/customerDashboard'>
                <Route index element={
                  <ProtectedRoute>
                    <Main/>
                  </ProtectedRoute>
                }/>
                <Route path='orders' element={<Orders/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      </UserStatusContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;


let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          // backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#6af368',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};