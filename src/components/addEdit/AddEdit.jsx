import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptData } from "../../utilities/services";
import { RestaurantAdminService } from "../../services/apiCalls";
import {
  Box,
  Button,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { blue, green, pink, red } from "@mui/material/colors";

// Validation Schema with Yup
const validationSchema = Yup.object().shape({
  restaurant_name: Yup.string().required("Restaurant name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  phone: Yup.string()
    .matches(/^\(?([0-9]{3})\)?[- .]?([0-9]{3})[- .]?([0-9]{4})$/, 'Invalid phone number format')
    .required('Phone number is required'),
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

const AddEdit = () => {
  const navigate = useNavigate();
  const { dataid } = useParams();
  const data = decryptData(dataid);
  
  const [initialValues, setInitialValues] = useState({
    restaurant_name: data?.restaurant_name || "",
            description: data?.description || "",
            location: data?.location || "",
            phone: data?.phone || "",
            email: data?.email || "",
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (data) {
        await RestaurantAdminService.updateRestaurant(id, values);
        toast.success("Restaurant updated successfully!");
      } else {
        await RestaurantAdminService.addRestaurant(values);
        toast.success("Restaurant added successfully!");
      }
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ padding: '2rem', bgcolor: 'background.default', borderRadius: '8px', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${blue[100]} 0%, ${pink[100]} 100%)`,
          zIndex: -1,
          opacity: 0.5,
        }}
      />
      
      <Typography variant="h4" align="center" gutterBottom color={blue[800]} fontWeight="bold">
        {data ? "Edit Restaurant" : "Add Restaurant"}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.restaurant_name && touched.restaurant_name)}>
                  <TextField
                    label="Restaurant Name"
                    id="restaurant_name"
                    name="restaurant_name"
                    value={values.restaurant_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: touched.restaurant_name && errors.restaurant_name ? red[500] : blue[500],
                        },
                        '&:hover fieldset': {
                          borderColor: blue[700],
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: blue[700],
                        },
                      },
                    }}
                  />
                  <FormHelperText>{errors.restaurant_name}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.description && touched.description)}>
                  <Typography variant="subtitle1" color="text.primary" sx={{ mb: 1 }}>
                    Description
                  </Typography>
                  <TextareaAutosize
                    style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid', borderColor: touched.description && errors.description ? red[500] : blue[500], transition: 'border-color 0.3s ease' }}
                    maxRows={4}
                    minRows={4}
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>{errors.description}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.location && touched.location)}>
                  <TextField
                    label="Location"
                    id="location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: touched.location && errors.location ? red[500] : blue[500],
                        },
                        '&:hover fieldset': {
                          borderColor: blue[700],
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: blue[700],
                        },
                      },
                    }}
                  />
                  <FormHelperText>{errors.location}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.phone && touched.phone)}>
                  <TextField
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: touched.phone && errors.phone ? red[500] : blue[500],
                        },
                        '&:hover fieldset': {
                          borderColor: blue[700],
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: blue[700],
                        },
                      },
                    }}
                  />
                  <FormHelperText>{errors.phone}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.email && touched.email)}>
                  <TextField
                    label="Email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: touched.email && errors.email ? red[500] : blue[500],
                        },
                        '&:hover fieldset': {
                          borderColor: blue[700],
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: blue[700],
                        },
                      },
                    }}
                  />
                  <FormHelperText>{errors.email}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ bgcolor: blue[700], '&:hover': { bgcolor: blue[800] }, borderRadius: '8px' }}
                  disabled={isSubmitting}
                >
                  {data ? "Update Restaurant" : "Add Restaurant"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ borderColor: pink[500], color: pink[500], '&:hover': { borderColor: pink[600], color: pink[600] }, borderRadius: '8px' }}
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Container>
  );
};

export default AddEdit;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import mockDataImport from "../../MOCK_DATA.json";
// import { decryptData } from "../../utilities/services";
// import { RestaurantAdminService } from "../../services/apiCalls";
// import {
//     Box,
//     Button,
//     Container,
//     Grid,
//     TextareaAutosize,
//     TextField,
//     Typography,
// } from "@mui/material";

// // const initialValues
// //     = {
// //     restaurant_name: '',
// //     description: '',
// //     location: '',
// //     image: null,
// // };

// const validationSchema = Yup.object().shape({
//     restaurant_name: Yup.string().required("Restaurant name is required"),
//     description: Yup.string().required("Description is required"),
//     location: Yup.string().required("Location is required"),
//     phone: Yup.string()
//         .matches(/^\(?([0-9]{3})\)?[- .]?([0-9]{3})[- .]?([0-9]{4})$/, 'Invalid phone number format')
//         .required('Phone number is required'),
//     email: Yup.string().email("Invalid email format")
//     // image_url: Yup.mixed()
//     //     .required("Image is required")
//     //     .test(
//     //         "fileType",
//     //         "Invalid file type (only JPG, JPEG, and PNG allowed)",
//     //         (value) => {
//     //             if (!value) return false;
//     //             const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
//     //             return allowedTypes.includes(value.type);
//     //         }
//     //     ),
// });

// function AddEdit() {
//     const navigate = useNavigate();
//     const { dataid } = useParams();
//     const id = decryptData(dataid);
//     console.log("id", id);
//     const [initialValues, setInitialValues] = useState({
//         restaurant_name: id?.name || "",
//         description: id?.description || "",
//         location: id?.location || "",
//         phone: id?.phone || '',
//         email: id?.email || ''
//         // image_url: id?.image || "",
//     });
//     const [mockData, setMockData] = useState([...mockDataImport]);

//     const handleSubmit = (values, { setSubmitting }) => {
//         console.log('values', values);

//         if (id) {
//             updateRestaurant(id?.id)
//         }
//         else addNewRestaurant(values);
//         console.log('values', values);
//         const newRestaurant = {
//             id: mockData.length + 1,
//             ...values,
//             // image_url: URL.createObjectURL(values.image_url),
//         };
//         setMockData([...mockData, newRestaurant]);
//         console.log("mockData", mockData);
//         setSubmitting(false);
//     };

//     const updateRestaurant = async (id) => {
//         const response = await RestaurantAdminService.updateRestaurant(id)
//         if (response.status >= 200 && response?.status <= 300) {
//             toast.success("Restaurant updated successfully!");
//             setTimeout(() => { navigate('/') }, 2000)
//         }
//     }

//     const addNewRestaurant = async (values) => {
//         try {
//             const response = await RestaurantAdminService.addRestaurant(values);
//             if (response.status >= 200 && response?.status <= 300) {
//                 console.log('add new rest', response)
//                 toast.success("Restaurant added successfully!");
//                 setTimeout(() => { navigate('/') }, 2000);
//             }
//         } catch (err) {
//             console.error('error adding new restaurant', err)
//         }
//     }
       

//     useEffect(() => {
//         if (id) {
//             const restaurant = mockData.find((r) => r.id === parseInt(id));
//             setInitialValues(restaurant);
//         } else {
//             setInitialValues({
//                 restaurant_name: "",
//                 description: "",
//                 location: "",
//                 // image_url: "",
//             });
//         }
//     }, [id, mockData]);

//     // const validationSchema = Yup.object({
//     //   restaurant_name: Yup.string().required('Required'),
//     //   description: Yup.string().required('Required'),
//     //   location: Yup.string().required('Required'),
//     //   image_url: Yup.string().url('Invalid URL'),
//     // });

//     // const handleSubmit = (values, { setSubmitting }) => {
//     //     // Handle form submission (replace with API call later)
//     //     console.log(values);
//     //     setSubmitting(false);
//     //     navigate('/');
//     // };

//     return (
//         <div>
//             <Container maxWidth="sm">
//                 <Typography variant="h4" align="center" gutterBottom>
//                     {id ? "Edit Restaurant" : "Add Restaurant"}
//                 </Typography>

//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({
//                         errors,
//                         touched,
//                         values,
//                         handleBlur,
//                         handleChange,
//                         setFieldValue,
//                         isSubmitting,
//                     }) => (
//                         <Form>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Restaurant Name"
//                                         id="restaurant_name"
//                                         name="restaurant_name"
//                                         error={Boolean(
//                                             errors.restaurant_name && touched.restaurant_name
//                                         )}
//                                         helperText={errors.restaurant_name}
//                                         value={values.restaurant_name}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                     // {...formik.getFieldProps('restaurant_name')}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>

//                                     <Box sx={{ alignSelf: 'start', textAlign: 'left', marginBottom: '0.5rem' }}>
//                                         <label htmlFor="description">Description</label>
//                                     </Box>
//                                     <TextareaAutosize
//                                         // fullWidth
//                                         style={{ width: "100%" }}
//                                         variant="standard"
//                                         maxRows={4}
//                                         minRows={2}
//                                         label="Description"
//                                         id="description"
//                                         name="description"
//                                         error={errors.description && touched.description}
//                                         // helperText={errors.description}
//                                         value={values.description}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                     // {...formik.getFieldProps('restaurant_name')}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Location"
//                                         id="location"
//                                         name="location"
//                                         error={Boolean(errors.location && touched.location)}
//                                         helperText={errors.location}
//                                         value={values.location}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                     // {...formik.getFieldProps('restaurant_name')}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Phone Number"
//                                         id="phone"
//                                         name="phone"
//                                         error={Boolean(errors.phone && touched.phone)}
//                                         helperText={errors.phone}
//                                         value={values.phone}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Email"
//                                         id="email"
//                                         name="email"
//                                         error={Boolean(errors.email && touched.email)}
//                                         helperText={errors.email}
//                                         value={values.email}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                     />
//                                 </Grid>
//                                 {/* <Grid item xs={12}>
//                                     <div
//                                         style={{ display: "flex", justifyContent: "left" }}
//                                     >
//                                         <Box sx={{ marginRight: '2rem' }}>
//                                             <label htmlFor="image_url">Image</label>
//                                         </Box>
//                                         <Box>
//                                             <input
//                                                 type="file"
//                                                 id="image_url"
//                                                 name="image_url"
//                                                 accept="image/*"
//                                                 onChange={(event) => {
//                                                     const file = event.currentTarget.files[0];
//                                                     // setFieldValue('image', file);
//                                                     setFieldValue("image_url", URL.createObjectURL(file));
//                                                 }}
//                                             />
//                                             {errors.image_url && touched.image_url ? (
//                                                 <div>{errors.image_url}</div>
//                                             ) : null}
//                                         </Box>
//                                     </div>
//                                 </Grid> */}
//                                 <Grid
//                                     item
//                                     xs={12}
//                                     sx={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         marginY: "2rem",
//                                     }}
//                                 >
//                                     <Button
//                                         variant="contained"
//                                         type="submit"
//                                         disabled={isSubmitting}
//                                     >
//                                         {id ? "Submit" : "Add Restaurant"}
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         type="Reset"
//                                         disabled={isSubmitting}
//                                     >
//                                         Reset
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         disabled={isSubmitting}
//                                         onClick={() => navigate(-1)}
//                                     >
//                                         Back
//                                     </Button>
//                                 </Grid>
//                                 {values.image_url && (
//                                     <Grid item xs={12}>
//                                         <Box sx={{ height: "100%", width: "100%" }}>
//                                             <img
//                                                 src={values.image_url}
//                                                 style={{ height: "100%", width: "100%" }}
//                                             />
//                                         </Box>
//                                     </Grid>
//                                 )}
//                             </Grid>
//                             {/* <div>

//                                     <label htmlFor="restaurant_name">Restaurant Name</label>
//                                     <Field type="text" id="restaurant_name" name="restaurant_name" />
//                                     {errors.restaurant_name && touched.restaurant_name ? (
//                                         <div>{errors.restaurant_name}</div>
//                                     ) : null}
//                                 </div> */}
//                             {/* <div>
//                                 <label htmlFor="description">Description</label>
//                                 <Field as="textarea" id="description" name="description" />
//                                 {errors.description && touched.description ? (
//                                     <div>{errors.description}</div>

//                                 ) : null}
//                             </div>
//                             <div>
//                                 <label htmlFor="location">Location</label>
//                                 <Field type="text" id="location" name="location" />
//                                 {errors.location && touched.location ? (
//                                     <div>{errors.location}</div>
//                                 ) : null}
//                             </div> */}
//                         </Form>
//                     )}
//                 </Formik>
//                 <ToastContainer />
//             </Container>
//         </div>
//     );
// }

// export default AddEdit;
