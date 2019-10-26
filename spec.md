# Ensemble des routes accessiblent pour la plateforme de recrutement


### Candidatures

| VERB                                        | ROUTE                                            | PARAMETERS                                     | DESCRIPTIONS                                                                                      | DISPONIBLE POUR                   |
| ------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------- |
| GET                                         | /candidatures                                    | years, filliere, etats                         | Renvoie l'ensemble des candidatures                                                               | correspondant aux critères donnés | Administration |
| GET                                         | /candidature/{id}                                | None                                           | Renvoie la candidature désignée. Les informations sont renvoyée en fonction de l'authentification | Administration, Eleve             |
| POST                                        | /candidature                                     | TODO BODY                                      | créer une nouvelle candidature                                                                    | Eleve                             |
| POST                                        | /candidature/{id}/file                           | id: id de la candidature, fichier à ajouter en |
| TODO                                        | Ajoute un fichier a la candidature               | Eleve, Administration                          |
| PUT                                         | /candidature/{id}                                | id: id de la candidature, TODO BODY            | Met a jour la candidature                                                                         | Eleve, Administration             |
| TODO Comment on actualise l'état du dossier |                                                  |                                                |                                                                                                   | Eleve, Administration             |
| GET                                         | /candidature/{id}/referent                       | id: id de la candidature                       | Renvoie l'id du referent associé a la candidature ou null                                         | TODO                              |
| POST                                        | /candidature/{id}/referent                       | id: id de la candidature, TODO BODY            | Associe un referent avec la candidature donnée                                                    | Eleve                             |
| POST                                        | /candidature/{id}/recommandation                 | id: id de la candidature, TODO                 |
| BODY                                        | Ajoute la recommandation à la candidature donnée | Eleve, Referent                                |
| POST                                        | /candidature/{id}/oral                           | id: id de la candidature, TODO BODY            | Note l'oral de la candidature                                                                     | Jury                              |

### QCM

| VERB | ROUTE            | PARAMETERS                 | DESCRIPTIONS                                                          | DISPONIBLE POUR |
| ---- | ---------------- | -------------------------- | --------------------------------------------------------------------- | --------------- |
| GET  | /qcms            | filiere: IG or DO          | Renvoie l'ensemble des qcms respectant les critères donnés            | Administration  |
| POST | /qcm/{id}/assign | id: id d'un qcm, TODO BODY | Assigne l'ensemble des candidats donnés à  au qcm représenté par `id` | Administration  |

### Evenement

| VERB   | ROUTE                      | PARAMETERS                       | DESCRIPTIONS                                                                                                        | DISPONIBLE POUR            |
| ------ | -------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| GET    | /evenements                | dateDebut, dateFin               | Renvoie les évènements créés entre les dates données. Renvoie l'ensemble des évènements si aucune date n'est donnée | Administration,Entreprise  |
| GET    | /evenement/{id}            | id: id de l'évènement            | obtention de l'evenement                                                                                            | Administration,Entreprise  |
| PUT    | /evenement/{id}            | id: id de l'évènement, TODO BODY | Mise à jour de l'évènement                                                                                          | Administration             |
| DELETE | /evenement/{id}            | id: id de l'évènement            | Supprime l'évenement                                                                                                | Administration             |
| POST   | /evenement/{id}/participer | id: id de l'évenement            | Participer à l'évènement donné                                                                                      | Entreprise, Administration |
| POST   | /evenement/{id}/desister   | id: id de l'évenement            | Annule la participation à l'évènement donné                                                                         | Entreprise, Administration |


