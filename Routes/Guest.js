const { assert } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');
const contentDisposition = require('content-disposition');
const information = {
	title: 'KhongCoTieuDe'
}
module.exports = (function() {

    router.get('/', function(req, res, next) {
    	res.send('Trang web đang cập nhật');
    });

    router.get('/youtube/mp3/:url', async(req, res) => {
		if (!req.params.url || req.params.url.length < 1) return false;
		const {
			player_response: {
			  videoDetails: { title, author },
			},
		} = await ytdl.getBasicInfo(req.params.url);
		
		const _mp3 = ytdl(req.params.url, {
			quality: 'highestaudio'
		});
		res.setHeader(
			'Content-Disposition',
			contentDisposition(title + '.mp3'),
			'Content-Type',
			'audio/mp3',
			'Content-Transfer-Encoding',
			'binary',
			'Cache-Control',
			'must-revalidate, post-check=0, pre-check=0'
		);
		_mp3.pipe(res);
		_mp3.on('progress', (chunkLength, downloaded, total) => {
			const percent = ((downloaded / total) * 100).toFixed(2);
			console.log(percent);
		});
    });
    return router;
})();
