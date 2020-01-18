#Project Name : 
International Trade Finance 
			
##Group Members : 

1.Akhil Varghese
2.Denlis Ann
3.Mekha Krishnan M

###Description:

INNOVA is a simple Decentralized Application(DApp) for International Trade Finance that includes the verifications and confirmations of the trade finance documents by the Importer, Exporter, Importer's Bank, Exporter's Bank, Importer's Customs and Exporter's Customs. In traditional system, it takes 3-4 days for the trade document verifications. By implementing blockchain into this it got reduced to few hours.
In INNOVA, the DApp, the importer proposes the invoice and the exporter has to confirm that proposal. Then the Importer has to request to the importer's bank to approve the Letter of Credit Document that assures the guarantee for the payment to the exporter. Then the Importer's bank has to verify the documents and approve the Letter of Credit Request which is then confirmed by the Exporter's Bank. After the confirmation the Exporter sends the product to the Importer and the Item Send confirmation is added to blockchain. The financial documents are then verified (which is recorded in the blockchain) by the Exporter's Customs and hence the product is shipped to the importer. After the shipping the Importer pays to the Importer's Bank and the Importer's Bank receives the amount. After the confirmation of the payment the Importer's Customs verifies and handover the product to importer and the importer confirms the receival. The fund is transfered to the Exporter's Bank and from there to the Exporter.

####Prerequisites:

In order to run this project locally in your computer you need the following packages installed in your System and the commands to install the packages are given below:

1. You need to install Nodejs.

	<command> : npm install nodejs

2. Change directory to the project directory 
 
	<command> : cd ced-b3-g02/Project/

3. Run the following commands before the project is run:

	1. sudo apt-get install npm
	2. npm install
	3. npm install express-generator
	4. npm install web3
	5. npm install solc
	6. npm install truffle

4. After running the above commands :
    	1. Open a Terminal and go to 'geth' folder in 'Project'
	2. Initialize your node by creating the genesis block
       <command> :  geth --datadir data init genesis.json
	3. Now run the following command to start the private network:
       <command> :  geth --identity "miner" --networkid 4002 --datadir data --nodiscover --mine --rpc --rpcport "8545" --port "8191" --unlock 0,1,2,3,4,5,6 --ipcpath "./ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --allow-insecure-unlock
       <Note> : For all the accounts return (Press Enter) is the password
	4. Run the following command to attach a JavaScript console to the running network:
       <command> : geth attach ethereum/geth.ipc 
       Then set the coinbase account as the last account:
       <command> : miner.setEtherbase(eth.accounts[6])
       Run the following command to start and stop mining in the network respectively:
       <command> : miner.start()
       <command> : miner.stop()
	5. Now go to the Project folder in another terminal:
       <command> : cd ced-b3-g02/Project/
       Use the following command to deploy the smart contract to the connected chain:
       <command> : truffle migrate
	6. Run the dapp using the command:
       <command> : npm start
    	7. Go to the browser and enter the URL :  'http://localhost:3000/' 
       <Note> : Everytime you enter the url make sure that the 'db' folder inside 'Project' folder is empty.
    	8. Then Press the 'Start' button and Enter the Home Page of the DApp.
    	9. Check the workflow run the DApp accordingly.
		
	

	geth --testnet --syncmode 'light' --datadir 'ropsten' --unlock 0,1,2,3,4,5,6 --rpc --rpcapi 'db,eth,net,web3,personal' --cache=1024 --rpcport '8545' --rpcaddr '127.0.0.1' --rpccorsdomain '*' --allow-insecure-unlock console


#####Workflow of DApp:

	01. Click the Start button
	02. Click on Importer Login
	03. Navigate to Invoice -> Create Invoice
	04. Fill in the values and submit
	05. Go to home and click Exporter Login
	06. Navigate to Invoice -> Confirm Invoice
	07. Type Product ID and Confirm
	08. Navigate to Letter of Credit -> Request L/C in Importer page
	09. Fill in Letter of Credit and Submit
	10. In Importer's Bank page, navigate to Letter of Credit -> View L/C
	11. Then Approve the L/C by typing in Product id and Approve
	12. In Exporter's Bank page, navigate to Letter of Credit -> Confirm L/C
	13. In Exporter page, navigate to Confirmations -> Send Confirm
	14. Enter the Product ID and Confirm
	15. In Exporter's Customs page, navigate to Verification -> Confirm Verification
	16. Enter the Product ID and Verify
	17. In Importer page, navigate to Payments -> Send Ether
	18. Enter the Product ID and Amount and Pay
	19. In Importer's Bank page, navigate to Payments -> Recieve Ether
	20. Enter the Product ID and Amount and Receive
	21. In Importer's Customs page, navigate to Verification -> Confirm Verification
	22. Enter the Product ID and Confirm
	23. In Importer's Bank page, navigate to Payments -> Send Ether
	24. Enter the Product ID and Amount and Pay
	25. In Exporter's Bank page, navigate to Payments -> Recieve Ether
	26. Enter the Product ID and Amount and Receive
	27. In Exporter's Bank page, navigate to Payments -> Send Ether
	28. Enter the Product ID and Amount and Pay
	29. In Exporter page, navigate to Payments -> Recieve Ether
	30. Enter the Product ID and Amount and Receive
	