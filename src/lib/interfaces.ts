export interface IheroSection {
    name:string,
    mainText:string,
    desc:string,
    heroImg:string,
    featuredImgs:{
        _type:string,
        asset:{
            _ref:string,
            _type:string
        }
    }[],
    status:boolean
}