import './style.css';

var coins = [
	 {name: "ETH",
	  changesPercent: false,
	  price: document.querySelector("#ETH .price span"),
	  hour:  document.querySelector("#ETH .changes .hour span"),
	  day:   document.querySelector("#ETH .changes .day span"),
	  week:  document.querySelector("#ETH .changes .week span"),
	  month: document.querySelector("#ETH .changes .month span")},
	 {name: "LTC",
	  changesPercent: false,
	  price: document.querySelector("#LTC .price span"),
	  hour:  document.querySelector("#LTC .changes .hour span"),
	  day:   document.querySelector("#LTC .changes .day span"),
	  week:  document.querySelector("#LTC .changes .week span"),
	  month: document.querySelector("#LTC .changes .month span")},
	 {name: "BTC",
	  changesPercent: false,
	  price: document.querySelector("#BTC .price span"),
	  hour:  document.querySelector("#BTC .changes .hour span"),
	  day:   document.querySelector("#BTC .changes .day span"),
	  week:  document.querySelector("#BTC .changes .week span"),
	  month: document.querySelector("#BTC .changes .month span")}
];
var initCurrency = "USD";

const baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"; 


function get(coin, currency) {
	let url = baseUrl + coin.name + currency;
	let oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.onreadystatechange = () => {
		if (oReq.readyState == 4 && oReq.status == 200) {
			let obj = JSON.parse(oReq.responseText);
			let changes = coin.changesPercent ? obj.changes.percent : obj.changes.price;
			coin.price.innerHTML = obj.bid + suffix(coin.changesPercent, currency);
			coin.hour.innerHTML = changes.hour + suffix(coin.changesPercent, currency);
			coin.day.innerHTML = changes.day + suffix(coin.changesPercent, currency);
			coin.week.innerHTML = changes.week + suffix(coin.changesPercent, currency);
			coin.month.innerHTML = changes.month + suffix(coin.changesPercent, currency);
		}
	}
	oReq.send();
};

function suffix(changesPercent, currency) {
	if (changesPercent)
		return '%';
	else if (currency === "USD")
		return '&#36';
	else if (currency === "EUR")
		return '&#8364';
	else if (currency === "RUB")
		return '&#8381';
	else if (currency === "GBP")
		return '&#163';
}

coins.forEach(coin => get(coin, initCurrency));
