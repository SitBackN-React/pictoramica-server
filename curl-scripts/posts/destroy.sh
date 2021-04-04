#!/bin/bash

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${BLOG_ID}/posts/${POST_ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
