                                                
----------------------------------------------------- VOLTRON -----------------------------------------------------


Note:**Use the Correct Private Key of each Roles for transactions because of Implementation of permission** 

**UI  User Guide**
1. Open http://localhost:3000 in the chrome browser.

2. Navigates to the VOLTRON 'Home page'.

3. Navigate to 'ADMIN' login page, fill the form:
   Admin PrivateKey: The key you obtained by key generation [permission is set only for Admin]
   #LOGIN [submit the form]
   
4 Navigate to 'ASSIGN ROLE' page or 'DELETE ROLE' page
4.1 Navigate to 'ASSIGN ROLE' page, fill the fields in the forms:
    Public key: Public Key of each participants [permission is set respectively]
    Role: Roles of each participants [roles are predefined]
    #ASSIGN [submit the form]
4.2 Navigate to 'DELETE ROLE' page, fill the fields in the forms:
    Public key: Public Key of each participants
    Role: Roles of each participants
    #DELETE [submit the form]

5. Navigate to 'SUPPLIER' page, fill all the fields in the forms:
   Supplier's Private Key: Type the key corresponding to the Supplier
   Item ID: Item ID should be unique for each product
   Item Name: Name of the product
   Date of Export: Select the Export date
   #ADD ITEM [submit the form]

6. Navigate to 'MANUFACTURER'page, select "VERIFY RECIEVED PRODUCT" or "ADD ASSEMBLED PRODUCT"
6.1 Navigate to 'VERIFY RECIEVED PRODUCT'page, fill the fields in the forms:
    Manufacturer's PrivateKey: Type the key corresponding to the Sender ID
    In the table enter "Supplier Public Key"
    #VERIFY PRODUCT [submit the form]
6.2 Navigate to 'VERIFY RECIEVED PRODUCT'page, fill all the fields in the forms:
    Manufacturer's PrivateKey: Type the key corresponding to the Sender ID
    Product ID: Product ID should be unique for each product
    Product Name: Name of the product
    Manufacturer Name: Name of the Manufacturer
    Date of Manufacturing : select the Manufacturing date
    #ADD VEHICLE[submit the form]


7. Navigate to 'DISTRIBUTER' page, fill all the fields in the forms:
   Distributer PrivateKey: Type the key corresponding to the Sender ID
   Vehicle id : Select the Vehicle's ID
   Name of the Distributer: Select the Distributer's name
   Fill the table with Manufacturer's Public Key to verify


8. Navigate to 'CUSTOMER' page
   Enter the Vehicle ID
   Table will show the details
    
---------------------------------------------------------------------------------------------------------------------

