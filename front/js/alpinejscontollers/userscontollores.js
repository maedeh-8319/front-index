document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', ()=>({
            users : [],
            pageUsers : [],
            isLoading : false,
            showAddModal : false,
            pagecount: 1,
            itemscount: 4,
            currentpage: 3,
            getUsers(){
             this.isLoading = true;
              axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                 this.users = res.data
                 this.pagination()
              }).finally(()=>{
                 this.isLoading = false
            })
        },
        pagination(){
            this.pagecount = Math.ceil(this.users.length / this.itemscount) //10/4=3
            let start = (this.currentpage * this.itemscount) - this.itemscount  //0
            let end = this.currentpage * this.itemscount //4
            this.pageUsers =this.users.slice(start , end) 
            console.log(this.pageUsers);
        }

    }))
})