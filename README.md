This is a basic forum app built with [Deno](https://deno.land/) which is very
likely to become the new next-generation Node.js. Deno is secure by default, no
file, network, environment access, unless explicitly enabled. It supports
TypeScript out of the box, ships only a single executable file. No more
package.json and node_modules. With Deno you import code via URL, making it
possible for package creators to host their code wherever they prefer -
decentralization at its finest.

Our app uses [DenoDB ORM](https://eveningkid.com/denodb-docs/) to connect to
MySQL database.

Our app also uses [Denon](https://deno.land/x/denon@2.4.10) which is nodemon for
Deno to automatically restart the process when your code changes.

I will show how to host our Deno app on Heorku, how to install Deno buildpack on
Heroku and how to install ClearDB MySQL Database on Heroku and connect. The
app's backend code is hosted on [Heroku](https://denoforums.herokuapp.com/) and
you can test forums' REST API endpoint
[here](https://denoforums.herokuapp.com/api/forums)

App's frontend is built with React Hooks and hosted on
[Firebase](https://denoforums.web.app/)

To get started for local development.

Install [Deno](https://deno.land/) Install
[MySQL Database](https://www.mysql.com)

```
       You should downgrade Deno after the intallation.
       deno upgrade –version 1.16.3 
       
       You should also install a forked version of Denon which goes with Deno 1.16.3.
       deno install -qAf --unstable https://raw.githubusercontent.com/denosaurs/denon/main/denon.ts

       Clone the repository
       git https://github.com/Ashot72/Deno-Forum
       
       # Deno App (backend)
         cd Deno-Forum/backend
         denon start   (start Deno app)

       # React Hook App (frontend)
        cd Deno-Forum/frontend
        npm install (install dependencies)
        npm start (start React Hook app)
```

Go to [Deno Forum Video](https://youtu.be/YPhfLHlShHs) page

Go to [Deno Forum description](https://github.com/Ashot72/Deno-Forum/index.html)
page
