
const serverUrl = "https://n38ddwysgkxq.usemoralis.com:2053/server";
const appId = "zL6vhCdAuZ4SqEgTDyqfys0xVLlvmL5ebHMS3kvA";
Moralis.start({ serverUrl, appId });

async function login(){
    await Moralis.authenticate().then( () => {
        printUser()
    });
}

function printUser(){
    const user = Moralis.User.current();
    buildPopulateDisplayForm();//in its own file
    return user;
}

Moralis.onAccountChanged( async (account) => {
    const confirmed = confirm("Link this address to your account?");
    if (confirmed) {
      await Moralis.link(account);
    }
  });
  
async function logout(){
    await Moralis.User.logOut();
    console.log('logged out');
}

async function getTransactions(accnAddy){
    // if(user){
        let options = { address: `${accnAddy}`};
        console.log(options);
        let transactions = await Moralis.Web3API.account.getTransactions(options);
        return transactions;
}

async function setup(index){
    let userAccounts = Moralis.User.current().attributes.accounts,
        accnNeeded = userAccounts[index];
    let transactions = [];
    await getTransactions(accnNeeded).then(res => transactions = res.result);
    return transactions;
}

async function getTokenBalances(accnNeeded){
    // let userAccounts = Moralis.User.current().attributes.accounts,
    let balance = await Moralis.Web3API.account.getTokenBalances({address: accnNeeded});
    return balance;
    //let balance = await getTokenBalances(index);
}

function grabTokenIconLink(balance){
    return balance.logo;
}

async function postForm(){
    await buildPopulateDisplayForm();
    // let userForm = await buildPopulateDisplayForm();
    // document.body.appendChild(userForm);
}

function updateCheckedAddy(addy, isChecked){
    console.log(`Checkbox for address: ${addy} ${isChecked?'is checked':'is unchecked'}`);
}
