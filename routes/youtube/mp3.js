import express from 'express';
import ytdl from 'ytdl-core';
import contentDisposition from 'content-disposition';
const router = express.Router();

router.get('/mp3', async (req, res, next) => {
	if (req.query.url) return next();
	res.send("No data");
}, async function(req, res) {
	const file = ytdl(req.query.url, {
		quality: 'highestaudio'
	});

	file.pipe(res);
	file.once('info', (info, format) => {
		const {
			player_response: {
				videoDetails
			}
		} = info;

		res.set({
			'Content-Disposition': contentDisposition(`${videoDetails.title}.mp3`),
			'Content-Type': format.mimeType,
			'Content-Length': format.contentLength
		});
	});
});

export default router;