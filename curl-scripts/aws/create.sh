#!/bin/bash

API="http://localhost:4741"
URL_PATH="/post-image"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  -F "image=@/Users/christine/sei/projects/pictoramica-server/curl-scripts/plant.jpg" \
  -F "tag=Plant" \
  -F "caption=Test Pic" \

  echo
