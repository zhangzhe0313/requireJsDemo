# requireJsDemo
提供两种方式合并js文件，实例仅可作为 js 文件合并 配置参考，不可作为运行程序

方式一：gulp + requirejs

      实例：rjs目录与build目录同级 + gulpfile.js的配置;
      
           执行命令：gulp prod
     
方式二：r.js

      实例：rjs目录在js目录下，需执行两条node命令:
      
        1、node createBuild.js   动态生成配置文件msbuild.js;
        
        2、node r.js -o msbuild.js  根据配置文件msbuild.js执行js合并
