contract SupplyChain {
  address public owner;
  uint public nextItemId = 0;

  struct User{
    bool exists;
    string name;
    string jobTitle;
    string company;
    string role;
    string rdfData;
  }

  struct Item{
    string name;
    string code;
  //  uint8 decimals;
    uint256 totalSupply;
    string description;
    string rdfData;
    mapping (address => uint256) balanceOf;
  }

  mapping (address => User) public users;
  mapping (uint256 => Item) public items;


event Test(uint _nextItemId);
event Transfer(address _from, address _to, uint _id, uint256 _value);
event Register(address _userAddress, string _name, string _role);
//event Register(address _userAddress);
event Creation(uint _nextItemId, string _name, uint256 _totalsupply, address _ownerItem, string _type);
//event Creation(uint _nextItemId, uint256 _totalsupply, address _ownerItem);
event NewItemNormal(uint _nextItemId, string _name, string _code, uint256 _totalSupply, string _description);
event NewItemDivide(uint _nextItemId, string _name, string _code, uint256 _totalSupply, string _description, uint _id, uint256 _quantity);
event NewItemMerge(uint _nextItemId, string _name, string _code, uint256 _totalSupply, string _description, uint _id1 , uint _id2, uint256 _quantity1, uint256 _quantity2);

function SupplyChain() {
  owner = msg.sender;
}

function newItemNormal(string _name, string _code, uint256 _totalSupply, string _description, string _rdfData) {
  if(users[msg.sender].exists == true)
  {
  //verify user is previously registered by administrator
  items[nextItemId] = Item({
    name: _name,
    code: _code,
    totalSupply: _totalSupply,
    description: _description,
    rdfData: _rdfData
    });

    items[nextItemId].balanceOf[msg.sender]= _totalSupply;
    NewItemNormal(nextItemId,_name,_code,_totalSupply,_description);
    Creation(nextItemId,_name,_totalSupply, msg.sender, "Normal");
  //  Creation(nextItemId,_totalSupply, msg.sender);
    Test(nextItemId);
    nextItemId++;
    }
}

function newItemDivide(string _name, string _code, uint256 _totalSupply, string _description, string _rdfData, uint _id, uint256 _quantity) {
  if(users[msg.sender].exists == true)
  {
  //verify user is previously registered by administrator
  items[nextItemId] = Item({
    name: _name,
    code: _code,
    totalSupply: _totalSupply,
    description: _description,
    rdfData: _rdfData
    });
    items[nextItemId].balanceOf[msg.sender]= _totalSupply;
    //transfer
    if (items[_id].balanceOf[msg.sender] < _quantity) throw;           // Check if the sender has enough
    //if (items[_id].balanceOf[msg.sender] + _quantity < items[_id].balanceOf[_to]) throw; // Check for overflows
    items[_id].balanceOf[msg.sender] -= _quantity;                     // Subtract from the sender
  //  items[_id].balanceOf[_to] += _value;                            // Add the same to the recipient
  //(uint _nextItemId, string _name, string _code, uint8 _decimals, uint256 _totalSupply, string _description, uint _id, uint256 _quantity);
  NewItemDivide(nextItemId,_name,_code,_totalSupply,_description,_id,_quantity);
    Creation(nextItemId,_name,_totalSupply, msg.sender, "Divide");
  //    Creation(nextItemId,_totalSupply, msg.sender);
    nextItemId++;
  }
}

function newItemMerge(string _name, string _code, uint256 _totalSupply, string _description, string _rdfData, uint _id1, uint _id2, uint256 _quantity1, uint256 _quantity2) {
  if(users[msg.sender].exists == true)
  {
  //verify user is previously registered by administrator
  items[nextItemId] = Item({
    name: _name,
    code: _code,
    totalSupply: _totalSupply,
    description: _description,
    rdfData: _rdfData
    });
    items[nextItemId].balanceOf[msg.sender]= _totalSupply;
    //transfer
    if (items[_id1].balanceOf[msg.sender] < _quantity1) throw;           // Check if the sender has enough
    if (items[_id2].balanceOf[msg.sender] < _quantity2) throw;           // Check if the sender has enough
//    if (items[_id1].balanceOf[_to] + _quantity1 < items[_id1].balanceOf[_to]) throw; // Check for overflows
//    if (items[_id2].balanceOf[_to] + _quantity2 < items[_id2].balanceOf[_to]) throw; // Check for overflows
    items[_id1].balanceOf[msg.sender] -= _quantity1;                     // Subtract from the sender
    items[_id2].balanceOf[msg.sender] -= _quantity2;                     // Subtract from the sender
  //  items[_id].balanceOf[_to] += _value;                            // Add the same to the recipient
  //(uint _nextItemId, string _name, string _code, uint8 _decimals, uint256 _totalSupply, string _description, uint _id1 , uint _id2, uint256 _quantity1, uint256 _quantity2);
  NewItemMerge(nextItemId,_name,_code,_totalSupply,_description,_id1,_id2,_quantity1,_quantity2);
    Creation(nextItemId,_name,_totalSupply, msg.sender, "Merge");
  //  Creation(nextItemId,_totalSupply, msg.sender);
    nextItemId++;
  }
}

function RegisterUsers(address _userAddress, string _name, string _jobTitle, string _company, string _role, string _rdfData) public returns (bool success) {

  users[_userAddress] = User({
    name: _name,
    exists: true,
    jobTitle: _jobTitle,
    company: _company,
    role: _role,
    rdfData: _rdfData
    });

Register(_userAddress,_name,_role);
}

function transfer(address _to, uint256 _value, uint _id) {
  //if(users[msg.sender].active == true){
        if (items[_id].balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (items[_id].balanceOf[_to] + _value < items[_id].balanceOf[_to]) throw; // Check for overflows
        items[_id].balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        items[_id].balanceOf[_to] += _value;                            // Add the same to the recipient
        Transfer(msg.sender, _to,_id, _value);                   // Notify anyone listening that this transfer took place
    //  }
    }
    /* This unnamed function is called whenever someone tries to send ether to it */
    function () {
        throw;     // Prevents accidental sending of ether
    }
}
