#!/bin/bash

token=$(http :3000/utilisateur/connexion email=email@eleve.fr password=abcd)
http :3000/candidature \Authorization:"Bearer $token" < fixtures/newCandidatureDraft.json