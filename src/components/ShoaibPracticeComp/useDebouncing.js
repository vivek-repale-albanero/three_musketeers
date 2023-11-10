
const useDebouncing =(func,delay)=>{

    let id;
    function debounce(e){

        if(id){
            console.log("hy",id)
            clearTimeout(id)
        }

        id=setTimeout(() => {
            func(e)
        }, delay);

    }

    return debounce

}


export default useDebouncing