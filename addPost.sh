#! /bin/bash

curl -X POST \
-H "Content-Type: application/json" \
-d '{"name": "Roland", "msg": "Hello, hello!"}' \
http://localhost:3000/greetings
