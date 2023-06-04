document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', ()=>({
            mainUsers : [],   
            users : [],
            pageUsers : [],
            isLoading : false,
            showAddModal : false,
            pagecount: 1,
            itemscount: 4,
            currentpage: 1,
            searchChar : "",
            newUserInfo: {
                name:"",
                username:"",
                email:"",
            },
            getUsers(){
             this.isLoading = true;
              axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                 this.mainUsers = res.data   
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
        },
        handleChangeItemsCount(e){
            this.currentpage = 1
            this.itemscount = e.value
            if(this.itemscount < 1) this.itemscount = 1
            if(this.itemscount > this.users.length) this.itemscount = this.users.length
            this.pagination()
        },
        handleSearch(value){
                this.users = this.mainUsers.filter(user=> (user.name.includes(value) || user.username.includes(value) || user.email.includes(value)))  
                this.currentpage = 1
                this.pagination()
        },
        handleSubmitAddUserForm(){
            this.isLoading = true;
            axios.post("https://jsonplaceholder.typicode.com/users" , this.newUserInfo).then((res) => {
              if (res.status === 201){
                this.mainUsers.push(res.data)
                this.showAddModal = false
                this.pagination()
              }
            }).finally(()=>{
               this.isLoading = false
          })
        }

    }))
})