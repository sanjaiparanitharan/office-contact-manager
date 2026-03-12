import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('office-records')

def lambda_handler(event, context):
    method = event['httpMethod']

    if method == "POST":
        body = json.loads(event['body'])
        item = {
            "id": str(uuid.uuid4()),
            "type": body.get("type", "contact"),
            "name": body.get("name"),
            "phone": body.get("phone"),
            "email": body.get("email"),
            "task": body.get("task", ""),
            "status": body.get("status","pending")
        }
        table.put_item(Item=item)
        return {"statusCode": 200, "body": json.dumps({"message": "Record added"})}

    elif method == "GET":
        response = table.scan()
        return {"statusCode": 200, "body": json.dumps(response["Items"])}

    elif method == "DELETE":
        body = json.loads(event['body'])
        table.delete_item(Key={"id": body["id"]})
        return {"statusCode": 200, "body": json.dumps({"message": "Record deleted"})}

    elif method == "PUT":
        body = json.loads(event['body'])
        record_id = body.get("id")
        if not record_id:
            return {"statusCode": 400, "body": json.dumps({"message": "ID is required"})}

        # Prepare update
        update_expr = "SET "
        expr_attr_vals = {}
        fields_to_update = []

        for field in ["name", "phone", "email", "task", "status"]:
            if field in body:
                fields_to_update.append(f"{field} = :{field[0]}")
                expr_attr_vals[f":{field[0]}"] = body[field]

        if not fields_to_update:
            return {"statusCode": 400, "body": json.dumps({"message": "No fields to update"})}

        update_expr += ", ".join(fields_to_update)

        table.update_item(
            Key={"id": record_id},
            UpdateExpression=update_expr,
            ExpressionAttributeValues=expr_attr_vals
        )

        return {"statusCode": 200, "body": json.dumps({"message": "Record updated"})}

    else:
        return {"statusCode": 405, "body": json.dumps({"message": "Method not allowed"})}


