async function buildPopulateDisplayForm(){
    let userAccounts = Moralis.User.current().attributes.accounts;
    console.log(userAccounts);
    let allUserBalances = [];
    for( accn of userAccounts){
        let balances = await getTokenBalances(accn);
        allUserBalances.push(balances);
    }
    for(balanceArray of allUserBalances){
        let accnCard = buildAccountCard(balanceArray);
    }
    // return document.createElement('input');
}

async function buildAccountCard(balances){
    if(!balances.length){
        console.log('This account has no balances, not displaying');
        return;
    }
    else{
        let cardContainer = document.createElement('div');
        for(balance of balances){
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', `${balance.symbol}_balance_${balances.indexOf(balance)}`);
            checkbox.setAttribute('name', balance.symbol)
            //manage decimal differences for balances
            let wholeNumber = balance.balance;
            wholeNumber /= Math.pow(10, balance.decimals);
            //get the dollar value equivelant
            // let dollarValueEquivOptions = {
            //     address: balance.tokenAddress,
            //     exchange: "uniswap-v3"
            // };
            // let dollarEquiv = await Moralis.Web3API.token.getTokenPrice(dollarValueEquivOptions);

            // ERROR:
            // Uncaught (in promise) Error: No pools found with enough liquidity, to calculate the price
            // at Function.<anonymous> (moralis.js:7748:23)
            let label = document.createElement('label');
            let image = document.createElement('img');
            image.setAttribute('src', balance.thumbnail);
            label.setAttribute('for', `balance_${balances.indexOf(balance)}`);
            label.setAttribute('id', `label_${balance.symbol}_${balances.indexOf(balance)}`);
            label.innerHTML = `${balance.name}: ${wholeNumber}`;
            let breakTag = document.createElement('br');
            cardContainer.appendChild(image);
            cardContainer.appendChild(checkbox);
            cardContainer.appendChild(label);
            cardContainer.appendChild(breakTag);
            console.log(balance);
        }
        let totalTag = document.createElement('h2');
        totalTag.innerHTML = 'TOTAL:';
        let totalSpan = document.createElement('span');
        totalSpan.setAttribute('class', 'total');
        totalTag.appendChild(totalSpan);
        cardContainer.appendChild(totalTag);
        document.getElementById('account_cards').append(cardContainer);

    }
}