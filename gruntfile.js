// 执行压缩、合并代码操作
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //清除目录
    clean: {
      all: ['dest/*'],
      unImg: ["dest/*", "!dest/images"]
    },

    // 复制文件
    copy: {
      main: {
        files: [
          {expand: true, src: ['fonts/*'], dest: 'dest'},
          {expand: true, src: ['components/**.css'], dest: 'dest'},
          {expand: true, src: ['index.html'], dest: 'dest'}
        ]
      }
    },
    // 合并文件
    concat:{
      'dest/components/lib.js': ['components/jquery-1.10.2.min.js', 'components/progress.min.js', 'components/bootstrap.min.js']
    },

    //压缩JS
    uglify: {
      generated: {
        files: [
          {dest: 'dest/datas/datas.js', src: ['datas/*.js']},
          // {dest: 'dest/js/main.js', src: ['js/main.js']},
          // {dest: 'dest/js/util.js', src: ['js/util.js']}
          {dest: 'dest/js/main.js', src: ['js/util.js', 'js/main.js']}
        ]
      }
    },

    //压缩CSS
    cssmin: {
      generated: {
        files: {
          'dest/css/main.css': ['css/main.css']
          // 'dest/css/lib.css': ['components/bootstrap.min.css']
        }
      }
    },

    //压缩图片
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [{expand: true, 
            cwd: 'images/', 
            src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'], 
            dest: 'dest/images'
        }]
      }
    },

    // 处理html中css、js 引入合并问题
    useminPrepare:{
      html: 'index.html',
      options: {
        root: 'threeKingdoms_xq',
        dest: 'dest'
      }
    },
    usemin: {
      html: 'dest/index.html'
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      html: {
        files: {
          'dest/index.html': 'dest/index.html'
        }
      }
    }

  });
  // 加载任务的插件
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');
  // grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'cssmin', 'imagemin', 'htmlmin', 'usemin']);
  grunt.registerTask('default', ['clean:unImg', 'copy', 'uglify:generated', 'cssmin', 'concat', 'usemin']);
  // grunt.registerTask('default', ['imagemin']);
};