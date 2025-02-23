const fs = require("fs");
const path = require("path");

// Function to dynamically import node-fetch
const fetch = async () => {
	const module = await import("node-fetch");
	return module.default;
};

// Function to read the current ID from updater-input.txt
const readCurrentId = () => {
	try {
		const data = fs.readFileSync("updater-input.txt", "utf8");
		return parseInt(data.trim(), 10);
	} catch (err) {
		console.error("Error reading updater-input.txt:", err);
		process.exit(1);
	}
};

// Function to write the last ID to updater-input.txt
const writeCurrentId = (id) => {
	try {
		fs.writeFileSync("updater-input.txt", id.toString(), "utf8");
	} catch (err) {
		console.error("Error writing updater-input.txt:", err);
	}
};

// Function to make the POST request and return the response
const fetchWishes = async (id) => {
	try {
		const nodeFetch = await fetch();
		const response = await nodeFetch(
			"https://sonicjs.smspm.workers.dev/o/wisherupdate",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, language: "ru" }),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (err) {
		console.error("Error making POST request:", err);
		process.exit(1);
	}
};

// Function to update the markdown file with the new wish data
const updateMarkdownFile = (wish) => {
	const { slug, wish: wishText, id, up, down, updated, language } = wish;
	const folderPath = path.join("content", language, slug);
	const filePath = path.join(folderPath, "index.md");

	try {
		// Read the existing content of the markdown file
		let fileContent = fs.readFileSync(filePath, "utf8");

		// Update the date field to today's date
		const today = new Date().toISOString().split("T")[0];
		fileContent = fileContent.replace(
			/date:\s*\d{4}-\d{2}-\d{2}/,
			`date: ${today}`
		);

		const wishStart = fileContent.indexOf("wishes:\n") + "wishes:\n".length;
		const wishesEnd = fileContent.indexOf("\nselectedValues:");

		// Extract the existing wishes section
		let existingWishes = fileContent
			.slice(wishStart, wishesEnd)
			.trim()
			.split(/(?=^- id:)/m)
			.filter((w) => w.trim());

		// Function to format a single wish
		const formatWish = (w) => {
			const lines = w.trim().split("\n");
			const formattedLines = lines.map((line, index) => {
				if (index === 0) return line; // Keep the "- id:" line as is
				return "  " + line.trim(); // Add two spaces to other lines
			});
			return formattedLines.join("\n");
		};

		// Format all existing wishes
		existingWishes = existingWishes.map(formatWish);

		// Remove the placeholder wish if it exists
		existingWishes = existingWishes.filter((w) => !w.includes("- id: 0"));

		// Check if the wish already exists
		const wishExists = existingWishes.some((w) => w.includes(`- id: ${id}`));

		if (
			!wishExists ||
			(wish.updated && new Date(wish.updated) > new Date(wishExists.updated))
		) {
			// Calculate the rating, it should be 0 if both up and down are 0
			let rating = 0;
			if (parseInt(up) === 0 && parseInt(down) === 0) {
				// console.log(`Rating for ${up}: ${down} is 0`);
			} else {
				rating = (
					(parseInt(up) - parseInt(down)) /
					(parseInt(up) + parseInt(down))
				).toFixed(2);
			}

			const newWishEntry = formatWish(`- id: ${id}
text: "${wishText.replace(/"/g, '\\"')}"
rating: "${rating}"
updated: "${updated}"`);

			const newWishesSection = [newWishEntry, ...existingWishes].join("\n");

			// Replace the old wishes section with the new one
			const updatedContent =
				fileContent.slice(0, wishStart) +
				newWishesSection +
				"\n" +
				fileContent.slice(wishesEnd);

			// Write the updated content back to the markdown file
			fs.writeFileSync(filePath, updatedContent, "utf8");
			console.log(`File updated: ${filePath}`);
		}
	} catch (err) {
		console.error("Error updating markdown file:", err);
	}
};

const main = async () => {
	const currentId = readCurrentId();
	const wishes = await fetchWishes(currentId);

	for (const wish of wishes) {
		updateMarkdownFile(wish);
		writeCurrentId(wish.id);
	}
};

main();
