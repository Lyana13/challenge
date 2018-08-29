import './style.css';

var COINS =
	{"ETH": {
		changesPercent: false,
		changes: {},
		price: document.querySelector("#ETH .price span"),
		hour:  document.querySelector("#ETH .changes .hour span"),
		day:   document.querySelector("#ETH .changes .day span"),
		week:  document.querySelector("#ETH .changes .week span"),
		month: document.querySelector("#ETH .changes .month span")},
	 "LTC": {
		changesPercent: false,
		changes: {},
		price: document.querySelector("#LTC .price span"),
		hour:  document.querySelector("#LTC .changes .hour span"),
		day:   document.querySelector("#LTC .changes .day span"),
		week:  document.querySelector("#LTC .changes .week span"),
		month: document.querySelector("#LTC .changes .month span")},
	 "BTC" : {
		changesPercent: false,
		changes: {},
		price: document.querySelector("#BTC .price span"),
		hour:  document.querySelector("#BTC .changes .hour span"),
		day:   document.querySelector("#BTC .changes .day span"),
		week:  document.querySelector("#BTC .changes .week span"),
		month: document.querySelector("#BTC .changes .month span")}
	};

var CURRENCY = "USD";


document.querySelector("#ETH .switch input").onclick = change_format;
document.querySelector("#LTC .switch input").onclick = change_format;
document.querySelector("#BTC .switch input").onclick = change_format;
document.querySelector(".currency select").onchange = change_currency;

// update_stats();

function change_format(e) {
	let coinName = e.target.name;
	let status = e.target.checked;
	let coinConf = COINS[coinName];
	coinConf.changesPercent = status;
	update_changes(coinConf, CURRENCY);
}

function change_currency(e) {
	CURRENCY = e.target.options[e.target.selectedIndex].value;
	update_stats();
}

function update_stats() {
	for (var coinName in COINS)
	{
		update_stat(coinName, COINS[coinName], CURRENCY)
	}
}



function update_stat(coinName, coinConf, currency) {
	let url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + coinName + currency;
	let oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.onreadystatechange = () => {
		if (oReq.readyState == 4 && oReq.status == 200) {
			let obj = JSON.parse(oReq.responseText);
			update_price(coinConf, obj.bid, currency);
			coinConf.changes = obj.changes;
			update_changes(coinConf, currency);
		}
	}
	oReq.send();
};

function update_price(coin, price, currency) {
	coin.price.innerHTML = get_currency_code(currency) + price.toFixed(2);
}

function update_changes(coin, currency) {
	let changes = coin.changesPercent ? coin.changes.percent : coin.changes.price;
	update_change(coin.hour, changes.hour, coin.changesPercent, currency);
	update_change(coin.day, changes.day, coin.changesPercent, currency);
	update_change(coin.week, changes.week, coin.changesPercent, currency);
	update_change(coin.month, changes.month, coin.changesPercent, currency);
}

function update_change(container, val, changesPercent, currency) {
	val = Math.round(val);

	if (val < 0) {
		container.style.color = "#bf0e22";
	} else {
		val = '+' + val;
		container.style.color = "#70c446"
	}

	val += changesPercent ? '%' : get_currency_code(currency);
	container.innerHTML = val;
}

function get_currency_code(currency) {
	if (currency === "USD")
		return '&#36;';
	else if (currency === "EUR")
		return '&#8364;';
	else if (currency === "RUB")
		return '&#8381;';
	else if (currency === "GBP")
		return '&#163;';
}
