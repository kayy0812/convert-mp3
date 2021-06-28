const express = require('express');
const router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = (function() {

    router.get('/', function(req, res) {
    	res.send('index');
    });

    router.get('/convert_mp3/:url', function(req, res) { 	
    	ytdl.getInfo(req.params.url).then(info => {
    		const _mp3 = ytdl(req.params.url, {quality: 'highestaudio'});
    		const path_mp3 = './Temp/mp3/' + info.videoDetails.videoId + '.mp3';
    		if (!fs.existsSync(path_mp3)) {
    			_mp3.pipe(fs.createWriteStream(path_mp3));
    		    // _mp3.on('progress', (chunkLength, downloaded, total) => {
    		    // 	const percent = ((downloaded / total) * 100).toFixed(2);
    		    // 	console.log(percent);
    		    // });
    		    _mp3.on('end', () => {
    		    	res.download(path_mp3, info.videoDetails.title + '.wav');
    		    });
    		} else {	    
    		    res.download(path_mp3, info.videoDetails.title + '.wav');
    		}
    	});
    });	
    return router;
})();