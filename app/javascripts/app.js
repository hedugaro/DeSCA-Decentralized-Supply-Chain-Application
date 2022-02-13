window.onload = function() {
	//variables
	var ipfsHost = 'localhost',
	ipfsAPIPort = '5001',
	ipfsWebPort = '8080',
	web3Host    = 'localhost',
	web3Port    = '8545';

	var users = [];
	var i = 1;
	var j = 1;
	var items = [];
	var itemsnormal = [];
	var itemsdivide = [];
	var itemsmerge = [];
	var items_detailed = [];
	var all_transfers = [];

	var accounts = web3.eth.accounts;
	var SupplyChainInstance;

updateAccounts();
//IPFS
	var ipfs = this.IpfsApi(ipfsHost, ipfsAPIPort)
	ipfs.swarm.peers(function(err, response) {
			if (err) {
					console.error(err);
			} else {
					console.log("IPFS - connected to " + response.Strings.length + " peers");
					console.log(response);
			}
	});

	function addFile(url) {
			ipfs.add(url, function(err, result) {
					if (err) {
							console.error('Error sending file: ', err);
							return null;
					} else if (result && result[0] && result[0].Hash) {
							var imageURL = window.ipfsDataHost + "/" + result[0].Hash;
							$("#ipfs_address_user").val(result[0].Hash);
					} else {
							console.error('No file for you...');
							return null;
					}
			});
	}

	function addFile2(url) {
			ipfs.add(url, function(err, result) {
					if (err) {
							console.error('Error sending file: ', err);
							return null;
					} else if (result && result[0] && result[0].Hash) {
							var imageURL = window.ipfsDataHost + "/" + result[0].Hash;
							$("#ipfs_address_item").val(result[0].Hash);
					} else {
							console.error('No file for you...');
							return null;
					}
			});
	}

var accountSelect = document.getElementById("account_list");

	accounts.forEach(function(account) {
		var option = document.createElement("option");
		option.text = account;
		option.value = account;
		accountSelect.add(option);
  });

//visual interactions
$(".main_menu a").on("click", function(){
   $(".main_menu").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

$(".menu_administrator a").on("click", function(){
   $(".menu_administrator").find(".active").removeClass("active");
   $(this).parent().addClass("active");

});

$(".menu_user a").on("click", function(){
   $(".menu_user").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});


//HANDLING VISUAL EFFECTS
function hideEverything()
{
	$("#success_new_account").hide();
	$("#fail_new_account").hide();
	$("#success_manage_users").hide();
	$("#fail_manage_users").hide();
	$("#success_new_item").hide();
	$("#fail_new_item").hide();
	$("#success_transfer_item").hide();
	$("#fail_transfer_item").hide();
	$("#success_deploy_contract").hide();
	$("#fail_deploy_contract").hide();
	$("#success_connect_contract").hide();
	$("#fail_connect_contract").hide();

	$(".menu_administrator").hide();
	$(".menu_user").hide();
	$(".panel_new_account").hide();
	$(".panel_manage_users_administrator").hide();
	$(".panel_new_item_user").hide();
	$(".panel_transfer_item_user").hide();
	$(".panel_supply_chain").hide();

	$(".panel_info").hide();
	$(".panel_settings").hide();
	$(".panel_credentials").hide();
}

function showSettings()
{
	$(".panel_settings").show();
}

function showNewAcccount()
{
	$(".panel_new_account").show();
}

function showAdmin()
{
	$(".menu_administrator").show();
	$(".panel_manage_users_administrator").show();
	$(".panel_credentials").show();
	$(".panel_info").show();
}

function showUser()
{
	$(".menu_user").show();
	$(".panel_new_item_user").show();
	$(".panel_info").show();

	$(".panel_credentials").show();
}

function manageUser()
{
	$(".menu_administrator").show();
	$(".panel_manage_users_administrator").show();
	$(".panel_info").show();

		$(".panel_credentials").show();
}

function transferItem()
{
	$(".menu_user").show();
	$(".panel_transfer_item_user").show();
	$(".panel_info").show();

	$(".panel_credentials").show();
}

function userSupplyChain()
{
	$(".menu_user").show();
	$(".panel_supply_chain").show();
	$(".panel_info").show();
	$(".panel_credentials").show();
}

function adminSupplyChain()
{
	$(".menu_administrator").show();
	$(".panel_supply_chain").show();
	$(".panel_info").show();
	$(".panel_credentials").show();
}

//Clean
function cleanNewItem()
{
	$("#name_item").val("");
	$("#code_item").val("");
	//$("#decimals_item").val("");
	$("#total_supply_item").val("");
	$("#description_item").val("");
	$("#rdf_data_item").val("");
	}

function cleanNewUser()
{
	$("#public_key_user").val("");
  $("#name_user").val("");
	$("#job_title_user").val("");
	$("#company_user").val("");
	$("#role_user").val("");
	$("#rdf_data_user").val("");
}

function cleanTransfer()
{
	$("#to").val("");
  $("#quantity_item").val("");
}

//Menu buttons
$("#link_settings").click(function(){
hideEverything();
showSettings();
});

	$("#link_admin").click(function(){
hideEverything();
showAdmin();
	});

		$("#link_user").click(function(){
	hideEverything();
	showUser();
		});

		$("#link_new_account").click(function(){
	hideEverything();
	showNewAcccount();
		});

		$("#link_manage_user").click(function(){
	hideEverything();
	manageUser();
		});

		$("#link_supply_chain_admin").click(function(){
	hideEverything();
	adminSupplyChain();
		});

		$("#link_new_item").click(function(){
	hideEverything();
	showUser();
		});

		$("#link_transfer_item").click(function(){
	hideEverything();
	transferItem();
		});

		$("#link_supply_chain_user").click(function(){
	hideEverything();
	userSupplyChain();
		});

$("#contract_address").prop('readonly', true);



function updateAccounts() {
	var i;
	$("#table_accounts tbody tr").remove();
	for (i = 0; i < accounts.length; ++i) {
	$("#table_accounts").append("<tr><td>"+(i+1)+"</td><td>" + accounts[i] + "</td></tr>");
	}
}

hideEverything();
showAdmin();


function createAccount(){
$.ajax({
	method: 'POST',
	url: 'http://localhost:8545',
	data: JSON.stringify({
					"jsonrpc":"2.0",
					"method":"personal_newAccount",
					"params":[$("#new_password").val()],
					"id":74
			})
}).done(function(response) {
$('#success_new_account').show().delay(3000).fadeOut();
updateAccounts();
	console.log(response);
});
}

function unlockAccount(){
$.ajax({
	method: 'POST',
	url: 'http://localhost:8545',
	data: JSON.stringify({
					"jsonrpc":"2.0",
					"method":"personal_unlockAccount",
					"params":[$("#account_list option:selected").val(), $("#password_user").val(), "30"],
					"id":74
			})
}).done(function(response) {
});
}

//Handle the HTML components visualization
function deployContract(){
	SupplyChain.new({from: accounts[0], gas: 3141592}).then(
		function(adm) {
			SupplyChainInstance = adm;

			$('#success_deploy_contract').show().delay(3000).fadeOut();

				$("#contract_address").val(SupplyChainInstance.address);
			SupplyChainInstance.Register().watch(function(error, event) {
				if (!error) {
					updateUsers(event.args);
				} else {
				}
			});

				SupplyChainInstance.Creation().watch(function(error, event) {
				if (!error) {
					updateItems(event.args);
				} else {
				}
			});

			SupplyChainInstance.NewItemNormal().watch(function(error, event) {
			if (!error) {
				updateItemNormal(event.args);
			} else {
			}
		});

		SupplyChainInstance.NewItemDivide().watch(function(error, event) {
		if (!error) {
			updateItemDivide(event.args);
		} else {
		}
	});

	SupplyChainInstance.NewItemMerge().watch(function(error, event) {
	if (!error) {
		updateItemMerge(event.args);
	} else {
	}
});


			SupplyChainInstance.Transfer().watch(function(error, event) {
			if (!error) {
				updateTransfers(event.args);
			} else {
			}
		});
	});
}

function connectContract(){
	SupplyChainInstance = SupplyChain.at($("#contract_address_connect").val());
	$("#contract_address").val(SupplyChainInstance.address);
	$('#success_connect_contract').show().delay(3000).fadeOut();

SupplyChainInstance.Register({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
	if (!error) {
		updateUsers(event.args);
	} else {
	}
});

SupplyChainInstance.Creation({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
			if (!error) {
				updateItems(event.args);
		} else {
			}
		});

		SupplyChainInstance.Transfer({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
		if (!error) {
			updateTransfers(event.args);
		} else {
		}
	});
}

//Update Tables content
function updateUsers(data) {
	users.push([data._userAddress,data._name,data._role]);
	var table = document.getElementById("table_users").getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	row.id = 'row-';
	var id = row.insertCell(0);
	id.innerHTML = i;
	i++;
	var idCell = row.insertCell(1);
//	idCell.innerHTML = users[0];
idCell.innerHTML = data._userAddress;
var idCell2 = row.insertCell(2);
idCell2.innerHTML = data._name;
var idCell3 = row.insertCell(3);
idCell3.innerHTML = data._role;
}

function updateItems(data) {
items.push([data._nextItemId,data._ownerItem]);
items_detailed.push([data._nextItemId,data._name,data._totalsupply,data._ownerItem,data._type]);
	var table = document.getElementById("table_items").getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	row.id = 'row-';
	var id = row.insertCell(0);
	id.innerHTML = data._nextItemId;
	j++;
	var idCell = row.insertCell(1);
	idCell.innerHTML = data._name;
	var idCell2 = row.insertCell(2);
	idCell2.innerHTML = data._totalsupply;
	var idCell3 = row.insertCell(3);
	idCell3.innerHTML = data._ownerItem;
}


function updateItemNormal(data) {
	//event NewItemNormal(uint _nextItemId, string _name, string _code, uint256 _totalSupply, string _description);
	//event NewItemDivide(uint _nextItemId, string _name, string _code, uint256 _totalSupply, string _description, uint _id, uint256 _quantity);
	//event NewItemMerge(uint _nextItemId, string _name, string _code, uint256 _totalSupply, string _description, uint _id1 , uint _id2, uint256 _quantity1, uint256 _quantity2);
itemsnormal.push([data._nextItemId, data._name, data._code, data._totalSupply, data._description]);
}

function updateItemDivide(data) {
itemsdivide.push([data._nextItemId, data._name, data._code, data._totalSupply, data._description, data._id, data._quantity]);
}

function updateItemMerge(data) {
itemsmerge.push([data._nextItemId, data._name, data._code, data._totalSupply, data._description, data._id1 , data._id2, data._quantity1, data._quantity2]);
}

function updatetest(data) {

	var table = document.getElementById("table_items").getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	row.id = 'row-';
	var id = row.insertCell(0);
	id.innerHTML = data._nextItemId;
	j++;
}

function updateTransfers(data) {
items.push([data._id,data._to]);
all_transfers.push([data._from,data._to,data._id,data._value]);
	var table = document.getElementById("table_transactions").getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	row.id = 'row-';
	var id = row.insertCell(0);
	id.innerHTML = i;
	i++;
	var idCell = row.insertCell(1);
idCell.innerHTML = data._from;
var idCell2 = row.insertCell(2);
idCell2.innerHTML = data._to;
var idCell3 = row.insertCell(3);
idCell3.innerHTML = data._id;
var idCell4 = row.insertCell(4);
idCell4.innerHTML = data._value;
}


	// Functions
	function registerUser(userAddress, userName, userJobTitle, userCompany, userRole, userRDFData) {
		unlockAccount();
		if ($("#account_list option:selected").val() == accounts[0])
		{
		SupplyChainInstance.RegisterUsers(userAddress, userName, userJobTitle, userCompany, userRole, userRDFData, { from: $("#account_list option:selected").val()}).then(
			function() {
				$('#success_manage_users').show().delay(3000).fadeOut();
				cleanNewUser();
			});
			}
			else {
				console.log("Administrator account not selected");
			}
		}

		function registerItemNormal(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData) {
			unlockAccount();
			SupplyChainInstance.newItemNormal(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData, {from: $("#account_list option:selected").val()}).then(
				function() {
						$('#success_new_item').show().delay(3000).fadeOut();
						cleanNewItem();
				});
			}

			function registerItemMerge(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData,itemId1,itemId2,itemMergeQuantity1,itemMergeQuantity2) {
				unlockAccount();
				SupplyChainInstance.newItemMerge(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData, itemId1,itemId2,itemMergeQuantity1,itemMergeQuantity2, {from: $("#account_list option:selected").val()}).then(
					function() {
							$('#success_new_item').show().delay(3000).fadeOut();
							cleanNewItem();
					});
				}

				function registerItemDivide(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData, itemId,itemDivideQuantity) {
					unlockAccount();
					SupplyChainInstance.newItemDivide(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData, itemId, itemDivideQuantity, {from: $("#account_list option:selected").val()}).then(
						function() {
								$('#success_new_item').show().delay(3000).fadeOut();
								cleanNewItem();
						});
					}





			function transactionItem(to, quantity,_id) {
				unlockAccount();
				SupplyChainInstance.transfer(to, quantity, _id, {from: $("#account_list option:selected").val()}).then(
					function() {
							$('#success_transfer_item').show().delay(3000).fadeOut();
							cleanTransfer();
					});
				}

  $("#ipfs_user").hide();
	$("#ipfs_item").hide();
	$("#split_item").hide();
	$("#merge_item").hide();

				$('#location_rdf_user').on('change', function () {
				    if(this.value === "IPFS"){
				        $("#ipfs_user").show();
				    } else {
				        $("#ipfs_user").hide();
				    }
				});

				$('#location_rdf_item').on('change', function () {
						if(this.value === "IPFS"){
								$("#ipfs_item").show();
						} else {
								$("#ipfs_item").hide();
						}
				});

				$('#type_item').on('change', function () {
						if(this.value === "Normal")
						{
							$("#merge_item").hide();
							$("#split_item").hide();
						}
						if(this.value === "Merge")
						{
								$("#merge_item").show();
								$("#split_item").hide();
						}
						if(this.value === "Divide")
						{
								$("#split_item").show();
								$("#merge_item").hide();
						}
				});


	// Wire up the UI elements
	$("#button_register_user").click(function() {
		var userKey = $("#public_key_user").val();
		var userName = $("#name_user").val();
		var userJobTitle = $("#job_title_user").val();
		var userCompany = $("#company_user").val();
		var userRole = $("#role_user").val();
		var userRDFData;
		if($("#location_rdf_user").val()=="Contract storage"){
			userRDFData = $("#rdf_data_user").val();
				}
		if($("#location_rdf_user").val()=="IPFS"){
					userRDFData = "IPFS: " + $("#ipfs_address_user").val();
						}
		registerUser(userKey, userName, userJobTitle,userCompany,userRole,userRDFData);
	});

	$("#button_register_item").click(function() {
		var itemName = $("#name_item").val();
		var itemCode = $("#code_item").val();
		var itemTotalSupply = parseInt($("#total_supply_item").val());
		var itemDescription = $("#description_item").val();
		var itemRDFData = $("#rdf_data_item").val();
		var itemDivideQuantity = $("#quantity_divide_item").val();
		var itemMergeQuantity1 = $("#quantity1_merge_item").val();
		var itemMergeQuantity2 = $("#quantity2_merge_item").val();

		var _idmerge1;
		for (var i=0; i<items_detailed.length;i++)
		{
			if ($("#merge_item1 option:selected").text() == items_detailed[i][1])
			_idmerge1 = items_detailed[i][0];
		}

		var _idmerge2;
		for (var i=0; i<items_detailed.length;i++)
		{
			if ($("#merge_item2 option:selected").text() == items_detailed[i][1])
			_idmerge2 = items_detailed[i][0];
		}

		var _iddivide;
		for (var i=0; i<items_detailed.length;i++)
		{
			if ($("#divide_item option:selected").text() == items_detailed[i][1])
			_iddivide = items_detailed[i][0];
		}

		if($("#type_item option:selected").val()=="Normal")
		{
				registerItemNormal(itemName, itemCode,  itemTotalSupply, itemDescription, itemRDFData);
		}
		if($("#type_item option:selected").val()=="Merge")
		{
				registerItemMerge(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData,_idmerge1,_idmerge2,itemMergeQuantity1,itemMergeQuantity2);
		}
		if($("#type_item option:selected").val()=="Divide")
		{
			 registerItemDivide(itemName, itemCode, itemTotalSupply, itemDescription, itemRDFData,_iddivide,itemDivideQuantity);
		}
	});

	$("#button_transfer_item").click(function() {

		var to = $("#to").val();
		var quantity = parseInt($("#quantity_item").val());
		var _id;
		for (var i=0; i<items_detailed.length;i++)
		{
			if ($("#_item option:selected").text() == items_detailed[i][1])
			_id = items_detailed[i][0];
		}
		transactionItem(to,quantity,_id);
	});

	$("#button_deploy_contract").click(function() {
	deployContract();
	});

	$("#button_connect_contract").click(function() {
	connectContract();
	});

	$("#button_create_account").click(function() {
	createAccount();
	});


	function testIPFS(){
		$.ajax({
			type: "POST",
			url: '127.0.0.1:5001/api/v0/add',
			data: 'image=@/bar.jpg',
			processData: false
		}).done(function(response) {
	    console.log(response);
	});
	}

	$("#button_ipfs_user").click(function() {
	addFile(new Buffer($("#rdf_data_user").val()));
	});
	function arrClean(a,addr){
	  var t = [];
	  for(var x = 0; x < a.length; x++){
	    if(a[x][2] == addr)
			t.push(a[x]);
	  }
	  return t;
	}

	$("#button_ipfs_item").click(function() {
	addFile2(new Buffer($("#rdf_data_item").val()));
	});


	function UpdateItemsList(type){
		if (type=="NewItem")
		{
			$("#divide_item").empty();
		  $("#merge_item1").empty();
			$("#merge_item2").empty();
		for (var x=0; x<items.length; x++){

			if(items[x][1] == $("#account_list option:selected").val())
			{
				for (var i=0; i<items_detailed.length;i++)
				{
					if (parseInt(items_detailed[i][0])==parseInt(items[x][0]))
					{

				var itemSelect = document.getElementById("divide_item");
				var itemSelect2 = document.getElementById("merge_item1");
				var itemSelect3 = document.getElementById("merge_item2");
						var option = document.createElement("option");
						option.text = items_detailed[i][1];
						option.value = "";
						itemSelect.add(option);
						var option2 = document.createElement("option");
						option2.text = items_detailed[i][1];
						option2.value = "";
						itemSelect2.add(option2);
						var option3 = document.createElement("option");
						option3.text = items_detailed[i][1];
						option3.value = "";
						itemSelect3.add(option3);
					}
					}
			}
		}
				}

		if (type=="TransferItem")
		{
			$('#_item').empty();
			for (var x=0; x<items.length; x++){

				if(items[x][1] == $("#account_list option:selected").val())
				{
					for (var i=0; i<items_detailed.length;i++)
					{
						if (parseInt(items_detailed[i][0])==parseInt(items[x][0]))
						{
							var itemSelect = document.getElementById("_item");
									var option = document.createElement("option");
									option.text = items_detailed[i][1];
									option.value = "";
									itemSelect.add(option);
						}
						}
				}
		}
	}
		if (type=="Provenance")
		{
			$('#item_provenance').empty();
			for (var x=0; x<items.length; x++){

				if(items[x][1] == $("#account_list option:selected").val())
				{
					for (var i=0; i<items_detailed.length;i++)
					{
						if (parseInt(items_detailed[i][0])==parseInt(items[x][0]))
						{
							var itemSelect = document.getElementById("item_provenance");
									var option = document.createElement("option");
									option.text = items_detailed[i][1];
									option.value = "";
									itemSelect.add(option);
						}
						}
				}
		}
		}
	}
var index=0;
function show(input)
{
	var _id;
	var _namefrom;
	var _rolefrom;
	var _nameto;
	var _roleto;
		for (var x=0; x<all_transfers.length; x++){
			for (var i=0; i<items_detailed.length;i++)
			{
				if (items_detailed[i][1]==$("#item_provenance option:selected").text())
				{
					_id = parseInt(items_detailed[i][0]);

				}
			}

				for (var j=0; j<users.length;j++)
				{
				if (users[j][0]==input)
				{
					_nameto = users[j][1].toString();
					_roleto = users[j][2].toString();
				}

				if (users[j][0]==all_transfers[x][0])
				{
					_namefrom = users[j][1].toString();
					_rolefrom = users[j][2].toString();
				}
			}

			if(all_transfers[x][1] == input && all_transfers[x][2] == _id)
			{
			index++;
			$(".panel_provenance").append("<br><b> From: </b>",all_transfers[x][0]," <br>  --> <b> Name: </b>",_namefrom,"<br> --> <b>  Role: </b>",_rolefrom,"<br> <b> To: </b>",all_transfers[x][1]," <br>  --> <b> Name: </b>",_nameto,"<br> --> <b>  Role: </b>",_roleto, "<br> <b>Amount: </b> ",all_transfers[x][3].toString(),"<br>____________________________________________");
			show(all_transfers[x][0]);
			}
	}

}

	$("#button_show_provenance").click(function() {
		document.getElementById("pan_prov").innerHTML = "";
		show($("#account_list option:selected").val());
			for (var i=0; i<items_detailed.length;i++)
			{
		if (items_detailed[i][1]==$("#item_provenance option:selected").text())
		{
					$(".panel_provenance").append("<br>","<b>Item Creator: </b>",items_detailed[i][3],"<br> <b>Name: </b>",items_detailed[i][1],"<br> <b>Type: </b>",items_detailed[i][4]);
					if(items_detailed[i][4]=="Merge")
					{
						$(".panel_provenance").append("<br>","Merged from: ",items_detailed[i][1],"<br> --> Type: ",items_detailed[i][4],"<br> --> Quantity: ",items_detailed[i][2],"<br>____________________________________________");
					}
					if(items_detailed[i][4]=="Divide")
					{

					}
		}
	}
	});

	$("#button_update_items").click(function() {
		UpdateItemsList("NewItem");
	});

	$("#button_update_transfer").click(function() {
		UpdateItemsList("TransferItem");
	});

	$("#button_update_provenance").click(function() {
		UpdateItemsList("Provenance");
	});

	$("#button_generate_rdf_user").click(function() {
		$("#rdf_data_user").val("[{\"@id\":\"http://example.org/#"+$("#name_user").val()+"Name\",\"http://ontology.com/publickey\":[{\"@value\":\""+$("#public_key_user").val()+"\"}],\"http://ontology.com/name\":[{\"@value\":\""+$("#name_user").val()+"\"}],\"http://ontology.com/jobtitle\":[{\"@value\":\""+$("#job_title_user").val()+"\"}],\"http://ontology.com/company\":[{\"@value\":\""+$("#company_user").val()+"\"}],\"http://ontology.com/role\":[{\"@value\":\""+$("#role_user").val()+"\"}]}]");

	});

	$("#button_generate_rdf_item").click(function() {
		$("#rdf_data_item").val("[{\"@id\":\"http://example.org/#"+$("#name_item").val()+"\",\"http://purl.org/goodrelations/v1name\":[{\"@value\":\""+$("#name_item").val()+"\"}],\"http://purl.org/goodrelations/v1serialNumber\":[{\"@value\":\""+$("#code_item").val()+"\"}],\"http://purl.org/goodrelations/v1description\":[{\"@value\":\""+$("#description_item").val()+"\"}]}]");
	});

	$("#button_generate_rdf_item").click(function() {

	});
};
