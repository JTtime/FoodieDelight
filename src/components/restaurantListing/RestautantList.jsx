import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination, Box, IconButton, Button } from '@mui/material';
import { Link } from "react-router-dom";
import restaurantData from '../../MOCK_DATA.json';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


function RestautantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [restaurantsPerPage] = useState(12);

    useEffect(() => {
        setRestaurants(restaurantData)
    }, [])
    console.log('restaurant', restaurantData)

    const indexOfLastRestaurant = page * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    const paginate = (pageNumber) => setPage(pageNumber);


    return (
        <div>
            <Button variant="contained" startIcon={<AddIcon />}>
                Add Restaurant
            </Button>
            <Grid container spacing={3}>
                {currentRestaurants.map((restaurant) => (
                    <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={restaurant.image_url}
                                alt={restaurant.restaurant_name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {restaurant.restaurant_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {restaurant.description}
                                </Typography>
                            </CardContent>
                            <IconButton aria-label="edit" component={Link} to={`/edit/${restaurant.id}`}>
                                <EditIcon />
                            </IconButton>
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