import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination, Box, IconButton, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { encryptData } from '../../utilities/services';
import { RestaurantAdminService } from '../../services/apiCalls';


function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [totalCount, setTotalCount] = useState()
    const [page, setPage] = useState(1);
    const [currentRestaurants, setCurrentRestaurants] = useState([])
    const [restaurantsPerPage] = useState(9);
    const navigate = useNavigate();


    // useEffect(() => {
    //     setRestaurants(restaurantData)
    // }, [])
    // console.log('restaurant', restaurantData)
    // const {isLoading, isSuccess, data, isError, error, refetch} = RestaurantAdminService.getAllRestaurants();
    const fetchData = async () => {
        let { responseData, responseCount } = await RestaurantAdminService.getAllRestaurants({ page, limit: restaurantsPerPage });
        if (responseData.status === 200) {
            setRestaurants(responseData?.data)
            setTotalCount(responseCount?.data?.length)
        }
        console.log('response', responseCount?.data?.length)
    }

    useEffect(() => {
        fetchData();
        console.log('restaurant', restaurants)
    }, [page])

    const indexOfLastRestaurant = page * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;


    useEffect(() => {

        const restaurantData = restaurants?.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
        setCurrentRestaurants([...restaurantData]);
    }, [restaurants])


    // const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    const paginate = (pageNumber) => {
        console.log('pageNumber', pageNumber)
        setPage(pageNumber);
    }

    const handleEdit = (restaurantData) => {
        const dataid = encryptData(restaurantData)
        console.log('restaurantData', restaurantData)
        navigate(`/edit/${encodeURIComponent(dataid)}`);
    };

    const handleDelete = async (restauantId) => {
        console.log('restauantId', restauantId)
        const response = await RestaurantAdminService.deleteRestaurant(restauantId);
        if (response.status === 200) {
            toast.success("Restaurant Deleted successfully!");
            fetchData();
        }
    }


    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem' }}>
                <Box>
                    <Typography variant='h3' style={{ border: '2px solid blue', padding: '0.5rem' }}>
                        Restaurants Listing
                    </Typography>

                </Box>
                <Box>
                    <Button onClick={() => navigate(`/add`)} variant="contained" startIcon={<AddIcon />}>
                        Add Restaurant
                    </Button>

                </Box>


            </Box>
            <Divider sx={{ marginY: '1rem' }} />

            <Grid container spacing={3}>
                {restaurants?.map((restaurant) => (
                    <Grid item xs={12} sm={6} md={4} key={restaurant?.id}>
                        <Card sx={{ height: '100%' }}>
                            {/* <Box sx={{ height: 'auto' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.image_url}
                                    alt={restaurant.restaurant_name}
                                />
                            </Box> */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CardContent sx={{ flexGrow: 1, height: '100%' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {restaurant?.restaurant_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {restaurant?.description}
                                        </Typography>
                                    </CardContent>

                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Contact Number: {restaurant?.phone}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Email ID: {restaurant?.email}
                                    </Typography>

                                </Box>

                                <Box >
                                    <IconButton aria-label="edit"
                                        onClick={() => handleEdit(
                                            {
                                                name: restaurant.restaurant_name,
                                                id: restaurant.id,
                                                desc: restaurant.description,
                                                phone: restaurant.phone,
                                                email: restaurant.email,
                                                // image: restaurant.image_url,
                                                location: restaurant.location
                                            })}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete"
                                        onClick={() => handleDelete(restaurant?.id)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </Box>

                            </Box>



                        </Card>

                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', padding: '1rem', border: '2px solid black' }}>
                <Pagination
                    count={Math.ceil(totalCount / restaurantsPerPage)}
                    page={page}
                    onChange={(event, value) => paginate(value)}
                />
            </Box>
            <ToastContainer />
        </div>
    )
}

export default RestaurantList