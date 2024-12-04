module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

            less: {
                production: {
                    options: {
                        compress: true
                    },
                    files: {
                        'dist/styles/main.min.css': 'src/styles/main.less'
                    }
                }
            },

            watch: {
                less: {
                    files: ['src/styles/**/*.less'],
                    task: ['less:production']
                },
                html: {
                    files: ['src/index.html'],
                    task: ['replace:dist']
                    },
                js: {
                    files: ['src/scripts/**/*.js'],
                    task: ['uglify','replace:dist']
                    }    
                },
                
            uglify: {
                target: {
                    files: {
                        'dist/scripts/main.min.js': 'src/scripts/main.js'
                            }
                        }
                    },

            replace: {
                dist: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_CSS',
                                replacement: './styles/main.min.css'
                            },
                            {
                                match: 'ENDERECO_JS',
                                replacement: './scripts/main.min.js'
                            }
                        ]
                    }
                }
            },

            files: [{
                src:'src/index.html',
                dest: 'dist/index.min.html'
            }],

            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        'dist/index.min.html': 'src/index.html'
                    }
                }
            }
            

    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-replace');


    grunt.registerTask('default', ['watch']);
}