import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Link} from 'react-router-dom';
import { nav_elements } from './nav_elements';



const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function SideNav(props) {
  const { ...other } = props;

  

    
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Restaurant
        </ListItem>
        <Link to={'/adminDashboard'} >
            <ListItem sx={{ ...item, ...itemCategory }}>
                
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText>Overview</ListItemText>
            </ListItem>
        </Link>
        {nav_elements.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(elem => (
                <Link to={elem.link} >
                    <ListItem  disablePadding >
                        <ListItemButton  sx={item}>
                            <ListItemIcon sx={{color:'white'}}>{elem.icon}</ListItemIcon>
                            <ListItemText>{elem.title}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}