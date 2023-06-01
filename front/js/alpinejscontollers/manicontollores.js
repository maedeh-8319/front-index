document.addEventListener('alpine:init', () => {
    Alpine.data('mainData', () => (
        {
            message: 'I Love Programming' , 
            names: ['maedeh','ali','mohammad'] ,
            testfunc: ()=>{
                alert(this.message)
            }
    }))
})