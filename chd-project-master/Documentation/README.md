------------------------------------------------------------------------------------------------- VOLTRON -------------------------------------------------------------------------------------------------



**Description:**

VOLTRON is an application on private Sawtooth network that creates a distributed ledger with a decentralized platform for making the transactions in automotive industry. 

VOLTRON app connects Supplier (produces individual vehicle parts from raw materials and sends it to manufacturer), Manufacturer (verify the details, makes the car and sends it to the distributer) and Distributer (verify the details and sends it to the customer). There is another participant, the Admin, who handles the role assinging. It enables us to supervise the timeline based flow of vehicle parts, improve transparency, prevents fraud and establish trust.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**System requirements:**

1. Operating system: Ubuntu 16.04
2. System RAM: 4 GB or above (recommended 8 GB)
3. Free System storage: 4 GB on /home

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Installation prerequisites:**

1. Docker must be installed in the system

2. Docker Compose must be installed

3. Ensure that NodeJS (version 8.15 ideally) is installed in the system. [For more information about NodeJS, go to https://nodejs.org]. 
   To check if installed, open a the terminal window and give the command
   ## node -v

4. If NodeJS is not installed, go to https://nodejs.org and download the compatible version (version 8.15) based on system OS, or go to the terminal window: and give the command
   # sudo apt-get install -y nodejs

5. Ensure that Docker is installed. [Docker is a platform for developers and system administrators to develop, ship, and run applications. For more information, go to https://www.docker.com].
   To check if installed, go to the terminal window: give the command
   # sudo docker --version

6. If Docker is not installed, go to the terminal window:
   SET UP THE REPOSITORY

   1. Update the apt package index:
      #sudo apt-get update
   2. Install packages to allow apt to use a repository over HTTPS:
      #sudo apt-get install \apt-transport-https \ca-certificates \curl \ gnupg-agent \software-properties-common
   3. Add Docker’s official GPG key:
      #curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   4. Use the following command to set up the stable repository.
      #sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu \(lsb_release -cs) \stable"
   
   INSTALL DOCKER CE

   1.Update the apt package index.
     #sudo apt-get update
   2.Install the latest version of Docker CE.
     #sudo apt-get install docker-ce
   3.Verify that Docker CE is installed correctly by running the hello-world image.
     #sudo docker run hello-world
     This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.

7. Ensure that Docker Compose is installed. Compose is a tool for defining and running multi-container Docker applications. To check if installed, go to the terminal window:
   # sudo docker-compose --version

8. If Docker Compose is not installed, go to the terminal window:
   # sudo apt-get update
   # sudo apt-get install docker-compose

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Instructions for Installation of Application:**

1. Download the folder "CHD Project"
2. Open a terminal inside the folder and give the command:
   # sudo docker-compose build
3. After building all the containers, give the command:
   # sudo docker-compose up
4. Open "Keys" file inside the Project folder
5. Now go to the chrome browser and go to http://localhost:3000
6. Now you can access the application using the corresponding roles private key
7. You can verify the state by ://localhost:8008/state
8. To terminate the app execution, go to the terminal window (where docker-compose is running) and give CTRL+C
9. Wait for docker-compose to gracefully shutdown. Then: give the command
   # sudo docker-compose down

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
