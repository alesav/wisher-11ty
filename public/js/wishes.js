document.addEventListener("DOMContentLoaded", function () {
	const recipientsSelect = document.getElementById("recipients");
	const holidaysSelect = document.getElementById("holidays");
	const professionsSelect = document.getElementById("professions");
	const styleSelect = document.getElementById("style");
	const wishText = document.getElementById("wish-text");
	const generateBtn = document.getElementById("generate-btn");
	const copyBtn = document.getElementById("copy-btn");
	const wishesContainer = document.getElementById("wishes-container");

	const validCombinations = {
		recipients: {
			parnja: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-dnem-zashitnika-otechestva",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypusknym-v-shkole",
				"s-vypussknym-v-universitete",
			],
			devushku: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-8-marta",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-dnem-materi",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypusknym-v-shkole",
				"s-vypussknym-v-universitete",
			],
			mamu: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-8-marta",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-dnem-materi",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypussknym-v-universitete",
			],
			papu: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-dnem-zashitnika-otechestva",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypussknym-v-universitete",
			],
			brata: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-dnem-zashitnika-otechestva",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypusknym-v-shkole",
				"s-vypussknym-v-universitete",
			],
			sestru: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-8-marta",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-dnem-materi",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypusknym-v-shkole",
				"s-vypussknym-v-universitete",
			],
			druga: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-dnem-zashitnika-otechestva",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypusknym-v-shkole",
				"s-vypussknym-v-universitete",
			],
			podrugu: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-8-marta",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-dnem-materi",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypusknym-v-shkole",
				"s-vypussknym-v-universitete",
			],
			babushku: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-8-marta",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-godovshinoj-svavadby",
				"so-svadboj",
			],
			dedushku: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-dnem-zashitnika-otechestva",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-godovshinoj-svavadby",
				"so-svadboj",
			],
			kollegu: [
				"s-dnem-rozhdeniya",
				"s-yubileem",
				"s-1-aprelya",
				"s-9-maya-dnem-pobedy-v-vov",
				"s-novym-godom",
				"s-rozhdestvom",
				"s-dnem-zashitnika-otechestva",
				"s-8-marta",
				"s-dnem-rossii",
				"s-dnem-vlyublennih",
				"s-dnem-materi",
				"s-godovshinoj-svavadby",
				"so-svadboj",
				"s-vypussknym-v-universitete",
			],
		},
		holidays: {
			"s-dnem-rozhdeniya": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-yubileem": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-1-aprelya": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-9-maya-dnem-pobedy-v-vov": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-novym-godom": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-rozhdestvom": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-8-marta": [
				"devushku",
				"mamu",
				"sestru",
				"podrugu",
				"babushku",
				"kollegu",
			],
			"s-dnem-zashitnika-otechestva": [
				"parnja",
				"papu",
				"brata",
				"druga",
				"dedushku",
				"kollegu",
			],
			"s-dnem-rossii": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-dnem-vlyublennih": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-dnem-materi": [
				"devushku",
				"mamu",
				"sestru",
				"podrugu",
				"babushku",
				"kollegu",
			],
			"s-godovshinoj-svavadby": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"so-svadboj": [
				"parnja",
				"devushku",
				"mamu",
				"papu",
				"brata",
				"sestru",
				"druga",
				"podrugu",
				"babushku",
				"dedushku",
				"kollegu",
			],
			"s-vypusknym-v-shkole": [
				"parnja",
				"devushku",
				"brata",
				"sestru",
				"druga",
				"podrugu",
			],
			"s-vypussknym-v-universitete": [
				"parnja",
				"devushku",
				"brata",
				"sestru",
				"druga",
				"podrugu",
			],
		},
	};

	setInitialDropdownValues();

	function updateDropdowns(changedDropdown) {
		const recipientDropdown = document.getElementById("recipients");
		const holidayDropdown = document.getElementById("holidays");

		if (changedDropdown === "recipients") {
			const selectedRecipient = recipientDropdown.value;
			const validHolidays =
				validCombinations.recipients[selectedRecipient] || [];

			Array.from(holidayDropdown.options).forEach((option) => {
				option.disabled = !validHolidays.includes(option.value);
			});

			if (!validHolidays.includes(holidayDropdown.value)) {
				holidayDropdown.value = "";
			}
		} else if (changedDropdown === "holidays") {
			const selectedHoliday = holidayDropdown.value;
			const validRecipients =
				validCombinations.holidays[selectedHoliday] ||
				Object.keys(validCombinations.recipients);

			Array.from(recipientDropdown.options).forEach((option) => {
				option.disabled = !validRecipients.includes(option.value);
			});

			if (!validRecipients.includes(recipientDropdown.value)) {
				recipientDropdown.value = "";
			}
		}
	}

	function updateURL() {
		const newPath =
			"/ru/pozdravit-" +
			recipientsSelect.value +
			"-" +
			(professionsSelect.value !== "ne-vazhno"
				? professionsSelect.value + "-"
				: "") +
			holidaysSelect.value +
			"-" +
			styleSelect.value;
		return newPath;
	}

	function setInitialDropdownValues() {
		if (selectedValues) {
			if (selectedValues.recipients) {
				recipientsSelect.value = selectedValues.recipients;
			}
			if (selectedValues.holidays) {
				holidaysSelect.value = selectedValues.holidays;
			}
			if (selectedValues.professions) {
				professionsSelect.value = selectedValues.professions;
			}
			if (selectedValues.style) {
				styleSelect.value = selectedValues.style;
			}
		}
		updateDropdowns("recipients");
		updateDropdowns("holidays");
	}

	function redirectToNewURL() {
		const newURL = updateURL();
		window.location.href = newURL;
	}

	recipientsSelect.addEventListener("change", () => {
		updateDropdowns("recipients");
		redirectToNewURL();
	});

	holidaysSelect.addEventListener("change", () => {
		updateDropdowns("holidays");
		redirectToNewURL();
	});

	[professionsSelect, styleSelect].forEach((select) => {
		select.addEventListener("change", redirectToNewURL);
	});

	function typeText(text, element, delay = 50) {
		let i = 0;
		element.innerHTML = "";
		const formattedText = text.split("\n");
		let currentLine = 0;

		const interval = setInterval(() => {
			if (currentLine < formattedText.length) {
				if (i < formattedText[currentLine].length) {
					element.innerHTML += formattedText[currentLine][i];
					i++;
				} else {
					element.innerHTML += "<br>";
					currentLine++;
					i = 0;
				}
			} else {
				clearInterval(interval);
			}
		}, delay);
		return interval;
	}

	async function generateWish() {
		const response = await fetch(
			"https://sonicjs.smspm.workers.dev/o/sendinwisher",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					who: recipientsSelect.options[recipientsSelect.selectedIndex].text,
					celebration:
						holidaysSelect.options[holidaysSelect.selectedIndex].text,
					occupation:
						professionsSelect.options[professionsSelect.selectedIndex].text,
					style: styleSelect.options[styleSelect.selectedIndex].text,
					language: "ru",
					slug: window.location.pathname.slice(4),
				}),
			}
		);
		const data = await response.json();
		if (data && data.result) {
			typeText(data.result, wishText);
		}
	}

	function displayRandomWish() {
		const wishCards = wishesContainer.querySelectorAll(".wish-card");
		if (wishCards.length > 0) {
			const randomIndex = Math.floor(Math.random() * wishCards.length);
			const randomWish = wishCards[randomIndex].querySelector("p").textContent;
			typeText(randomWish, wishText);
		} else {
			typeText(
				"Пока тут нет пожеланий, нажмите кнопку ниже чтобы сгенерировать первое",
				wishText
			);
		}
	}

	function displayWishes() {
		wishesContainer.innerHTML = "";
		if (Array.isArray(wishesData) && wishesData.length > 0) {
			wishesData.forEach((wish, index) => {
				const wishCard = document.createElement("div");
				wishCard.className = "wish-card";
				const wishText = typeof wish === "string" ? wish : wish.text;
				const formattedWishText = wishText.replace(/\n/g, "<br>");
				wishCard.innerHTML = `
					<p>${formattedWishText}</p>
					<div class="wish-footer">
						${
							typeof wish !== "string"
								? `
							<div class="rating">
								<span>Rating: </span>
								<span class="rating-value">${wish.rating}</span>
							</div>
							<div class="vote-buttons">
								<button class="upvote-btn">Upvote</button>
								<button class="downvote-btn">Downvote</button>
							</div>
						`
								: ""
						}
						<button class="copy-btn">Скопировать</button>
					</div>
				`;
				wishesContainer.appendChild(wishCard);
			});
		} else {
			wishesContainer.innerHTML =
				"<p>Пока тут нет пожеланий, нажмите кнопку ниже чтобы сгенерировать первое</p>";
		}
	}

	generateBtn.addEventListener("click", async () => {
		generateBtn.textContent = "Думаю...";
		typeText(
			"ИИ думает......................еще немного.................................ща все будет..........................",
			wishText
		);
		await generateWish();
		generateBtn.textContent = "Сгенерировать еще";
	});

	let currentTypingInterval = null;

	generateBtn.addEventListener("click", async () => {
		if (currentTypingInterval) {
			clearInterval(currentTypingInterval); // Stop the current typing if it's in progress }
			generateBtn.textContent = "Thinking...";
			currentTypingInterval = typeText(
				"ИИ думает......................еще немного.................................ща все будет..........................",
				wishText
			);
			const response = await generateWish();
			clearInterval(currentTypingInterval); // Stop the "thinking" text if (response && response.result) {
			typeText(response.result, wishText);
		}
		generateBtn.textContent = "Сгенерировать еще";
	});

	copyBtn.addEventListener("click", () => {
		navigator.clipboard.writeText(wishText.innerText);
	});

	function getFormattedWishText(wishCard) {
		const paragraphs = wishCard.querySelectorAll("p");
		let formattedText = "";
		paragraphs.forEach((p, index) => {
			formattedText += p.innerText;
			if (index < paragraphs.length - 1) {
				formattedText += "\n\n"; // Add double line break between paragraphs
			}
		});
		return formattedText;
	}

	wishesContainer.addEventListener("click", async (e) => {
		if (e.target.classList.contains("copy-btn")) {
			const wishCard = e.target.closest(".wish-card");
			const formattedWishText = getFormattedWishText(wishCard);
			navigator.clipboard.writeText(formattedWishText);
		} else if (
			e.target.classList.contains("upvote-btn") ||
			e.target.classList.contains("downvote-btn")
		) {
			cop;
			const wishCard = e.target.closest(".wish-card");
			const wishIndex = Array.from(wishesContainer.children).indexOf(wishCard);
			const voteType = e.target.classList.contains("upvote-btn")
				? "upvote"
				: "downvote";

			try {
				const response = await fetch(
					"https://sonicjs.smspm.workers.dev/o/sendinwisher",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							wishId: wishesData[wishIndex].id,
							voteType: voteType,
							ip: await fetch("https://api.ipify.org?format=json")
								.then((res) => res.json())
								.then((data) => data.ip),
						}),
					}
				);

				if (response.ok) {
					const data = await response.json();
					wishCard.querySelector(".rating-value").textContent = data.newRating;
					wishCard
						.querySelectorAll(".upvote-btn, .downvote-btn")
						.forEach((btn) => (btn.disabled = true));
				}
			} catch (error) {
				console.error("Error voting:", error);
			}
		}
	});

	// Initial wish generation and wishes display
	// generateWish();
	displayRandomWish();
	displayWishes();
});
