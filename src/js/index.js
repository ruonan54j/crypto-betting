import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component {
   constructor(props) {
     super(props);
     
     this.state = {
       close: 0,
       distribute: 1,
       currentStockPrice: "1",
       currentStockName: "Microsoft",
       sharePrice: 0,
       numberOfBetsUp: 0,
       numberOfBetsDown: 0,
       totalBet: 0,
       shareToBuy: 0
     };
    

     if(typeof web3 != 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(web3.currentProvider)
   }else{
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
   }

   const MyContract = web3.eth.contract(
    [
      {
        "constant": false,
        "inputs": [
          {
            "name": "up_down",
            "type": "uint256"
          },
          {
            "name": "number_shares",
            "type": "uint256"
          }
        ],
        "name": "bet",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "close",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "winDirection",
            "type": "uint256"
          }
        ],
        "name": "distributePrizes",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "resetData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_sharePrice",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "player",
            "type": "address"
          }
        ],
        "name": "checkPlayerExists",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "createdTime",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getTimeDiff",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "open",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "playerInfo",
        "outputs": [
          {
            "name": "direction",
            "type": "uint256"
          },
          {
            "name": "num_tokens",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "players",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "sharePrice",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalBet",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalTokens_0",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalTokens_1",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
   )
   this.state.ContractInstance1 = MyContract.at("0xa19c0ea300d8404c104dabefb94440f8972c7151");
   this.state.ContractInstance2 = MyContract.at("0xc1894bc29f8e7affb5a5c5c304f18eecb4a1fa46");
   this.state.ContractInstance3 = MyContract.at("0xd5296646f505d07c69e21835f7c849b417c58ee2");
   this.state.ContractInstance4 = MyContract.at("0xf6e09304a20f5500de804ce26bb9e963764b4506");

   }
 
   componentDidMount(){
     this.loadAPI('msft');
     this.updateState()
      setInterval(this.updateState.bind(this), 10e3);
   }
   
   closebtn=()=>{
    var contract;
    if(this.state.currentStockName === 'Microsoft'){
      contract = this.state.ContractInstance1;
    }
    else if(this.state.currentStockName ==='Facebook'){
      contract = this.state.ContractInstance2;
    }
    else if(this.state.currentStockName ==='Amazon'){
      contract = this.state.ContractInstance3;
    }
    else if(this.state.currentStockName ==='Ethereum'){
      contract = this.state.ContractInstance4;
    }
    
    this.state.ContractInstance1.getTimeDiff((err, result) => {
      if (result > 1200){
        this.state.ContractInstance1.close((err, result) => {
          if(result != null){
             alert("closed contract")
          }
       })

      }
    })
   }

   distributebtn=()=>{
    this.state.ContractInstance1.getTimeDiff((err, result) => {
      
      if (result > 1500){
        this.state.ContractInstance1.distributePrizes(1,(err, result) => {
          if(result != null){
             alert("prize distributed")
          }
       })

      }

    })
   }



   updateState(){
  
    var contract;
    if(this.state.currentStockName === 'Microsoft'){
      contract = this.state.ContractInstance1;
    }
    else if(this.state.currentStockName ==='Facebook'){
      contract = this.state.ContractInstance2;
    }
    else if(this.state.currentStockName ==='Amazon'){
      contract = this.state.ContractInstance3;
    }
    else if(this.state.currentStockName ==='Ethereum'){
      contract = this.state.ContractInstance4;
    }

      contract.sharePrice((err, result) => {
        if(result != null){
           this.setState({
              sharePrice: parseFloat(web3.fromWei(result, 'ether'))
           })
        }
     })
     contract.totalBet((err, result) => {
        if(result != null){
           this.setState({
              totalBet: parseFloat(web3.fromWei(result, 'ether'))
           })
        }
     })
     contract.totalTokens_0((err, result) => {
        if(result != null){
           this.setState({
              numberOfBetsDown: parseInt(result)
           })
        }
     })
     contract.totalTokens_1((err, result) => {
        if(result != null){
           this.setState({
              numberOfBetsUp: parseInt(result)
           })
        }
     })
    }

changeBuy(e){
  this.state.shareToBuy=document.getElementById("share-input").value;
  document.getElementById('total-cost').innerHTML = this.state.shareToBuy*this.state.sharePrice+0.01 + " ETH";
}

payFee = () => {
  var dir =document.getElementById("bet-select").value; 
  var numBought = document.getElementById("share-input").value;
  
  if((!dir.includes("Up") && !dir.includes("Down") )||numBought <= 0 ){
    alert ("please fill out all inputs");
   
    return;
  }else{
    var direction = dir.includes("Up") ? 1 : 0;

    alert("success");
  
  
    this.state.ContractInstance1.bet(direction, numBought, {
        gas: 300000,
        from: web3.eth.accounts[0],
        value: web3.toWei(numBought*this.state.sharePrice+0.01, 'ether')
      }, (err, result) => {
        cb()
      })
    }
  
}

   loadAPI= (symbol) => {
     var request = new XMLHttpRequest();
     
     // Open a new connection, using the GET request on the URL endpoint
     request.open(
       "GET",
       "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=60min&apikey=RHOT53OIW6DDJQFQ",
       true
     );
     
     request.onload = function() {
       // Begin accessing JSON data here
       var self = this;
       var data = JSON.parse(this.response);
       var data_2 = data["Time Series (60min)"];
       var count = 0;
       for (var item in data_2) {
        count++;
        var str = JSON.stringify(data_2[item]["1. open"]);
        str = str.replace(/['"]+/g, '');
             document.getElementById('stockPrice').innerHTML = '(USD) $' +str.substring(0, str.length - 2); 
         
        if(count>=1)break;
       }
       
     };
                       
     // Send request
     request.send();
   }
 
   cardSelected(val) {
      
     if (val === "microsoft") {
       this.setState({ currentStockName: "Microsoft" });
       this.loadAPI("msft");
       
     }
     else if (val === "facebook") {
       this.setState({ currentStockName: "Facebook" });
        this.loadAPI("fb");
       
     }
     else if (val === "amazon") {
       this.setState({ currentStockName: "Amazon" });
       this.loadAPI("amzn");
     }
     else if (val === "ethereum") {
       this.setState({ currentStockName: "Ethereum" });
       this.loadAPI("eth");
     }
     
     this.updateState();
   }
   
   updateInput(evt){
      this.state={value: evt.target.value};   
   }

   render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-style">
          <a class="navbar-brand" href="#">
            CryptoStocks
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav align-right">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Play <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container row">
          <div className="col">
            <div className="row">
              <div
                className={
                  this.state.currentStockName === "Microsoft"
                    ? "card card-selected"
                    : "card"
                }
                onClick={() => this.cardSelected("microsoft")}
              >
                <img
                  src="http://pngriver.com/wp-content/uploads/2018/04/Download-Microsoft-Logo-Transparent-Background.png"
                  alt="microsoft"
                  className="logo-img"
                />
              </div>

              <div
                className={
                  this.state.currentStockName === "Facebook"
                    ? "card card-selected"
                    : "card"
                }
                onClick={() => this.cardSelected("facebook")}
              >
                <img
                  src="http://www.pngmart.com/files/3/Facebook-Logo-PNG-Clipart.png"
                  alt="facebook"
                  className="logo-img"
                />
              </div>
            </div>
            <div className="row">
              <div
                className={
                  this.state.currentStockName === "Amazon"
                    ? "card card-selected"
                    : "card"
                }
                onClick={() => this.cardSelected("amazon")}
              >
                <img
                  src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png"
                  alt="amazon"
                  className="logo-img"
                />
              </div>
              <div
                className={
                  this.state.currentStockName === "Ethereum"
                    ? "card card-selected"
                    : "card"
                }
                onClick={() => this.cardSelected("ethereum")}
              >
                <img
                  src="https://www.drupal.org/files/styles/grid-3-2x/public/project-images/ETHEREUM-LOGO_PORTRAIT_Black_small.png?itok=E05S6ytQ"
                  alt="ether"
                  className="logo-img"
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="right-card">

              <h1>{this.state.currentStockName}</h1>
              <div className="block">
                <b>Current stock price: </b> 
                <span id="stockPrice">{this.state.currentStockPrice}</span>
              </div>
                <div className="block">
                <b>Price per share:</b> &nbsp;
                <span>{this.state.sharePrice}</span>
              </div>
              <div className="block">
                <b>Total bet:</b> &nbsp;
                <span>{this.state.totalBet}</span>
              </div>
              <div className="block">
                <b>Number of bets up:</b> &nbsp;
                <span>{this.state.numberOfBetsUp}</span>
              </div>
              <div className="block">
                <b>Number of bets down:</b> &nbsp;
                <span>{this.state.numberOfBetsDown}</span>
              </div>
              <hr />
              <div className="row line">
              <b className="col">
                Shares to bet:{" "}
                </b>
                <input
                  className="bet-input col"
                  id="share-input"
                  ref="ether-bet"
                  type="number"
                  onChange={(e) => {this.changeBuy(e)}}
                  placeholder={1}
                />
              
              </div>
              <div className="row line">
              <b className="col">Bet direction:</b>
                <select className="col" id="bet-select">
                  <option>Please select</option>
                  <option>Up</option>
                  <option>Down</option>
                </select>
              
                </div>
                <p>0.01 ETH transaction fee</p>
              <hr className="equal"/>
              <div className="row line2">
                <div className="col total-cost"> 
                 
                  <b>Total Cost:{" "}</b>
              <span id="total-cost">0 ETH</span></div>
               <div className="col"> 
              <button className="btn btn-custom" onClick={this.payFee}>Pay</button>
               <button className="btn btn-custom" onClick={this.closebtn}>Close</button>
               <button className="btn btn-custom" onClick={this.distributebtn}>Distribute</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
   }
 }
 ReactDOM.render(<App />, document.querySelector("#root"));
 