module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: 'public/js/*.js',
        dest: 'js/main.js'
      }
    },
    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'js/main.min.js'
      }
    }
  });
 
  // Default task.
  grunt.registerTask('default', 'concat min');
 
};