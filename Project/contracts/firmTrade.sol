pragma solidity ^0.5.0;

contract firmTrade{
    //Structures
    //To get the Invoice Details
    struct invoiceDetails{
        uint productId;
        string productName;
        string importerName;
        address importerAddr;
        string exporterName;
        address exporterAddr;
        uint productQuantity;
        uint pricePerUnit;
        uint totalPrice;
    }
    //To get the LC Request Details
    struct lcReq{
        uint productId;
        string exporterBankName;
        address exporterBankAddr;
        string importerBankName;
        address importerBankAddr;
        uint totalAmount;
    }
    //To get the Order Confirmation Details
    struct orderDetails{
        uint i_createInvoice;
        uint e_confirmInvoice;
        uint i_requestLC;
        uint bi_approveLC;
        uint be_confirmLC;
        uint e_itemSend;
        uint ce_verification;
        uint ci_verification;
        uint i_itemReceive;
    }
    //To get Fund Transfer Confirmation Details
    struct fundDetails{
        uint i_fundTransfer;
        uint bi_fundReceive;
        uint bi_fundTransfer;
        uint be_fundReceive;
        uint be_fundTransfer;
        uint e_fundReceive;

    }
    //Variables
    address public expAddress;
    address public impAddress;
    address public expBankAddress;
    address public impBankAddress;
    address public expCustAddress;
    address public impCustAddress;
    // Modifiers
    modifier onlyImporter{
        require(msg.sender == impAddress);
        _;
    }
    modifier onlyExporter{
        require(msg.sender == expAddress);
        _;
    }
    modifier onlyImpBank{
        require(msg.sender == impBankAddress);
        _;
    }
    modifier onlyExpBank{
        require(msg.sender == expBankAddress);
        _;
    }
    modifier onlyImpCust{
        require(msg.sender == impCustAddress);
        _;
    }
    modifier onlyExpCust{
        require(msg.sender == expCustAddress);
        _;
    }
    //Mappings
    mapping(uint=>invoiceDetails) public invoiceDetailsMapping;
    mapping(uint=>lcReq) public lcReqMapping;
    mapping(uint=>orderDetails) public orderDetailsMapping;
    mapping(uint=>fundDetails) public fundDetailsMapping;
    //Constructor
    constructor(address _a0, address _a1, address _a2, address _a3, address _a4, address _a5) public {
        expAddress = _a0;
        impAddress = _a1;
        expBankAddress = _a2;
        impBankAddress = _a3;
        expCustAddress = _a4;
        impCustAddress = _a5;
    }
    function setInvoiceDetails(uint _productId, string memory _productName, string memory _importerName, address _importerAddr, string memory _exporterName, address _exporterAddr, uint _productQuantity, uint _pricePerUnit) public onlyImporter{
        require(orderDetailsMapping[_productId].i_createInvoice == 0);
        invoiceDetailsMapping[_productId].productId = _productId;
        invoiceDetailsMapping[_productId].productName = _productName;
        invoiceDetailsMapping[_productId].importerName = _importerName;
        invoiceDetailsMapping[_productId].importerAddr = _importerAddr;
        invoiceDetailsMapping[_productId].exporterName = _exporterName;
        invoiceDetailsMapping[_productId].exporterAddr = _exporterAddr;
        invoiceDetailsMapping[_productId].productQuantity=_productQuantity;
        invoiceDetailsMapping[_productId].pricePerUnit=_pricePerUnit;
        invoiceDetailsMapping[_productId].totalPrice=invoiceDetailsMapping[_productId].productQuantity * invoiceDetailsMapping[_productId].pricePerUnit;
        orderDetailsMapping[_productId].i_createInvoice = 1;
    }
    //Get Invoice Details
    function getInvoiceDetails(uint _productId)public view returns(string memory _productName, string memory _importerName,address _importerAddr, string memory _exporterName,address _exporterAddr, uint _productQuantity, uint _pricePerUnit,uint _totalPrice){ 
        _productName = invoiceDetailsMapping[_productId].productName;
        _importerName = invoiceDetailsMapping[_productId].importerName;
        _importerAddr = invoiceDetailsMapping[_productId].importerAddr;
        _exporterName = invoiceDetailsMapping[_productId].exporterName;
        _exporterAddr = invoiceDetailsMapping[_productId].exporterAddr;
        _productQuantity = invoiceDetailsMapping[_productId].productQuantity;
        _pricePerUnit = invoiceDetailsMapping[_productId].pricePerUnit;
        _totalPrice = invoiceDetailsMapping[_productId].totalPrice;
    }
    //Create LC Request
    function setLCReq(uint _productId, string memory _importerBankName, address _importerBankAddr, string memory _exporterBankName,  address _exporterBankAddr, uint _totalAmount) public onlyImporter{
    require(_totalAmount == invoiceDetailsMapping[_productId].totalPrice);
    require(orderDetailsMapping[_productId].e_confirmInvoice == 1 && orderDetailsMapping[_productId].i_requestLC == 0);
    lcReqMapping[_productId].productId = _productId;
    lcReqMapping[_productId].importerBankName = _importerBankName;
    lcReqMapping[_productId].importerBankAddr = _importerBankAddr;
    lcReqMapping[_productId].exporterBankName = _exporterBankName;
    lcReqMapping[_productId].exporterBankAddr = _exporterBankAddr;
    lcReqMapping[_productId].totalAmount = _totalAmount;
    orderDetailsMapping[_productId].i_requestLC = 1;
    }
    //Get LC Details
    function getLCReq(uint _productId)public view returns(string memory _productName, string memory _importerName, string memory _importerBankName, address _importerBankAddr, string memory _exporterName, string memory _exporterBankName, address _exporterBankAddr,uint _totalAmount){
    _productName = invoiceDetailsMapping[_productId].productName;
    _importerName = invoiceDetailsMapping[_productId].importerName;
    _importerBankName = lcReqMapping[_productId].importerBankName;
    _importerBankAddr = lcReqMapping[_productId].importerBankAddr;
    _exporterName = invoiceDetailsMapping[_productId].exporterName;
    _exporterBankName = lcReqMapping[_productId].exporterBankName;
    _exporterBankAddr = lcReqMapping[_productId].exporterBankAddr;
    _totalAmount = lcReqMapping[_productId].totalAmount;
    }
    //To transfer the amount from importer's account to the contract
    function importerPay(uint _productId, uint _amount) public payable onlyImporter{
        require(orderDetailsMapping[_productId].ce_verification == 1 && fundDetailsMapping[_productId].i_fundTransfer == 0);
        require(_amount == lcReqMapping[_productId].totalAmount);
        fundDetailsMapping[_productId].i_fundTransfer = 1;
    }
    //To receive the amount from the contract account to importer's bank
    function getImpBankAmount(uint _productId,uint _amt, uint _amount) public onlyImpBank {
        require(fundDetailsMapping[_productId].i_fundTransfer == 1 && fundDetailsMapping[_productId].bi_fundReceive == 0);
        require(_amt == lcReqMapping[_productId].totalAmount);
        msg.sender.transfer(_amount);
        fundDetailsMapping[_productId].bi_fundReceive = 1; 
    }
    //To transfer the amount from importer's bank's account to the contract
    function importerBankPay(uint _productId, uint _amount) public onlyImpBank payable{
        require(orderDetailsMapping[_productId].i_itemReceive == 1 && fundDetailsMapping[_productId].bi_fundTransfer == 0);
        require(_amount == lcReqMapping[_productId].totalAmount);
        fundDetailsMapping[_productId].bi_fundTransfer = 1;  
    }
    //To receive the amount from the contract account to exporter's bank
    function getExpBankAmount(uint _productId,uint _amt, uint _amount) public onlyExpBank payable{
        require(fundDetailsMapping[_productId].bi_fundTransfer == 1 && fundDetailsMapping[_productId].be_fundReceive == 0);
        require(_amt == lcReqMapping[_productId].totalAmount);
        msg.sender.transfer(_amount);
        fundDetailsMapping[_productId].be_fundReceive = 1;
    }
    //To transfer the amount from exporter's account to the contract
    function exporterBankPay(uint _productId, uint _amount) public onlyExpBank payable{
        require(fundDetailsMapping[_productId].be_fundReceive == 1 && fundDetailsMapping[_productId].be_fundTransfer == 0);
        require(_amount == lcReqMapping[_productId].totalAmount);
        fundDetailsMapping[_productId].be_fundTransfer = 1;
    }
    //To receive the amount from the contract account to exporter
    function getExpAmount(uint _productId,uint _amt, uint _amount) public onlyExporter payable{
        require(fundDetailsMapping[_productId].be_fundTransfer == 1 && fundDetailsMapping[_productId].e_fundReceive == 0);
        require(_amt == lcReqMapping[_productId].totalAmount);
        msg.sender.transfer(_amount);
        fundDetailsMapping[_productId].e_fundReceive = 1;   
    }
    //Confirmations
    //To confirm the Invoice by the Exporter
    function setProdConfirm(uint _productId) public onlyExporter{
        require(orderDetailsMapping[_productId].i_createInvoice == 1 && orderDetailsMapping[_productId].e_confirmInvoice == 0);
        orderDetailsMapping[_productId].e_confirmInvoice = 1;
    }
    //To Set the Approval of LC by the Importer's Bank
    function setLCApprove(uint _productId) public onlyImpBank{
        require(orderDetailsMapping[_productId].i_requestLC == 1 && orderDetailsMapping[_productId].bi_approveLC == 0);
        orderDetailsMapping[_productId].bi_approveLC = 1;
    }
    //To Set the Confirmation of the LC by the Exporter's Bank
    function setLCConfirm(uint _productId) public onlyExpBank{
        require(orderDetailsMapping[_productId].bi_approveLC == 1 && orderDetailsMapping[_productId].be_confirmLC == 0);
        orderDetailsMapping[_productId].be_confirmLC = 1;
    }
    //To Set the Item Send Confirmation by the Exporter
    function setItemSend(uint _productId) public onlyExporter{
        require(orderDetailsMapping[_productId].be_confirmLC == 1 && orderDetailsMapping[_productId].e_itemSend == 0);
        orderDetailsMapping[_productId].e_itemSend = 1;
    }
    //To Confirm the Verification by the Exporter's Customs
    function setExpCustoms(uint _productId) public onlyExpCust{
        require(orderDetailsMapping[_productId].e_itemSend == 1 && orderDetailsMapping[_productId].ce_verification == 0);
        orderDetailsMapping[_productId].ce_verification = 1; 
    }
    //To Set the Item Receival Confirmation by the Importer
    function setItemReceive(uint _productId) public onlyImporter{
        require(orderDetailsMapping[_productId].ci_verification == 1 && orderDetailsMapping[_productId].i_itemReceive == 0);
        orderDetailsMapping[_productId].i_itemReceive = 1; 
    }
    //To Confirm the Verification by the Importer's Customs
    function setImpCustoms(uint _productId) public onlyImpCust{
        require(fundDetailsMapping[_productId].bi_fundReceive == 1 && orderDetailsMapping[_productId].ci_verification == 0);
        orderDetailsMapping[_productId].ci_verification = 1;
    }
    //To get the Order Confirmation Details Mapping 
    function getOrderDetails(uint _productId) public view returns(uint _i_createInvoice, uint _e_confirmInvoice, uint _i_requestLC, uint _bi_approveLC, uint _be_confirmLC, uint _e_itemSend, uint _ce_verification, uint _ci_verification, uint _i_itemReceive){
        _i_createInvoice = orderDetailsMapping[_productId].i_createInvoice;
        _e_confirmInvoice = orderDetailsMapping[_productId].e_confirmInvoice;
        _i_requestLC = orderDetailsMapping[_productId].i_requestLC;
        _bi_approveLC = orderDetailsMapping[_productId].bi_approveLC;
        _be_confirmLC = orderDetailsMapping[_productId].be_confirmLC;
        _e_itemSend = orderDetailsMapping[_productId].e_itemSend;
        _ce_verification = orderDetailsMapping[_productId].ce_verification;
        _ci_verification = orderDetailsMapping[_productId].ci_verification;
        _i_itemReceive = orderDetailsMapping[_productId].i_itemReceive;

    }
}