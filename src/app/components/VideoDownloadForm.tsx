"use client";

import type React from "react";
import { type FormEvent, useState } from "react";

const VideoDownloadForm: React.FC = () => {
	const [url, setUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [downloadLink, setDownloadLink] = useState<string>("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setDownloadLink("");

		try {
			const response = await fetch("/api/download", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				throw new Error("Failed to download video.");
			}

			const data = await response.json();
			setDownloadLink(data.downloadLink);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="url"
					>
						YouTube Video URL
					</label>
					<input
						type="text"
						id="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="Enter the video URL"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						disabled={loading}
					>
						{loading ? "Downloading..." : "Download"}
					</button>
				</div>
				{error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
				{downloadLink && (
					<p className="text-green-500 text-xs italic mt-4">
						Download link:{" "}
						<a href={downloadLink} className="text-blue-500 underline" download>
							Click here
						</a>
					</p>
				)}
			</form>
		</div>
	);
};

export default VideoDownloadForm;
