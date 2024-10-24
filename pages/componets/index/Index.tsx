
import Banner from '../banner/Banner';
import AfterBanner from '../afterBanner/AfterBanner';
import NewReleases from '../newReleases/NewReleases';
import ShopByCategory from '../shopBy/shopBy';
import BestSellers from '../bestSellers/bestSellers';
import PopularBooks from '../popularBooks/PopularBooks';
import FastDeliviry from '../fastDeliviry/FastDeliviry';
import OnlineShop from '../onlineShopping/OnlineShoping';
import Head from 'next/head'

export default function Index() {
  return (
    <>
     <Head>
        <title>Home</title>
      </Head>
    <Banner/>
    <AfterBanner/>
    <NewReleases/>
    <ShopByCategory/>
    <BestSellers/>
    {/* <PopularBooks/> */}
    <FastDeliviry/>
    <OnlineShop/>
    </>
  )
}
