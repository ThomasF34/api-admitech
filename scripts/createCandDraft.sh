#!/bin/bash

token=$(http POST :3000/utilisateur/connexion email=email@eleve.fr password=abcd)
http POST :3000/candidature \Authorization:"Bearer $token" < fixtures/newCandidatureDraft.json