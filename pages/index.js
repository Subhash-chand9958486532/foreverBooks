import Index from '../pages/componets/index/Index';
import Header from './header';
import React,{useEffect} from "react";
import Layout from './Layout'
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <>
    <Layout>
      <Index/>
    </Layout>
    </>
  )
}
