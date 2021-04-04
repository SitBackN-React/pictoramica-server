#!/bin/sh
# ID="5f66479fdb90952e210a10d6"
API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
