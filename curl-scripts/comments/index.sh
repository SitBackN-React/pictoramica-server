API="http://localhost:4741"
URL_PATH="/blogs/${BLOG_ID}/posts/${POST_ID}/comments/"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
