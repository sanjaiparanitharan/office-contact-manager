$API="YOUR_API_URL"

Write-Host "Adding contact..."

curl -Method POST `
-H "Content-Type: application/json" `
-Body '{"type":"contact","name":"Test User","phone":"123456"}' `
$API

Write-Host "Fetching records..."

curl $API