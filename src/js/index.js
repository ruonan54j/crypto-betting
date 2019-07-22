import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component {
   constructor(props) {
     super(props);
     
     this.state = {
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
        "constant": true,
        "inputs": [],
        "name": "createdTimestamp",
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
      }
    ]
   )
   this.state.ContractInstance1 = MyContract.at("0x12cb67ed0cbd4868da74377636cb0cf26f0bdcb4")

   }
 
   componentDidMount(){
     this.loadAPI('msft');
     this.updateState()
      setInterval(this.updateState.bind(this), 10e3);
   }
 
   updateState(){
    console.log("yeees");
    this.state.ContractInstance1.sharePrice((err, result) => {
       if(result != null){
          this.setState({
             sharePrice: parseFloat(web3.fromWei(result, 'ether'))
          })
       }
    })
    this.state.ContractInstance1.totalBet((err, result) => {
       if(result != null){
          this.setState({
             totalBet: parseFloat(web3.fromWei(result, 'ether'))
          })
       }
    })
    this.state.ContractInstance1.totalTokens_0((err, result) => {
       if(result != null){
          this.setState({
             numberOfBetsDown: parseInt(result)
          })
       }
    })
    this.state.ContractInstance1.totalTokens_1((err, result) => {
       if(result != null){
          this.setState({
             numberOfBetsUp: parseInt(result)
          })
       }
    })
 }

/*
 // Listen for events and executes the voteNumber method
 setupListeners(){
  let cards = document.getElementsByClassName("card");
  cards.forEach(elem => {
     elem.addEventListener('click', event => {
        //event.target.className = 'number-selected'
        this.voteNumber(parseInt(event.target.innerHTML), done => {
// Remove the other number selected
           for(let i = 0; i < liNodes.length; i++){
              liNodes[i].className = ''
           }
        })
     })
  })
}
*/
payFee = () => {
  alert("click");
 /* let numShares= this.sharesBet.value;
  let direction = this.direction.value;
  if (direction!=="xxx"){
    console.log(numShares);
    console.log(direction);
    console.log("-------");
    return;
  }*/
  this.state.ContractInstance1.bet(1, 3, {
    gas: 300000,
    from: web3.eth.accounts[0],
    value: web3.toWei(3*.3, 'ether')
  }, (err, result) => {
    cb()
  })
  
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
     if (val === "facebook") {
       this.setState({ currentStockName: "Facebook" });
        this.loadAPI("fb");
       
     }
     if (val === "amazon") {
       this.setState({ currentStockName: "Amazon" });
       this.loadAPI("amzn");
     }
     if (val === "ethereum") {
       this.setState({ currentStockName: "Ethereum" });
       this.loadAPI("eth");
     }
   }
   
   updateInput(evt){
      this.state={value: evt.target.value};   
   }

   render() {
     return (
       <div>
         <nav className="navbar navbar-expand-lg navbar-style">
           <a className="navbar-brand" href="#">
             CryptoStocks
           </a>
           <button
             className="navbar-toggler"
             type="button"
             data-toggle="collapse"
             data-target="#navbarText"
             aria-controls="navbarText"
             aria-expanded="false"
             aria-label="Toggle navigation"
           >
             <span className="navbar-toggler-icon" />
           </button>
           <div className="collapse navbar-collapse" id="navbarText">
             <ul className="navbar-nav align-right">
               <li className="nav-item active">
                 <a className="nav-link" href="#">
                   Home <span className="sr-only">(current)</span>
                 </a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" href="#">
                   Features
                 </a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" href="#">
                   Pricing
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
                   className="mic-img"
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
                   className="fb-img"
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
                   className="am-img"
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
                   className="et-img"
                 />
               </div>
             </div>
           </div>
           <div className="col">
             <div className="right-card">
               <h1 className="title">
                 Bet for stock direction: blockchain betting
               </h1>
               <br />
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
               <b>
                 Shares to bet:{" "}
                 <input
                   className="bet-input"
                   id="share-input"
                   type="number"
                   onChange={this.updateInput}
                   placeholder={1}
                 />
               </b>
               <b>
                 Bet direction:
                 <select className="bet-select" ref={el => this.direction}>
                   <option>Please select</option>
                   <option>Up</option>
                   <option>Down</option>
                 </select>
               </b>
               <b> Total Cost:</b>{" "}
               <span>{this.state.sharePrice * this.state.shareToBuy}</span>
               <button onClick={this.payFee}>Pay</button>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }
 ReactDOM.render(<App />, document.querySelector("#root"));
 