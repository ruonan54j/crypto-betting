pragma solidity 0.5.8;

contract StockBet {
   uint public createdTimestamp;
   address payable public owner;
   uint256 public sharePrice;
   uint256 public totalBet;
   uint256 public totalTokens_1;
   uint256 public totalTokens_0;
   
   address payable[] public players;
   
   struct Player {
      uint256 direction;
      uint256 num_tokens;
   }
   
   // The address of the player and => the user info
   mapping(address => Player) public playerInfo;

   constructor(uint256 _sharePrice) public {
      totalBet = 0;
      totalTokens_0 = 0;
      totalTokens_1 = 0;
      owner = msg.sender;
      createdTimestamp = block.timestamp;
      if(_sharePrice != 0 ) sharePrice = _sharePrice;
   }
   
   function kill() public {
      if(msg.sender == owner) selfdestruct(owner);
   }

   function checkPlayerExists(address player) public view returns(bool){
      for(uint256 i = 0; i < players.length; i++){
         if(players[i] == player) return true;
      }
      return false;
   }
   
   // 1 = stocks increase, 0 = stocks decrease
   function bet(uint256 up_down, uint256 number_shares) public payable {
      require(!checkPlayerExists(msg.sender),"Can only bet once per round.");
      require(up_down == 1 || up_down == 0, "Invalid bet.");
      require(msg.value == sharePrice*number_shares, "incorrect funds.");
      
      playerInfo[msg.sender].direction = up_down;
      playerInfo[msg.sender].num_tokens = number_shares;
      if (up_down == 1)
        totalTokens_1 += number_shares;
      if (up_down == 0)
        totalTokens_0 += number_shares;
      
      players.push(msg.sender);
      totalBet += msg.value;
   }


    // Sends the corresponding ether to each winner depending on the total bets
   function distributePrizes(uint256 winDirection) public {
      uint256 winnerEtherAmount;
      if(totalTokens_0 == 0 || totalTokens_1 == 0)
        kill();
      if (winDirection == 1)
        winnerEtherAmount = totalBet / totalTokens_1; // How much each winner gets
      if (winDirection == 0)
        winnerEtherAmount = totalBet / totalTokens_0; // How much each winner gets
      for(uint256 i = 0; i < players.length; i++){
         address payable playerAddress = players[i];
         
         // if player won..
         if(playerInfo[playerAddress].direction == winDirection){
            uint256 earnings = winnerEtherAmount * playerInfo[playerAddress].num_tokens;
            if(playerAddress != address(0)) // Check that the address in this fixed array is not empty
                playerAddress.transfer(earnings);
            
         }
         
         delete playerInfo[playerAddress]; // Delete all the players
        
      }
      
      players.length = 0; // Delete all the players array
      resetData();
   }

    function resetData() public{
       players.length = 0; // Delete all the players array
       totalBet = 0;
       totalTokens_0 = 0;
       totalTokens_1 = 0;
    }
    function() external payable{}
}