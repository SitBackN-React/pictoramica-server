API="http://localhost:4741"
URL_PATH="/images/${IMAGE_ID}/imageLikes/${IMAGELIKE_ID}"

curl "${API}${URL_PATH}" \
--include \
--request DELETE \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \

echo
