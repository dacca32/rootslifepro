import { useEffect, useState } from "react";
import S3Service from "../../../services/s3/s3-service";
import { queryClient } from "../../../api/query-client";

export const S3ImagesQueryOptions = () => ({
    queryKey: ['images'],
    queryFn: () => S3Service.getAll(),
});


const S3ImageGallery = () => {

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const imgs = await queryClient.ensureQueryData(S3ImagesQueryOptions())
                setImageUrls(imgs);
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };

        fetchImageUrls();
    }, []);

    return (
        <div className="image-gallery">
            {imageUrls.map((url, index) => (
                <img key={index} src={url} width={250} height={250} alt={`S3 Image ${index + 1}`} />
            ))}
        </div>
    );
};

export default S3ImageGallery;
