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
  * 200 - Quelques attributs pour toutes les candidatures : `status`, `branch`, `first_name`, `last_name`, `jury` : [{first_name: <firstname>, last_name: <lastname>}], `mark`, `mcq` : id du qcm assigné, s'il existe
  * 204 - Pas de candidature à afficher
  * 401 - L'utilisateur doit être connecté
  * 403 - L'utilisateur connecté ne peut accéder à la ressource

- [x] POST - `/candidature` - Créer une nouvelle candidature.`Si le champ `draft` est à `true` alors aucune vérification de cohérence sur les champs n'est effectuée. Sinon des vérifications sont faites et une erreur 400 peut être envoyée.
  * 201 - Candidature créée
  * 400 - Un ou des élèments ne vont pas dans la candidature. Dans la réponse se trouve un champ `errors` contenant un tableau de `string` décrivant les erreurs
  * 401 - L'utilisateur doit être connecté pour réaliser l'action
  * 403 - L'utilisateur connecté ne peut accéder à la ressource

- [x] GET - `/candidature/:id` - Renvoie toutes les informations d'une candidature en prenant en compte le rôle de l'utilisateur connecté
  * 200 - Toutes les infos de la candidature
  * 401 - L'utilisateur ne peut accéder à la page sans être connecté
  * 403 - L'utilisateur connecté ne peut accéder à la ressource
  * 404 - La candidature demandée n'a pas été trouvée

- [x] PUT - `/candidature/:id` - Met à jour une candidature. Si le champ `draft` est à `true` alors aucune vérification de cohérence sur les champs n'est effectuée. Sinon des vérifications sont faites et une erreur 400 peut être envoyée.
  * 200 - Candidature mise à jour
  * 400 - Un ou des élèments ne vont pas dans la candidature. Dans la réponse se trouve un champ `errors` contenant un tableau d'objet `{id: <fieldName>, error: <error>}` décrivant l'incohérence.
  * 401 - L'utilisateur doit être connecté pour réaliser l'action
  * 403 - L'utilisateur connecté ne peut accéder à la ressource
  * **Il est important de noter que les pièces jointes ne sont pas mise à jour via cette route ! Utilisez plutôt les routes `/document`**

## Utilisateurs

- [x] GET - `/profil` - Obtenir le profil de l'utilisateur connecté
  * 200 - Info renvoyée : first_name, last_name, email, candidatures (seulement `status`, `branch` et `id`)
  * 401 - L'utilisateur doit être connecté

- [x] POST - `/utilisateur/connexion` - Connexion d'un utilisateur
  * BODY - Doit contenir `email` et `password`
  * 200 - Utilisateur connecté. Contient `token`
  * 404 - Utilisateur non trouvé ou mot de passe incorrect. Pour des raisons de sécurité, c'est la même erreur qui est renvoyée dans les deux cas.

## Documents

- [x] DELETE - `/candidature/:candId/document/:docId` - Supprime une piece jointe
  * 204 - Pièce jointe supprimée
  * 401 - L'utilisateur doit être connecté
  * 404 - La candidature ou la pièce n'ont pas été trouvée
  * 403 - Interdit

- [x] POST - `/document/upload` - Obtention d'une adresse s3 signée pour upload un fichier
  * BODY - Doit contenir `fileName` et `fileType`
  * 200 - URL renvoyée. Contient `url`
  * 401 - L'utilisateur doit être connecté
  * 403 - Interdit

- [x] GET - `/document/access?key=<fileKey>` - Obtention d'une adresse s3 signée pour accéder à un fichier
  * 200 - URL renvoyée
  * 400 - Le paramètre `key` est obligatoire
  * 401 - L'utilisateur doit être connecté
  * 403 - Interdit


### Candidature GET ou POST

3 différents modèles définissant la candidature

- Candidatures : https://github.com/ThomasF34/api-admitech/blob/feature/users-integration/src/models/candidature.ts
- Attachment (Piece jointe des candidatures) : https://github.com/ThomasF34/api-admitech/blob/feature/users-integration/src/models/attachment.ts
- Past experience : https://github.com/ThomasF34/api-admitech/blob/feature/users-integration/src/models/pastyearexp.ts

POST et GET sous forme de JSON
```
{
    "address": "somewhere",
    "admin_comment": "eleve a rejeter",
    "attachments": [
        {
            "attach_type": "cover_letter",
            "key": "1234.pdf"
        }
    ],
    "bac_mention": "bien",
    "bac_name": "un bac",
    "bac_realname": "un super bac",
    "bac_year": 2009,
    "birth_date": "2019-11-12",
    "birth_place": "montpellier",
    "branch": "do",
    "candidate_comment": "je suis content ",
    "certified": true,
    "certified_at": "2019-11-12T09:20:10.057Z",
    "city": "montpellier",
    "experiences": [
        {
            "degree": false,
            "facility_name": "une ecole",
            "facility_place": "a montpellier",
            "mean": "10",
            "name": "une formation",
            "ranking": "4/200",
            "rating": "4",
            "year": "2019"
        }
    ],
    "family_status": "single",
    "first_lang_level": "great",
    "first_lang_name": "anglais",
    "first_name": "Alice",
    "internships": "Franchement j'ai fait des stages trop bien",
    "it_knowledge": "bon là j'ai plus d'inspi par contre",
    "last_facility_address": "somewhere",
    "last_facility_city": "montpellier",
    "last_facility_name": "un etablissement",
    "last_facility_postal_code": "34000",
    "last_facility_state": "france",
    "last_name": "Dupond",
    "nationnality": "Français",
    "native_lang_name": "français",
    "other_apply": false,
    "other_apply_apprentise": null,
    "other_apply_name": null,
    "other_apply_place": null,
    "phone": null,
    "postal_code": "34000",
    "second_lang_level": "great",
    "second_lang_name": "italien",
    "sports_interests": "du sport ? ",
    "state": "france",
    "status": "REFUSE",
    "strengths": "mhhhh....",
    "third_lang_level": null,
    "third_lang_name": null,
    "travels": "j'ai aussi voyagé",
}
```


Contraintes sur les candidatures :
```
queryInterface.addConstraint('candidatures', ['family_status'], {
        type: 'check',
        where: {
          family_status: ['married', 'single', 'other']
        }
      }),
      queryInterface.addConstraint('candidatures', ['first_lang_level'], {
        type: 'check',
        where: {
          first_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('candidatures', ['second_lang_level'], {
        type: 'check',
        where: {
          second_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('candidatures', ['third_lang_level'], {
        type: 'check',
        where: {
          third_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('candidatures', ['branch'], {
        type: 'check',
        where: {
          branch: ['do', 'se']
        }
      }),
```

Contraintes des utilisateurs :

```
await queryInterface.addConstraint('users', ['role'], {
      type: 'check',
      where: {
        role: ['eleve', 'administration', 'referant', 'entreprise']
      }
    });

    return queryInterface.addConstraint('users', ['email'], {
      type: 'unique'
    })
```


Contrainte sur les attachments :
```
 return await queryInterface.addConstraint('attachments', ['attach_type'], {
      type: 'check',
      where: {
        attach_type: ['cover_letter', 'cv', 'bac_marks', 'year_marks', 'degree', 'current_year_marks', 'notice_further_study']
      }
```

## Erreurs possibles lors de la creation des candidatures

**Si un des champs suivant est manquant**
```js
['first_name', 'last_name', 'phone', 'first_name', 'last_name', 'nationnality', 'birth_date', 'birth_place', 'family_status', 'address', 'postal_code', 'city', 'state', 'bac_name', 'bac_year', 'bac_mention', 'bac_realname', 'last_facility_name', 'last_facility_address', 'last_facility_postal_code', 'last_facility_city', 'last_facility_state', 'native_lang_name', 'first_lang_name', 'first_lang_level', 'internships', 'travels', 'it_knowledge', 'sports_interests', 'strengths', 'other_apply', 'branch', 'certified']
```
Réponse
```
        {
            "error": "Ce champ est obligatoire",
            "id": "branch"
        },
```
---
**Si une langue est indiquée mais son niveau ne l'est pas (ou inversement)**

Réponse :
```
        {
            "error": "Vous devez entrer un niveau et un nom pour cette langue",
            "id": "third_lang_name"
        }
```
---
**Si le candidat a indiqué qu'il avait une candidature dans une autre formation sans donner plus d'information dans les champs suivant**
```js
['other_apply_name', 'other_apply_place', 'other_apply_apprentise']
```

Réponse :
```
        {
            "error": "Vous avez indiqué que vous avez d'autre(s) candidature(s). Ce champ est donc obligatoire",
            "id": "other_apply_place"
        }
```

## Entretiens

- [x] GET - `/entretien/etudiant/:candId` - Récupère l'entretien de la candidature associée

- [x] POST - `/entretien` - Création d'un entretien
- [x] POST - `/entretien/etudiant/affecter` - Création d'un entretien

- [x] GET - `/entretien/formation/:nomFormation/disponible` - Récupère
  * 200 - URL renvoyée
  * 400 - Le paramètre `key` est obligatoire
  * 401 - L'utilisateur doit être connecté
  * 403 - Interdit
