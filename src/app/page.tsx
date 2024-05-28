import Carousels from "@/components/homeSections/carousels";
import Hero from "@/components/homeSections/hero";
import Quote from "@/components/homeSections/quote";
import { client } from "../../sanity/lib/client";
import { Iproduct } from "@/lib/interfaces";
import About from "@/components/homeSections/about";
import Contact from "@/components/homeSections/contact";
import Testimonial from "@/components/homeSections/testimonial";

const getProductData = async () => {
  const query = `*[ _type == "product" ][0...9]{
      name,
       _id,
       weight,
        price,
        "slug":slug.current,
       "Img": images[0].asset -> url,
       price_id,
       category
      
     }`

  const fetchData = await client.fetch(query);
  return fetchData 
}

export default async function Home() {
  const ProductData:Iproduct[]=await getProductData()
  return (
    <main id='home'>
      <Hero />
      <Quote/>
      <Carousels ProductData={ProductData}/>
      <About/>
      <Contact/>
      <Testimonial/>
    </main>
  );
}
