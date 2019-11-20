#!/bin/bash

token=$(http POST :3000/utilisateur/connexion email=email@administration.fr password=abcd)
http :3000/candidature/$1 \Authorization:"Bearer $token"