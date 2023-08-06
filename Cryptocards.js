function convertToJSON(response){
    return response.json();
}

function windowLoaded(){
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    .then(convertToJSON)
	.then(loadCoinData)
	
	fetch(
		`https://api.coingecko.com/api/v3/coins/dogecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
	)
		.then(convertToJSON)
		.then(renderDetails);
}

function loadCoinData(data) {
	const conversionRate = data.bitcoin.usd;
	fetch("https://api.coingecko.com/api/v3/search/trending")
		.then(convertToJSON)
		.then((data) => {
			render(data, conversionRate);
		});
}

function render(coinData, conversionRate) {
	coinData.coins.forEach(coin => {
		const singleCoin = coin.item;
		const logo = singleCoin.large;
		const name = `${singleCoin.name} (${singleCoin.symbol})`;
		const price = Math.round(singleCoin.price_btc * conversionRate * 10000) / 10000;
		insertCryptoCard(logo, name, price);
	})
}


function insertCryptoCard(logo, name, price) {
	const price_para = document.createElement("p");
	price_para.innerText = `$ ${price}`;

	const name_head = document.createElement("a");
	name_head.classList.add("card-title");
	name_head.href = `${logo}`;
	name_head.innerText = name;

	const right_container = document.createElement("div");
	right_container.classList.add("card-body")
	right_container.appendChild(name_head);
	right_container.appendChild(price_para);

	const img_elem = document.createElement("img");
	img_elem.src = logo;
	img_elem.classList.add("card-img-top");
	img_elem.alt = "coin image";

	const img_div = document.createElement("div");
	img_div.classList.add("position-relative");
	img_div.appendChild(img_elem);

	const card_container = document.createElement("article");
	card_container.classList.add("card");
	card_container.appendChild(img_div);
	card_container.appendChild(right_container);
	console.log(card_container);

	const card = document.createElement("div");
	card.classList.add("col-lg-4", "col-md-6", "col-12", "pb-5");
	card.appendChild(card_container);

	document.getElementById("coinCards").appendChild(card);
}

function renderDetails(data){
	const name = `${data.name} (${data.symbol.toUpperCase()})`;
	const description = data.description.en;
	const logo = data.image.large;
	
	

	const usd = data.market_data.current_price.usd;
	const eur = data.market_data.current_price.eur;
	const gbp = data.market_data.current_price.gbp;

	document.getElementById("coin-name").innerText = name;
	document.getElementById("coin-description").innerHTML = description;
	document.getElementById("coin-logo").src = logo;


	document.getElementById("usd-price").innerText = usd;
	document.getElementById("eur-price").innerText = eur;
	document.getElementById("gbp-price").innerHTML = gbp;
}


window.onload = () => {
	windowLoaded();
};