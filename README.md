# Admitech

![Logo admmitech](https://user-images.githubusercontent.com/32480223/67026906-f68d5280-f108-11e9-8d42-b9a836db4a4b.png)

Recrutment platform for IG & DO courses in Polytech Montpellier

Team : Lucas Gonçalves, Inès Missoum, Fatima Machhouri, Thomas Falcone, Raphael
Luciano, Martin Cayuelas

# Deploy

For information:
```
apps:create api-admitech
apps:create test-api-admitech

docker-options:add api-admitech build --build-arg "DD_API_KEY=<datadog api key>"
docker-options:add test-api-admitech build --build-arg "DD_API_KEY=<datadog api key>"

config:set api-admitech DD_API_KEY=<datadog api key>
config:set test-api-admitech DD_API_KEY=<datadog api key>

proxy:ports-add api-admitech http:80:3000
proxy:ports-add test-api-admitech http:80:3000
```

# Routes

Chaque route peut renvoyer un code 500 en cas d'erreur du côté du serveur

## Candidatures

- [x] GET - `/candidature` - Renvoie l'ensemble des candidatures
  * 200 - Quelques attributs pour toutes les candidatures : `status`, `branch`, `first_name`, `last_name`
  * 204 - Pas de candidature à afficher
  * 401 - L'utilisateur doit être connecté
  * 403 - L'utilisateur connecté ne peut accéder à la ressource

- [x] GET - `/candidature/:id` - Renvoie toutes les informations d'une candidature en prenant en compte le rôle de l'utilisateur connecté
  * 200 - Toutes les infos de la candidature
  * 401 - L'utilisateur ne peut accéder à la page sans être connecté
  * 403 - L'utilisateur connecté ne peut accéder à la ressource
  * 404 - La candidature demandée n'a pas été trouvée

- [ ] POST - `/candidature` - Créer une nouvelle candidature. Si le status envoyé est `draft` alors aucune vérification sur les champs `null` n'est effectuée. Sinon des vérifications sont faites et une erreur 400 peut être envoyée.
  * 201 - Candidature créée
  * 400 - Un ou des élèments ne vont pas dans la candidature. Dans la réponse se trouve un champ `errors` contenant un tableau de `string` décrivant les erreurs
  * 401 - L'utilisateur doit être connecté pour réaliser l'action
  * 403 - L'utilisateur connecté ne peut accéder à la ressource

## Utilisateurs

- [ ] GET - `/profile` - Obtenir le profil de l'utilisateur connecté
  * 200 - Info renvoyée : first_name, last_name, email, candidatures (seulement `status`, `branch` et `id`)
  * 401 - L'utilisateur doit être connecté

- [x] POST - `/utilisateur/connexion` - Connexion d'un utilisateur
  * BODY - Doit contenir `email` et `password`
  * 200 - Utilisateur connecté. Contient `token`
  * 404 - Utilisateur non trouvé ou mot de passe incorrect. Pour des raisons de sécurité, c'est la même erreur qui est renvoyée dans les deux cas.