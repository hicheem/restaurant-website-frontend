import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';





const ItemCard = (props) => {

  
  
  return (

    <Card sx={{ width: 240, minheight:280,  display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='fs-6 fw-bold'>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='fw-light'>
            {props.recipe}
          </Typography>
          <Typography variant="p" color="text.primary" className='fw-bold text-danger'>
            {props.price}DA
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" startIcon={<AddShoppingCartIcon/>}
          onClick={()=>{
            props.setSelectedItem(props.id);
          }
          }
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ItemCard;