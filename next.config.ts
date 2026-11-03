import type {NextConfig} from 'next';
// GitHub Pages remains static; local/server deployment enables the API route.
const server=process.env.SOUL_SERVER_MODE==='1';
const config:NextConfig=server?{}:{output:'export',basePath:'/soul',trailingSlash:true,images:{unoptimized:true}};
export default config;
