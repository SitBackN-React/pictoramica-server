API="http://localhost:4741"
URL_PATH="/images"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "image": {
      "tag": "'"${TAG}"'",
      "caption": "'"${CAPTION}"'",
      "imageUrl": "'"${IMAGE}"'",
      "forSale": "'"${SALE}"'",
      "price": "'"${PRICE}"'"
    }
  }'

echo
