
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
export const nav_elements = [
    {
        id : 'Dashboard' , children : [{
            title:'Users',
            icon: <PeopleAltIcon/>,
            link:'users',
            active:false
        },
        {
            title:'Menu',
            icon: <RestaurantMenuIcon/>,
            link:'menu',
            active:false
        },
        {
            title:'Dish',
            icon: <LunchDiningIcon/>,
            link:'dish',
            active:false
        },
        {
            title:'Booking',
            icon: <TableRestaurantIcon/>,
            link:'booking',
            active:false
        },
        {
            title:'Orders',
            icon: <ShoppingCartIcon/>,
            link:'booking',
            active:false
        },
        ]
    },
    {
        id : 'Profile' , children : [{
            title:'Notification',
            icon: <NotificationsIcon/>,
            link: 'notification',
            active:false
        },
        {
            title:'Profile',
            icon: <PersonIcon/>,
            link:'profile',
            active:false
        },
        {
            title:'Logout',
            icon: <LogoutIcon/>,
            link:'/login',
            active:false
        }]
    },
]