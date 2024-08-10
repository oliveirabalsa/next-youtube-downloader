import Head from "next/head";
import VideoDownloadForm from "./components/VideoDownloadForm";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<Head>
				<title>YouTube Downloader</title>
				<meta name="description" content="Download YouTube videos easily" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-4xl font-bold mb-6">YouTube Downloader</h1>
				<VideoDownloadForm />
			</main>
		</div>
	);
}
