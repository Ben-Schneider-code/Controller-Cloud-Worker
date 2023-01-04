import json
import boto3

# create user pool with setting USER_PASSWORD_AUTH allowed
# add user with permanent password


data = json.load(open( "../cognito.json"))


logn = boto3.client('cognito-idp')
res = logn.initiate_auth(
    ClientId= data['userPoolClientId'],
    AuthFlow='USER_PASSWORD_AUTH',
    AuthParameters={
        'USERNAME': data['username'],
        'PASSWORD': data['password']
    }
)
print(res)
