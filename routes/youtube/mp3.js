import express from 'express';
import ytdl from 'ytdl-core';
import contentDisposition from 'content-disposition';
const router = express.Router();

router.get('/mp3', async (req, res, next) => {
	if (req.query.url) return next();
	res.send("No data");
}, async function(req, res) {
	const {
		player_response: {
			videoDetails: {
				title
			},
		},
	} = await ytdl.getBasicInfo(req.query.url);

	const file = ytdl(req.query.url, {
		quality: 'highestaudio'
	});
	res.setHeader(
		'Content-Disposition',
		contentDisposition(title + '.mp3')
	);
	file.pipe(res);
	file.on('end', () => {
		console.log('Xong');
	})
});

export default router;