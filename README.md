Groupomania

P7 parcour développeur Web Openclassrooms 
Créez un réseaux social d'entreprise

________________________________________________
Informations globales sur les technologies utilisées sur ce projet:
React.js
Babel
Node.js
Express
Mysql 
Sequelize

Afin de pouvoir lancer le projet veuillez suivre les étapes ci-dessous :

procurez-vous :
Node.js
React.js
MySQL



Installation :
1 : Clonez le repository
2 : Installez les dépendances pour le backend et le frontend.
Pour ce faire ,entrez la commande 'cd backend ' pour vous rendre dans le dossier backend,puis lancer la commande "npm install" afin de bénéficier de toutes les dépendances du backend
nécessaire au bon fonctionnement de ce projet.

A partir d'un nouvel invit de commande ou en entrant ' cd .. ' dans le même invit de commande,
rendez-vous à nouveau à la racine du projet puis entrez la commande 'cd frontend' afin d'entrer dans le dossier frontend.
Lancez la commande 'npm install' pour recevoir les dépendances du frontend et pouvoir bénéficier de toutes les dépendances nécessaire au bon fonctionnement de la partie client de ce projet.


Environnement :
Pour pouvoir lancer le projet il faudra encore une étape.
Créez un fichier .env dans le backend avec les nom de variables d'environnement suivants :
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
PORT =
DB_DIALECT = 

puis créez un fichier .env dans le frontend avec le nom de variable d'environnement suivant :
REACT_APP_API_URL =

(Pour le mentor évaluateur ces fichiers seront déjà présent dans le projet complet sous format .zip afin de permettre un accès administrateur à nôtre base de données).

Lancement du projet : 
BACKEND
Une fois les dépendances acquises ,afin de lancer le projet ,rendez vous dans le dossier backend dans vôtre console (nouvel invit de commande + 'cd backend'),à partir de ce dossier
entrez la commande nodemon server afin de bénéficier du rafraichissement automatique en temps réel.

le backend fonctionnera sur le port 5000 ou à l'adresse ' http://localhost:5000/' par défaut.

FRONTEND
Une fois les dépendances du front acquises,afin de lancer le projet,rendez vous dans le dossier frontend dans vôtre console(nouvel invit de commande + 'cd frontend'),à partir de ce dossier entrez la commande npm start.

le frontend fonctionnera sur le port 3000 ou à l'adresse ' http://localhost:3000/' par défaut.

Base de données : 
Base de donnée MySQL / ORM sequelize.
Dump sql joint au projet
