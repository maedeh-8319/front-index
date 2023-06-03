document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', ()=>({
            users : [],
            pageUsers : [],
            isLoading : false,
            showAddModal : false,
            pagecount: 1,
            itemscount: 4,
            currentpage: 1,
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
            const start = (this.currentpage * this.itemscount) - this.itemscount  //0
            const end = this.currentpage * this.itemscount //4
            this.pageUsers =this.users.slice(start , end) 
            console.log(this.pageUsers);
        },
        nextpage(){
            this.currentpage++
            if (this.currentpage > this.pagecount) this.currentpage = this.pagecount
            this.pagination()
        },
        prevpage(){
            this.currentpage--
            if (this.currentpage < 1 ) this.currentpage = 1
            this.pagination()
        }

    }))
})