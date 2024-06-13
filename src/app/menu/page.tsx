import { client } from '../../../sanity/lib/client';
import { Iproduct } from '@/lib/interfaces';
import ItemCard from '@/components/itemCard';
import { auth } from '@clerk/nextjs/server';


const getSearchData = async () => {
    const query = `*[ _type == "product" ]{
        name,
         _id,
         weight,
          price,
          "slug":slug.current,
         "Img": images[0].asset -> url,
         price_id,
         "category": category -> name
        
       }`

    const fetchData: Iproduct[] = await client.fetch(query);
    return fetchData
}
const getCategoryData = async () => {
    const query = `*[ _type == "category" ]{
        name,
         _id,
        }`

    const fetchcategoryData = await client.fetch(query);
    return fetchcategoryData
}

// console.log(await getCategoryData());

const Menu = async ({ searchParams }: { searchParams: { item: string } }) => {
    const SearchData: Iproduct[] = await getSearchData();
    const categoryData: { name: string, _id: string }[] = await getCategoryData()
    
    const {sessionClaims}=auth()
    const currentUserId=sessionClaims?.userId as string

    // function filterBycategoryChars(AllProduct: Iproduct[], searchItem: string) {
    //     let searchItemToLowerCase = searchItem?.toLowerCase();
    //     return AllProduct.filter((item) => item.category.toLowerCase().startsWith(searchItemToLowerCase))

    // }
    function filterByStartingChars(AllProduct: Iproduct[], searchItem: string,) {
        let searchItemToLowerCase = searchItem?.toLowerCase();

        // return AllProduct.filter((item) => item.name.toLowerCase().startsWith(searchItemToLowerCase) || item.category.toLowerCase().startsWith(searchItemToLowerCase) || item.name.toLowerCase().split(" ").find((val) => val.startsWith(searchItemToLowerCase))) 

        //before i was using the above logic for dynamic searching like kay user koi be alphabet put kray or phr uss alphabet ki base pa result ajay chahay wo ek single letter hi kiu na ho , so for that logic now i am using the "includes()" method.

        return AllProduct.filter((item) => item.name.toLowerCase().includes(searchItemToLowerCase) || item.category.toLowerCase().includes(searchItemToLowerCase)) //here we are filtering by using includes() method of array which return true even if single character matches in the string, it will not consider spaces.

    }


    return (
       <section className='${poppin.className} text-[#4A1D1F] relative overflow-hidden height' >
            <div className='2xl:max-w-[1280px] mx-auto h-full py-[30px] lg:py-[40px] px-4 '>
               {!searchParams.item ? categoryData.map((category) => <div key={category._id}><span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`} id={`${category.name}`}>
                    {category.name}&apos;S
                </span>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
                        {SearchData.filter((Item) => Item.category === category.name).map((Item) => <ItemCard Item={Item} key={Item._id} currentUserId={currentUserId}/>)}

                    </div> </div>) :
                    
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
                           {searchParams.item && filterByStartingChars(SearchData, searchParams.item).map((Item) =><ItemCard Item={Item}  key={Item._id} currentUserId={currentUserId}/> )}

                        </div>
                } 

            </div>
        </section>
    )
}

export default Menu
{/* <span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`}>
Cupcake&apos;S
</span>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
{searchParams.item ? filterByFirstChar(SearchData, searchParams.item).map((Item) => <ItemCard Item={Item} key={Item._id} />) : SearchData.filter((Item) => Item.category === "cupcake").map((Item) => <ItemCard Item={Item} key={Item._id} />)}

</div>
<span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`}>
pasterie&apos;S
</span>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
{searchParams.item ? filterByFirstChar(SearchData, searchParams.item).map((Item) => <ItemCard Item={Item} key={Item._id} />) : SearchData.filter((Item) => Item.category === "pasteries").map((Item) => <ItemCard Item={Item} key={Item._id} />)}

</div> */}
