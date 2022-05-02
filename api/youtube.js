const { assert } = require('console')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const ytdl = require('ytdl-core')
const contentDisposition = require('content-disposition')
const information = {
	title: 'KhongCoTieuDe'
}
module.exports = (function() {

    router.get('/', function(req, res, next) {
    	res.send('Trang web đang cập nhật')
    });

    router.get('/youtube/mp3/:url', async(req, res) => {
		if (!req.params.url || req.params.url.length < 1) return false
		const {
			player_response: {
			  videoDetails: { title, author },
			},
		} = await ytdl.getBasicInfo(req.params.url);
		
		const file = ytdl(req.params.url, {
			quality: 'highestaudio'
		});
		res.setHeader(
			'Content-Disposition',
			contentDisposition(title + '.mp3'),
			'Content-Type',
			'audio/mp3',
			'Cache-Control',
			'must-revalidate'
		)
		file.pipe(res)
    });
    return router
})();
