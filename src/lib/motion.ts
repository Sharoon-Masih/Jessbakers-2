export const dropDown={
    hidden:{
        height:0,
    },
    show:{
        height:300,
        transition:{
            type:"tween",
            ease:"easeIn" 
        }
    }
}
export const dropup={
    hidden:{
        height:300,
    },
    show:{
        height:0,
        opacity:0,
        transition:{
            type:"tween",
            ease:"easeIn" 
        }
    }
}

export const expand=(action:boolean,screenSize?:"sm")=>{
 
return {
    hidden:{
        width: action && screenSize=== "sm" ? 0 : action ? 0 : "100px" 
    },
    show:{
        width: action && screenSize=== "sm" ? "auto" : action ? "100px" : 0,
        opacity: action ? 1 : 0,
        transition:{
            type:"tween",
            ease:"easeIn" 
        }
    }
 }
}