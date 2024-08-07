import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination, Box, IconButton, Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import restaurantData from '../../MOCK_DATA.json';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { encryptData } from '../../utilities/services';


function RestautantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [restaurantsPerPage] = useState(12);
    const navigate = useNavigate();


    useEffect(() => {
        setRestaurants(restaurantData)
    }, [])
    console.log('restaurant', restaurantData)

    const indexOfLastRestaurant = page * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    const paginate = (pageNumber) => setPage(pageNumber);

    const handleEdit = (restaurantId) => {
        const dataid = encryptData(restaurantId)
        console.log('restaurantId', restaurantId)
        navigate(`/edit/${encodeURIComponent(dataid)}`);
    };


    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem' }}>
                <Box>
                    <Typography variant='h3'>
                        Restaurants Listing
                    </Typography>

                </Box>
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Add Restaurant
                    </Button>

                </Box>


            </Box>

            <Grid container spacing={3}>
                {currentRestaurants.map((restaurant) => (
                    <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                        <Card sx={{ height: '100%' }}>
                            <Box sx={{height: 'auto'}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.image_url}
                                    alt={restaurant.restaurant_name}
                                />
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box  sx={{flexGrow: 1}}>
                                    <CardContent sx={{flexGrow: 1, height: '100%'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {restaurant.restaurant_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {restaurant.description}
                                        </Typography>
                                    </CardContent>

                                </Box>

                                <Box >
                                    <IconButton aria-label="edit" onClick={() => handleEdit({ name: restaurant.restaurant_name, id: restaurant.id, desc: restaurant.description, image: restaurant.image_url, location: restaurant.location })}>
                                        <EditIcon />
                                    </IconButton>

                                </Box>

                            </Box>



                        </Card>

                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem', padding: '1rem', border: '2px solid black' }}>
                <Pagination
                    count={Math.ceil(restaurants.length / restaurantsPerPage)}
                    page={page}
                    onChange={(event, value) => paginate(value)}
                />
            </Box>
        </div>
    )
}

export default RestautantList