# creates the user defined in cognito.json as a user in the userpool

import os
import json
# aws cognito-idp admin-set-user-password --user-pool-id ""  --username "" --password "" --permanent
# aws cognito-idp admin-create-user --user-pool-id ""  --username ""

data = json.load(open( "../cognito.json"))
create_user = 'aws cognito-idp admin-create-user --user-pool-id ' + data['userPoolId'] + '  --username "' + data['username'] + '"'
change_user = 'aws cognito-idp admin-set-user-password --user-pool-id ' + data['userPoolId'] + '  --username "' +data['username'] + '" --password "' + data['password'] + '" --permanent'
os.system(create_user)
os.system(change_user)