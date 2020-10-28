# L2G
An application to push your leetcode solutions to github in an instant. A chrome extension coupled with local express server is used.

# Steps to get the application running
1) Install NodeJS
2) Follow this link to install NodeJS on your system. https://www.simplilearn.com/nodejs-installation-on-windows-and-ubuntu-article
3) Install MongoDB
4) Follow this link to install MongoDB on your system. https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514
5) Install Git
6) Follow this link to install Git on your system. https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/
7) Clone the repository.
8) Run ```npm install``` on terminal from project root
9) Update config.js as suggested
10) Add chrome extension by selecting extension folder (Will be publishing the extension shortly)
11) Follow this link to add chrome extension. https://thoughtbot.com/blog/how-to-make-a-chrome-extension#load-your-extension-into-chrome
12) Install Self Signed Certificate using OpenSSL.
13) ```openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256```
14) If the above command does not work, run OpenSSL provided by Git. It is usually found here. ```C:\Program Files\Git\usr\bin\openssl.exe```
15) Run this command. ```openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256```
16) Copy the generated files into ```<project_root>/src```

# Steps to use the application
1) Run Mongo Server
2) Follow this link to run Mongo Server. https://medium.com/stackfame/run-mongodb-as-a-service-in-windows-b0acd3a4b712
3) Start the server. 
4) Run ```npm run start``` on terminal from project root
5) Choose the problem you want to push. Scroll down till end of solution.
6) Open the extension and click on push.

# Note
You can choose to provide existing GitHub repo details or the application will create a new one if necessary.

