Cotatio est un projet destiné à un ergonome pour l'aider dans son évaluation de la pénibilité-risque d'un poste de travail.

Pré-requis:

-Vérifier que Node (npm), Docker et Compose sont bien installés sur votre machine.

Installation:

-Télécharger le projet via git pull. Installer le projet de manière à avoir un premier dossier cotatio et, dans celui-ci 3 sous-dossiers nommés: cotatio-docker, cotatio-api et cotatio-ui.
Comme ceci:

/cotatio
    /cotatio-docker
    /cotatio-api
    /cotatio-ui

Puis placer vous dans le dossier cotatio-docker et lancer la commande suivante:

    docker-compose up -d

Cette commande va vous permettre de builder le projet en local.

Si vous recevez un message d'erreur, vérifier les volumes dans le fichier docker-compose.yml

Ensuite, lancer le script de migration qui va construire la base de données:

    docker-compose exec api yarn db-migrate up

Enfin, installer bcryptjs et jwt dans cotatio-api et cotatio-ui:

    npm install bcryptjs
    npm install jwt

    Si nécessaire relancer les containers Docker avec docker-compose up -d

Maintenant vous devriez pouvoir ouvrir le projet !

Démarrage:

    Lancer localhost:3000 dans votre navigateur

# app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
