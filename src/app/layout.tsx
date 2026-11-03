import type {Metadata} from 'next';
import {GeistSans} from 'geist/font/sans';
import './globals.css';
export const metadata:Metadata={title:'SØUL AI — Your mind. Your rules.',description:'Your personal AI workspace'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ru"><body className={GeistSans.className}>{children}</body></html>}
