const fs = require("fs");
const path = require("path");
const readline = require("readline");

const recipientDisplayMapping = {
	parnja: "парня",
	devushku: "девушку",
	mamu: "маму",
	papu: "папу",
	brata: "брата",
	sestru: "сестру",
	druga: "друга",
	podrugu: "подругу",
	babushku: "бабушку",
	dedushku: "дедушку",
	kollegu: "коллегу",
	paru: "пару",
};
const holidayDisplayMapping = {
	"s-dnem-rozhdeniya": "c Днем рождения",
	"s-yubileem": "с Юбилеем",
	"s-1-aprelya": "с 1 апреля",
	"s-9-maya-den-pobedy-v-vov": "с 9 мая, день победы в ВОВ",
	"s-novym-godom": "с Новым годом",
	"s-rozhdestvom": "Рождеством",
	"s-8-marta": "с 8 марта",
	"s-dnem-zashitnika-otechestva": "с Днем защитника Отечества",
	"s-dnem-rossii": "с Днем России",
	"s-dnem-vlyublennih": "с Днем влюбленных",
	"s-dnem-materi": "с Днем матери",
	"s-godovshinoj-svavadby": "с Годовщиной свадьбы",
	"so-svadboj": "со Свадьбой",
	"s-vypusknym-v-shkole": "с Выпускным в школе",
	"s-vypussknym-v-universitete": "с Выпускным в университете",
};

const professionDisplayMapping = {
	"ne-vazhno": "Не важно",
	administrator: "администратора",
	akter: "актера",
	aitishnik: "айтишника",
	barmen: "бармена",
	biznesmen: "бизнесмена",
	bloger: "блогера",
	buhgalter: "бухгалтера",
	voditel: "водителя",
	voennyy: "военного",
	vrach: "врача",
	direktor: "директора",
	dizayner: "дизайнера",
	zhurnalist: "журналиста",
	inzhener: "инженера",
	kriptan: "криптана",
	menedzher: "менеджера",
	ohrannik: "охранника",
	perevodchik: "переводчика",
	predprinimatel: "предпринимателя",
	prodavets: "продавца",
	programmist: "программиста",
	razrabotchik: "разработчика",
	sekretar: "секретаря",
	taksist: "таксиста",
	uchitel: "учителя",
	fotograf: "фотографа",
};

const styleDisplayMapping = {
	smeshnoje: "Смешное",
	romantichnoe: "Романтичное",
	formalnoje: "Формальное и красивое",
};

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
};

const BATCH_SIZE = 1000;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const promptForNextBatch = () => {
	return new Promise((resolve) => {
		rl.question("Press Enter to generate the next batch...", resolve);
	});
};

const createFolderAndFile = (slug, title, selectedValues) => {
	const folderPath = path.join("content", "ru", slug);
	const fileContent = `---
title: ${title}
description: This is a post on My Blog about touchpoints and circling wagons.
date: 2018-09-30
tags: second tag
wishes:
  - "Это первое поздравление"
selectedValues:
  recipients: "${selectedValues.recipients}"
  holidays: "${selectedValues.holidays}"
  professions: "${selectedValues.professions}"
  style: "${selectedValues.style}"
---

Welcome here to My Blog about touchpoints and circling wagons.
Добро пожаловать на наш сайт! 

Здесь вы найдете отличную подборку поздравлений на любой случай. 
Хотите поздравить друга с днём рождения, коллегу с профессиональным праздником или близких с Новым годом? У нас есть всё, чтобы сделать ваш поздравительный текст незабываемым. Выбирайте нужную категорию и находите лучшие слова для ваших близких и друзей!
`;
	fs.mkdir(folderPath, { recursive: true }, (err) => {
		if (err) {
			return console.error(`Error creating folder: ${err.message}`);
		}
		console.log(`Folder created: ${folderPath}`);

		const filePath = path.join(folderPath, "index.md");
		fs.writeFile(filePath, fileContent, (err) => {
			if (err) {
				return console.error(`Error writing file: ${err.message}`);
			}
			console.log(`File created: ${filePath}`);
		});
	});
};

const isValidCombination = (recipient, holiday) => {
	return (
		validCombinations.recipients[recipient] &&
		validCombinations.recipients[recipient].includes(holiday)
	);
};

const generateSlugs = async () => {
	const slugs = [];
	for (const recipientKey in recipientDisplayMapping) {
		for (const holidayKey in holidayDisplayMapping) {
			if (!isValidCombination(recipientKey, holidayKey)) continue;

			for (const professionKey in professionDisplayMapping) {
				for (const styleKey in styleDisplayMapping) {
					const slugParts = ["pozdravit", recipientKey];
					const selectedValues = {
						recipients: recipientKey,
						holidays: holidayKey,
						professions: professionKey,
						style: styleKey,
					};

					if (professionKey !== "ne-vazhno") {
						slugParts.push(professionKey);
					}

					slugParts.push(holidayKey, styleKey);
					const slug = slugParts.join("-");

					const title = `Поздравить ${recipientDisplayMapping[recipientKey]}${
						professionKey !== "ne-vazhno"
							? " " + professionDisplayMapping[professionKey]
							: ""
					} ${holidayDisplayMapping[holidayKey]}. ${
						styleDisplayMapping[styleKey]
					}`;

					slugs.push({ slug, title, selectedValues });
				}
			}
		}
	}

	for (let i = 0; i < slugs.length; i += BATCH_SIZE) {
		const batch = slugs.slice(i, i + BATCH_SIZE);
		for (const { slug, title, selectedValues } of batch) {
			createFolderAndFile(slug, title, selectedValues);
		}
		if (i + BATCH_SIZE < slugs.length) {
			await promptForNextBatch();
		}
	}
	rl.close();
};

generateSlugs();