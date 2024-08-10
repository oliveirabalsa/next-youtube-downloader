declare module "ytdl-core" {
	interface VideoFormat {
		url: string;
		quality: string;
	}

	interface VideoInfo {
		formats: VideoFormat[];
	}

	function validateURL(url: string): boolean;

	function getInfo(url: string): Promise<VideoInfo>;

	function chooseFormat(
		formats: VideoFormat[],
		options: { quality: string },
	): VideoFormat;
}
