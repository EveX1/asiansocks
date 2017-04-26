# AsianSocks Project
a nodeJs test project

## Todo
- compte dev Twitter  
- fichier de configuration YAML  
- récupérer flux twitter  
- extraire les infos: Tweet, user  
- extraire e-mail  
- création objet User  
- insertion BDD  

## Usage
- clone repo
- install dependencies with `npm install` 
- set configuration with `npm run config -- -ck twitterCustomerKey -cs twitterCustomerSecret -t twitterToken -ts twitterTokenSecret --ip localhost -p port --db database`
- launch app with `npm start -- -k your,keywords,separated,by,comas`
- launch server with `npm run server`

additional option : `-d 10000` -> delay in millisecond after wich application stops