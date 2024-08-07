import axios from "axios";
import useApi from './jtQuery';

export class RestaurantAdminService {

  public static baseURL = 'https://64398acb4660f26eb1b5cf68.mockapi.io/restaurantListing'

  public static async getAllRestaurants({page, limit}) {
    const apiURI = `${this.baseURL}?page=${page}&limit=${limit}`;

    let responseData = await axios({
      method: "get",
      url: apiURI,
    });

    let responseCount = await axios({
      method: "get",
      url: this.baseURL,
    });

    console.log('responseData', responseCount, responseData)

    return {responseData, responseCount}

    //   const { isLoading, isFetching, isSuccess, isError, data, error, refetch } = useApi(
    //     baseUrl,'GET'
    // );

    //   return {isLoading, isFetching, isSuccess, isError, data, error, refetch }
  }

  public static async updateRestaurant(id: string) {
    const apiURI = `${this.baseURL}/${id}`;

    let responseData = await axios({
      method: "put",
      url: apiURI,
    });
    console.log('responseData', responseData)
    return responseData;
  }

  public static async addRestaurant(payload) {
    const apiURI = `${this.baseURL}`;

    let responseData = await axios.post(apiURI, payload);

    console.log('responseData', responseData)

    return responseData;
  }

  public static async deleteRestaurant(payload) {
    const apiURI = `${this.baseURL}/${payload}`;

    let responseData = await axios.delete(apiURI);

    console.log('responseData', responseData)

    return responseData;
  }


}