import fs from "node:fs";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { url } = req.body;

		if (!ytdl.validateURL(url)) {
			return res.status(400).json({ error: "Invalid YouTube URL" });
		}

		try {
			const videoId = ytdl.getURLVideoID(url);
			const videoPath = path.resolve("./videos", `${videoId}.mp4`);
			const writeStream = fs.createWriteStream(videoPath);

			const info = await ytdl.getInfo(url, {
				requestOptions: {
					headers: {
						cookie: "YOUR_COOKIES_HERE",
					},
				},
			});

			const format = ytdl.chooseFormat(info.formats, {
				quality: "highestvideo",
			});
			const totalSize = Number.parseInt(format.contentLength || "0", 10);
			console.log(`Total size: ${totalSize} bytes`);

			let downloadedSize = 0;

			ytdl(url, {
				quality: "highestvideo",
				requestOptions: {
					headers: {
						cookie: "YOUR_COOKIES_HERE",
					},
				},
			})
				.on("data", (chunk) => {
					downloadedSize += chunk.length;
					const percent = totalSize ? (downloadedSize / totalSize) * 100 : 0;
					console.log(`Progress: ${percent.toFixed(2)}%`);
				})
				.on("end", () => {
					console.log("Download complete");
					res.status(200).json({ downloadLink: `/videos/${videoId}.mp4` });
				})
				.on("error", (err) => {
					console.error("Download failed:", err);
					res.status(500).json({ error: "Failed to download video" });
				})
				.pipe(writeStream);

			writeStream.on("finish", () => {
				console.log("File write complete");
			});

			writeStream.on("error", (err) => {
				console.error("WriteStream error:", err);
			});
		} catch (error) {
			console.error("Error in download process:", error);
			res.status(500).json({ error: "Failed to process download" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
