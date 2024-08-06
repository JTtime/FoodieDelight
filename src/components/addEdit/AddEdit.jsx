import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mockDataImport from '../../MOCK_DATA.json';

const initialValues
    = {
    restaurant_name: '',
    description: '',
    location: '',
    image: null,
};

const validationSchema = Yup.object().shape({
    restaurant_name: Yup.string().required('Restaurant name is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
    image: Yup.mixed()
        .required('Image is required')
        .test(
            'fileType',
            'Invalid file type (only JPG, JPEG, and PNG allowed)',
            (value) => {
                if (!value) return false;
                const allowedTypes = ['image/jpeg', 'image/png'];
                return allowedTypes.includes(value.type);
            }
        ),
});



function AddEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        restaurant_name: '',
        description: '',
        location: '',
        image: '',
    });
    const [mockData, setMockData] = useState([...mockDataImport]);

    const handleSubmit = (values, { setSubmitting }) => {
        const newRestaurant = {
            id: mockData.length + 1,
            ...values,
            image_url: URL.createObjectURL(values.image),
        };
        setMockData([...mockData, newRestaurant]);
        console.log('mockData', mockData)
        setSubmitting(false);
        toast.success('Restaurant added successfully!');
        // Here you would typically send data to your backend
    };

    useEffect(() => {
        if (id) {
            const restaurant = mockData.find(r => r.id === parseInt(id));
            setInitialValues(restaurant);
        } else {
            setInitialValues({
                restaurant_name: '',
                description: '',
                location: '',
                image_url: '',
            });
        }
    }, [id, mockData]);

    // const validationSchema = Yup.object({
    //   restaurant_name: Yup.string().required('Required'),
    //   description: Yup.string().required('Required'),
    //   location: Yup.string().required('Required'),
    //   image_url: Yup.string().url('Invalid URL'),
    // });

    // const handleSubmit = (values, { setSubmitting }) => {
    //     // Handle form submission (replace with API call later)
    //     console.log(values);
    //     setSubmitting(false);
    //     navigate('/');
    // };

    return (
        <div>
            <h1>{id ? 'Edit Restaurant' : 'Add Restaurant'}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div>

                            <label htmlFor="restaurant_name">Restaurant Name</label>
                            <Field type="text" id="restaurant_name" name="restaurant_name" />
                            {errors.restaurant_name && touched.restaurant_name ? (
                                <div>{errors.restaurant_name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" id="description" name="description" />
                            {errors.description && touched.description ? (
                                <div>{errors.description}</div>

                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <Field type="text" id="location" name="location" />
                            {errors.location && touched.location ? (
                                <div>{errors.location}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                            {errors.image && touched.image ? (
                                <div>{errors.image}</div>
                            ) : null}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Add Restaurant
                        </button>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </div>
    );
}


export default AddEdit