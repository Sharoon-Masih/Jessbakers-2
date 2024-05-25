const NavItems:{
    id:number,
    name:string;
    path:string
}[]=[
    {
        id:1,
        name:"Home",
        path:"/"
    },
    {
        id:2,
        name:"Category",
        path:"category"
      
    },
    {
        id:3,
        name:"About Us",
        path:"#about"
    },
    {
        id:4,
        name:"Contact Us",
        path:"#contact"
    },
]

const Icons:{name:string,src:string}[]=[
    {
        name:"fb",
        src:"/fb/Facebook.png"
    },
    {
        name:"insta",
        src:"/insta/Instagram.png"
    },
    {
        name:"tweet",
        src:"/twit/Twitter.png"
    },
]

export {NavItems,Icons}

