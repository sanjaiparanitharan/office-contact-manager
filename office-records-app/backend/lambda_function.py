import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('office-records')

def lambda_handler(event, context):

    method = event['httpMethod']

    # CREATE RECORD
    if method == "POST":
        body = json.loads(event['body'])

        item = {
            "id": str(uuid.uuid4()),
            "type": body.get("type"),
            "name": body.get("name"),
            "phone": body.get("phone"),
            "email": body.get("email"),
            "task": body.get("task"),
            "status": body.get("status","pending")
        }

        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Record added"})
        }

    # GET RECORDS
    if method == "GET":

        response = table.scan()

        return {
            "statusCode": 200,
            "body": json.dumps(response["Items"])
        }

    # DELETE RECORD
    if method == "DELETE":

        body = json.loads(event['body'])

        table.delete_item(
            Key={"id": body["id"]}
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Record deleted"})
        }




