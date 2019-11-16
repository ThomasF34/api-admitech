#!/bin/bash

token=$(http POST :3000/utilisateur/connexion email=email@eleve.fr password=abcd)
http POST :3000/candidature \Authorization:"Bearer $token" < fixtures/candidatures/candidatureDraft.json
http PUT :3000/candidature/2 \Authorization:"Bearer $token" < fixtures/candidatures/candidature2.json
