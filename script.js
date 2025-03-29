const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

document.addEventListener("DOMContentLoaded", async () => {
	const bitcoinPriceElement = document.getElementById("bitcoinPrice");
	const bitcoinAmountInput = document.getElementById("bitcoinAmount");
	const calculateBtn = document.getElementById("calculateBtn");
	const usdAmountElement = document.getElementById("usdAmount");
	const defaultBitcoinPrice = 84255.69;
	let bitcoinPrice = localStorage.getItem("lastBitcoinPrice");

	try {
		const response = await fetch(API_URL);
		const data = await response.json();
		bitcoinPrice = data.bpi.USD.rate_float.toFixed(2) || defaultBitcoinPrice;
		localStorage.setItem("lastBitcoinPrice", bitcoinPrice);
		bitcoinPriceElement.textContent = bitcoinPrice;
	} catch (error) {
		bitcoinPrice = bitcoinPrice || defaultBitcoinPrice;
		bitcoinPriceElement.textContent = bitcoinPrice;
	}

	let bitcoinAmount = localStorage.getItem("bitcoinAmount");
	const calculateUSDAmount = () => {
		const bitcoinAmountValue = parseFloat(bitcoinAmountInput.value) || 0;
		const usdAmount = bitcoinAmountValue * parseFloat(bitcoinPrice);
		usdAmountElement.innerHTML = `<b>$${usdAmount.toFixed(2)} USD</b> worth of Bitcoin.`;
	};

	if (bitcoinAmount) {
		bitcoinAmountInput.value = bitcoinAmount;
		calculateUSDAmount();
	}

	calculateBtn.addEventListener("click", () => {
		localStorage.setItem("bitcoinAmount", bitcoinAmountInput.value);
		calculateUSDAmount();
	});
});