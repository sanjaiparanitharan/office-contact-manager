Compress-Archive -Path lambda_function.py -DestinationPath function.zip -Force

aws lambda update-function-code `
--function-name office-records-api `
--zip-file fileb://function.zip