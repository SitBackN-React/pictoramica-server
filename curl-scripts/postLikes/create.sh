API="http://localhost:4741"
URL_PATH="/blogs/${BLOG_ID}/posts/${POST_ID}/postLikes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "postLike": {
      "liked": '${LIKED}'
    }
  }'

echo
