import { client } from '../../../sanity/lib/client';
import { Iproduct } from '@/lib/interfaces';
import ItemCard from '@/components/itemCard';
import Rerender from '@/components/re-render';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import CardSkeleton from '@/components/cardSkeleton';

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

const Page = async ({ searchParams }: { searchParams: { item: string } }) => {
    const SearchData: Iproduct[] = await getSearchData();
    const categoryData: { name: string, _id: string }[] = await getCategoryData()

    if (!searchParams.item) {
        revalidatePath("/menu")
    }

    function filterBycategoryChars(AllProduct: Iproduct[], searchItem: string) {
        let searchItemToLowerCase = searchItem?.toLowerCase();
        return AllProduct.filter((item) => item.category.toLowerCase().startsWith(searchItemToLowerCase))

    }
    function filterByStartingChars(AllProduct: Iproduct[], searchItem: string,) {
        let searchItemToLowerCase = searchItem?.toLowerCase();
        return AllProduct.filter((item) => item.name.toLowerCase().startsWith(searchItemToLowerCase) || item.category.toLowerCase().startsWith(searchItemToLowerCase) || item.name.toLowerCase().split(" ").find((val) => val.startsWith(searchItemToLowerCase)))

    }


    return (
        <section className='${poppin.className} text-[#4A1D1F] relative overflow-hidden height' >
            <div className='2xl:max-w-[1280px] mx-auto h-full py-[30px] lg:py-[40px] px-4 '>
                {!searchParams.item ? categoryData.map((category) => <div key={category._id}><span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`}>
                    {category.name}&apos;S
                </span>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
                        {SearchData.filter((Item) => Item.category === category.name).map((Item) => <ItemCard Item={Item} key={Item._id} />)}

                    </div> </div>) :
                    <Suspense fallback={<CardSkeleton />}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
                        {searchParams.item && filterByStartingChars(SearchData, searchParams.item).map((Item) => <ItemCard Item={Item} key={Item._id} />)}

                    </div></Suspense>
                }

            </div>
        </section>
    )
}

export default Page
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
