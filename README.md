# Projet React

Ce projet est une application React. Ce guide vous aidera à configurer et à exécuter l'application en local.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (ou [yarn](https://yarnpkg.com/))

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/khaledyounesfounty/jo2024_front.git
    cd votre-repo
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```


## Exécution en Local

1. Configurez les variables d'environnement pour l'exécution en local. Ouvrez le fichier `.env` à la racine du projet et commentez la ligne suivante :
    ```plaintext
    # REACT_APP_BACKEND_URL=http://13.37.105.219:8080/api/v1
    ```
    et décommentez la ligne suivante :
    ```plaintext
    REACT_APP_BACKEND_URL=http://localhost:8080/api/v1
    ```

2. Démarrez le serveur de développement :
    ```bash
    npm start
    ```

3. Ouvrez votre navigateur et allez à l'adresse [http://localhost:3000](http://localhost:3000).

## Déploiement sur AWS

Pour déployer votre application sur AWS, suivez les étapes ci-dessous :

1. Configurez les variables d'environnement pour le déploiement sur AWS. Modifiez le fichier `.env` à la racine du projet et remplacez la ligne par :
    ```plaintext
    REACT_APP_BACKEND_URL=http://13.37.105.219:8080/api/v1
    ```

2. Construisez l'application pour la production :
    ```bash
    npm run build
    ```

3. Déployez le contenu du dossier `build` sur votre instance AWS. Vous pouvez utiliser un service comme [AWS S3](https://aws.amazon.com/s3/) pour héberger votre application ou [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) pour déployer l'application.

