from botocore.exceptions import ClientError
import boto3


def upload_file(file_name, object_name):

    s3 = boto3.client("s3")
    bucket_name = "flashwiz-deckprofiles"
    ob_name = object_name.replace(" ", "")
    try:
        response = s3.upload_fileobj(file_name, bucket_name, ob_name, ExtraArgs={
            'ContentType': "image/jpeg"
        })
    except ClientError as e:
        print(e)
        return False

    return f"https://flashwiz-deckprofiles.s3.us-west-1.amazonaws.com/{ob_name}"
