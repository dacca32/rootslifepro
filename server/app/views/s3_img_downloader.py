import boto3
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import os

s3_client = boto3.client('s3')
BUCKET_NAME = 'amzn-s3-rootslife-bucket'

s3ImgDownloader_bp = Blueprint('s3ImgDownloader_bp', __name__)

@s3ImgDownloader_bp.route('/get-images', methods=['GET'])
def get_images():
    # AWS S3 configuration
    S3_BUCKET = os.getenv('S3_BUCKET_NAME')
    REGION = os.getenv('S3_REGION')

    s3_client = boto3.client(
        's3',
        region_name=REGION,
        aws_access_key_id=os.getenv('S3_ACCESS_KEY'),
        aws_secret_access_key=os.getenv('S3_SECRET_KEY')
    )

    # List objects in the S3 bucket
    response = s3_client.list_objects_v2(Bucket=S3_BUCKET)
    image_urls = []

    # Generate the presigned URLs for each object
    for obj in response.get('Contents', []):
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': S3_BUCKET, 'Key': obj['Key']},
            ExpiresIn=3600)
        image_urls.append(url)

    return jsonify(image_urls)
