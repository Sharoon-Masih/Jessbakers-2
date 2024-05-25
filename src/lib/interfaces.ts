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


}