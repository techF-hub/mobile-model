import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import path from 'path'
// UI 库的按需加载
// import styleImport from 'vite-plugin-style-import'
// gzip 压缩
// import viteCompression from 'vite-plugin-compression'

const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // viteCompression(), // gzip 压缩
    // styleImport({ // UI 库的按需加载
    //   libs: [
    //     {
    //       // 这里使用的是 react 版的 antd，如果需要用到其他的库，可以看看文档
    //       libraryName: 'antd',
    //       esModule: true,
    //       resolveStyle: name => {
    //         return `antd/es/${name}/style/index`
    //       }
    //     }
    //   ]
    // })
  ],
  base: isProduction ? './' : '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    /**
     * npm install --save-dev sass-loader
     * npm install --save-dev node-sass
     * npm install --save-dev sass
     */
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/global.scss";$static2:"${ 'http://a.com' }/static2";`
      }
    }
  },
  server: {
    open: false, // 如果需要在服务启动后自动打开页面可以打开这个设置
    // proxy: {
    //   '/api': {
    //     target: 'www.mockUrl.com',
    //     changeOrigin: true
    //   }
    // }
  },
  build: {
    // brotliSize: false // 是否压缩，默认为 true
  },
});
