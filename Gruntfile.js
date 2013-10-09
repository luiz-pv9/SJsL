module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    var i = function(file) {
        return 'source/' + file;
    }

    var x = function(file) {
        return i('Core/' + file);
    }

    var q = function(file) {
        return i('Util/' + file);
    }

    var files = [

        i('SJsL.js'),
        q('Clone.js'),
        q('VariableType.js'),
        x('String/*.js'),
        x('Object/*.js'),
        x('Array/*.js'),
        x('Number/*.js'),
        x('Function/*.js'),
        x('Date/*.js'),
        q('Sheet/*.js'),
        q('ShuntingYard/*.js'),
        q('Tree/*.js'),
        q('Unique/*.js'),
        q('Authorization/*.js'),
        i('SJsL.end.js')
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: files,
                dest: 'dist/SJsL-dist.js',
            },
        },
    });
}