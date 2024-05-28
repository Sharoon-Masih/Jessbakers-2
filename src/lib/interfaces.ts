export interface IheroSection {
    name: string,
    mainText: string,
    desc: string,
    heroImg: string,
    featuredImgs: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    }[],
    status: boolean
}

export interface Iproduct {

    _id: string,
    name: string,
    weight: number,
    price: number,
    "slug": string,
    "Img": string,
    price_id: string,
    category:string


}

export interface ICartProduct {
    name:string,
    price:number,
    description:string,
    image:string,
    id:string,
    currency:string,
    slug:string,
    category:string,
    price_id?:string

}