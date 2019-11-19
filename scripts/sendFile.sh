#!/bin/bash

token=$(http POST :3000/utilisateur/connexion email=email@eleve.fr password=abcd)
res=$(http POST :3000/document/upload \Authorization:"Bearer $token" fileName=test fileType=pdf)
signedUrl=$(echo $res | jq .signedUrl | tr -d \")

http --form PUT $signedUrl \Content-Type:'pdf' cv@scripts/test.pdf

echo $res | jq .url | tr -d \"