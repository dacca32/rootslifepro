import React, { useState, ChangeEvent } from 'react';
import AWS from 'aws-sdk';

const ImageUploader: React.FC = () => {

    const [file, setFile] = useState<any>(null);

    const uploadFileToS3 = async () => {
        const S3_BUCKET = import.meta.env.VITE_S3_BUCKET_NAME as string;
        const REGION = import.meta.env.VITE_S3_REGION;

        AWS.config.update({
            accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY as string,
            secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY as string,
        });

        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: file.name as string,
            Body: file,
        };

        const upload = s3.putObject(params).on("httpUploadProgress", (evt: AWS.S3.ManagedUpload.Progress) => {
            console.log("uploading image " + ((evt.loaded * 100) / evt.total) + "%");
        }).promise();

        try {
            const data = await upload;
            console.log('Upload successful:', data);
            alert("File uploaded successfully");
        } catch (err) {
            console.log('Error:', err);
            alert("File upload failed");
        }
    };




    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFileToS3}>Upload</button>
        </div>
    );
};

export default ImageUploader;
