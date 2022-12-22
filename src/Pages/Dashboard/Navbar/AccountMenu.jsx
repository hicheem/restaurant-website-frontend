import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { Avatar, Divider, MenuItem , ListItemIcon, Menu, Tooltip, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStatusContext } from '../../../App';
import { UserContext } from '../../../App';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


const AccountMenu = (props) => {
    const [userStatus, setUserStatus] = useContext(UserStatusContext)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <div>
        <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{pl: '-1rem' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                >
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        >
                        <Avatar alt="user" sx={{ width: 32, height: 32 }} src={user.photo} />
                    </StyledBadge>
            </IconButton>
        </Tooltip>
                   
        <Menu
            
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={(handleClose)}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 9,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <MenuItem onClick={() => navigate('profile')}>
                <Avatar src={user.photo}/> Profile
            </MenuItem>
            
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                    Settings
            </MenuItem>
            <MenuItem onClick={() => navigate('/')}>
                <ListItemIcon>
                    <HomeIcon fontSize="small"/>
                </ListItemIcon>
                    Back Home
            </MenuItem>
            <MenuItem onClick={()=> {
                setUserStatus(false)
                window.localStorage.removeItem('token')
                navigate('/login');
                }
            }>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon >
                    Logout
            </MenuItem>
        </Menu>
    </div>
  )
}

export default AccountMenu