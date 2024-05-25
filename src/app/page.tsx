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
      
     }`

  const fetchData = await client.fetch(query);
  return fetchData //yaha ques yeh haka jasa uper wali line may fetchData ma await ka through promise resolve hoka agya but still yaha par yeh jab return kr rhay hain toh promise hi return ho rha hai. 
}

export default async function Home() {
  const ProductData:Iproduct[]=await getProductData()
  return (
    <main >
      <Hero />
      <Quote/>
      <Carousels ProductData={ProductData}/>
      <About/>
      <Contact/>
      <Testimonial/>
    </main>
  );
}
