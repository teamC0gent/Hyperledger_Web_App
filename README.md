Agri Supply chain application’s development setup and deployment guide:

1.	Installing prerequisites

Please follow these instructions to install the pre-requisites for installing Hyperledger Composer on a local Mac OS X machine. The following tools are to be installed before installing Hyperledger Fabric and Composer. 

Note: Mac OS X version 10.12.6 or above was used for these instructions.

The following are prerequisites for installing the required development tools:
•	Operating Systems: Mac OS 10.12 or higher
•	Docker Engine: Version 17.03 or higher
•	Docker Composer: version 1.8 or higher
•	Node: 8.9 or higher (note version 9 and higher is not supported)
•	Git: 2.9.x or higher
•	Python: 2.7.x
•	A code editor (we installed visual studio code)

The installation setup is followed from the Hyperledger website:
https://hyperledger.github.io/composer/latest/installing/installing-prereqs

1.1	Install nvm (node version manager) and Apple Xcode

In the terminal window execute the command below:

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
 
When the above command is being executed, a pop-up appears prompting you to install git and Apple Xcode IDE if not installed earlier.

Execute the following commands on Terminal window 
•	$ touch .bash_profile (stores user preferences for bash).
•	Rerun the original curl command: 
$curl-o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
close the terminal and reopen it.
•	Check nvm is installed and is accessible 
$ nvm --version 
1.2	Install Node

•	Install Node 8.9 or higher (note version 9 or higher is not supported)
		$ nvm install v8.9
•	Check that Node s installed
$ node –version

1.3	Install Docker

Follow the instructions here to install Docker for Mac: https://docs.docker.com/docker-for-mac/install/

1.4	Install VSCode and install the Hyperledger Composer Extension for VSCode

•	Install VSCode by visiting https://code.visualstudio.com

•	Launch VSCode and go to “Extensions”, search for and install Hyperledger Composer extension. Once the install completes you need to press the Reload button to activate the extension.

2.	Installing Components

2.1	Install the CLI tools

There are a few useful CLI tools for Composer developers, composer -cli is the most important tool.

Note: please do not use su or sudo for the following npm commands.

•	Essential CLI tools:
$ npm install -g composer-cli@0.20
•	Utility for running a REST Server on your machine to expose your business networks as RESTful APIs:
$ npm install -g composer-rest-server@0.20
•	Useful utility for generating application assets:
$ npm install -g generator-hyperledger-composer@0.20
•	Yeoman is a tool for generating applications, which utilizes generator hyperledger composer:
$ npm install -g yo

2.2	Install Playground

Install composer to run it locally on the development machine and to generate the end services.

Browser app for editing and testing Business Networks:
$ npm install -g composer-playground@0.20


3.	Install and start Hyperledger Fabric

This step gives a local Hyperledger Fabric runtime to deploy business networks.

•	Clone the source code to the local machine from GitHub repository
https://github.com/teamC0gent/Hyperledger_Web_App.git

•	Open terminal and go to /agriblockchain directory (contains business logic of the product) in the source code path, for example below
$ cd /Users/Bindu /agriblockchain

•	In the directory path like above get “.tar.gz”  file that contains the tools to install Hyperledger Fabric using the command below:
$ curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz tar -xvf fabric-dev-servers.tar.gz

•	Use the scripts just downloaded and extracted to download a local Hyperledger Fabric v1.2 runtime:
$ cd /Users/Bindu /agriblockchain
export FABRIC_VERSION=hlfv12
./downloadFabric.sh

•	The first time start up a new runtime, fabric start script needs to run, then generate a PeerAdmin card
$ ./startFabric.sh
    	         ./createPeerAdminCard.sh

start and stop the runtime using $…/agriblockchain /stopFabric.sh and start it again with $…/ agriblockchain /startFabric.sh.


4.	Generate a business network archive

•	For business network the folder has already been created in the following path of the source code and using the command line navigate to that directory.
$ cd /Users/Bindu /agriblockchain/ agriblockchain
•	Then run the following command:
$composer archive create -t dir -n .

After the command has run, a business network archive file called agriblockchain@0.0.1.bna has been created in the agriblockchain/agriblockchain directory.
    
5.	Deploying the business network

•	To install the business network, from the agriblockchain/agriblockchain directory, run the following command:
$ composer network install --card PeerAdmin@hlfv1 –archiveFile agriblockchain@0.0.1.bna
•	To start the business network, run the following command:
$ composer network start --networkName agriblockchain --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

•	To import the network administrator identity as a usable business network card, run the following command:
$ composer card import --file networkadmin.card

•	To check that the business network has been deployed successfully, run the following command to ping the network:
$ composer network ping --card admin@agriblockchain

6.	Generating a REST server

•	To create the REST API, navigate to the agriblockchain/agriblockchain directory and run the following command:
$ composer-rest-server

•	Enter admin@agriblockchain as the card name.
•	Select never use namespaces when asked whether to use namespaces in the generated API.
•	Select No when asked whether to secure the generated API.
•	Select Yes when asked whether to enable event publication.
•	Select No when asked whether to enable TLS security.
•	Open browser and go to the following link: http://localhost:3000/explorer/#/

The generated API is connected to the deployed blockchain and business network.

7.	Deploy Web application

•	Open another Terminal window and go to /Agri_UI directory (contains UI of the web application) in the downloaded source code path.
$ cd Agri_UI
•	Then run the following command:
$ npm install express
•	Then run node server
$ node server.js
•	Open browser and go to the following link: http://localhost:8000/

The Web application is launched and ready for the usage.
