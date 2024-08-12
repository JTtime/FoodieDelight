import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Box,
  IconButton,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { encryptData } from '../../utilities/services';
import { RestaurantAdminService } from '../../services/apiCalls';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          justifyContent: 'center',
        },
      },
    },
  },
});

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [restaurantsPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { responseData, responseCount } = await RestaurantAdminService.getAllRestaurants({
        page,
        limit: restaurantsPerPage
      });
      if (responseData.status === 200) {
        setRestaurants(responseData.data);
        setTotalCount(responseCount.data.length);
      }
    } catch (error) {
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {  

    fetchRestaurants();
  }, [page, restaurantsPerPage]);

  const handleEdit = (restaurantData) => {
    const encryptedData = encryptData(restaurantData);
    navigate(`/edit/${encodeURIComponent(encryptedData)}`);
  };

  const handleDelete = async (restaurantId) => {
    try {
      const response = await RestaurantAdminService.deleteRestaurant(restaurantId);
      if (response.status === 200) {
        toast.success("Restaurant deleted successfully!");
        fetchRestaurants();
        // setPage(1);
      }
    } catch (error) {
      toast.error("Failed to delete restaurant");
    }
  };

  const paginate = (event, value) => {
    setPage(value);
  };

//   const displayRestaurants = restaurants.slice(
//     (page - 1) * restaurantsPerPage,
//     page * restaurantsPerPage
//   );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', padding: '2rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Typography variant='h3' sx={{ border: '2px solid', borderColor: 'primary.main', padding: '1rem', borderRadius: '8px', color: 'primary.main' }}>
            Restaurants Listing
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add')}
            color="primary"
          >
            Add Restaurant
          </Button>
        </Box>
        <Divider sx={{ marginY: '2rem' }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {restaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ marginBottom: '0.5rem' }}>
                      {restaurant.restaurant_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '0.5rem' }}>
                      {restaurant.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '0.5rem' }}>
                      Contact Number: {restaurant.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email ID: {restaurant.email}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', borderTop: '1px solid', borderColor: 'divider' }}>
                    <IconButton aria-label="edit" onClick={() => handleEdit(restaurant)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(restaurant.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', padding: '1rem' }}>
          <Pagination
            count={Math.ceil(totalCount / restaurantsPerPage)}
            page={page}
            onChange={paginate}
            color="primary"
          />
        </Box>

        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
};

export default RestaurantList;
