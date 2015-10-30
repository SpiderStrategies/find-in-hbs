#!/usr/bin/node
var cheerio = require('cheerio')
var argv = require('yargs').argv
var _ = require('lodash')
var exec = require('child_process').exec;
var fs = require('fs')

var selector = argv._[0]
var cmd = 'find . -name "*.hbs"';

var fileOnly = argv.l == true

exec(cmd, function(error, stdout, stderr) {
	var files = stdout.split("\n")
	_.each(files, function(item) {
		try {
			if(item == '') {
				return
			}
			var content = fs.readFileSync(item)

			var $ = cheerio.load(content.toString())
			//console.log($)
			if($(selector).length > 0) {
				console.log(item)
			}
		}
		catch(e) {
			console.error(e)
		}

	})
});