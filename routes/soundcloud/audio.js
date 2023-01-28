import express from 'express';
import SoundCloud from 'soundcloud-scraper';
import contentDisposition from 'content-disposition';
const router = express.Router();
const scdl = new SoundCloud.Client();

router.get('/audio', async (req, res, next) => {
	if (req.query.url) return next();
	res.send("No data");
}, async function(req, res) {
	scdl.getSongInfo(req.query.url)
    .then(async song => {
		const stream = await song.downloadProgressive();
        stream.pipe(res);
		res.set({
			'Content-Disposition': contentDisposition(`./${song.title}.mp3`),
			// 'Content-Type': format.mimeType,
			// 'Content-Length': format.contentLength
		});
    });
});

export default router;