import axiosClient from '../../api/axios-client';
import { S3Endpoints } from '../../api/endpoints';

/**
 * Service class for handling S3-related API calls
 */
export default class S3Service {

    /**
     * s3 Download images function
     * @returns Promise
     */
    static async getAll(): Promise<string[]> {
        const response = await axiosClient.get(S3Endpoints.get_s3_images());
        return response.data;
    }

}