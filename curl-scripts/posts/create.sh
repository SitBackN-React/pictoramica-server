#!/bin/bash

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${BLOG_ID}/posts" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "post": {
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'"
    }
  }'

echo
