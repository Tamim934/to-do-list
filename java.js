let box=document.querySelector(".box")
let inp1=document.querySelector(".inp1")
let inp2=document.querySelector(".inp2")
let btnAdd=document.querySelector(".btnAdd")
let btnAddlog=document.querySelector(".btnAddlog")
let dialogAdd=document.querySelector(".dialogAdd")

let dialogEdit=document.querySelector(".dialogEdit")
let inpe1=document.querySelector(".inpe1")
let inpe2=document.querySelector(".inpe2")
let btndedit=document.querySelector(".btnedit")

let showd=document.querySelector(".showd")
let h1=document.querySelector(".h1")
let h2=document.querySelector(".h2")
let close=document.querySelector(".close")

let API="https://64f82679824680fd217f2db9.mockapi.io/api/v1/usernew"
btnAdd.onclick=function(){
    dialogAdd.showModal()
}
//GEt use form mockapi
async function getdata(){
    try {
       let response=await fetch("https://64f82679824680fd217f2db9.mockapi.io/api/v1/usernew")
    let data=await response.json()  
    console.log(data)
    getUser(data)
    } catch (error) {
        console.log(error)
    }
   
}
function add(){
    let Adduser={
        user:inp1.value,
        role:inp2.value,
    }
    Postuser(Adduser)
    dialogAdd.close()
}


// add user
async function Postuser(Adduser){
    try {
        let {data}=await axios.post(API,Adduser)
        getdata()
        // console.log(data)
    } catch (error) {
        console.log(error)
    }
}
btnAddlog.onclick=()=>{
    add()
}
// delete user
async function deleteUser(id){
    try {
        let {data}=await axios.delete(`${API}/${id}`)
        getdata()
    } catch (error) {
     console.log(error)   
    }
}
// edit user
btndedit.onclick=function(){
    let newEdit={
        user:inpe1.value,
        role:inpe2.value,
    }
    editUser(idx,newEdit)
    dialogEdit.close()
}
async function editUser(id,newEdit){
    try {
        let {data}=await axios.put(`https://64f82679824680fd217f2db9.mockapi.io/api/v1/usernew/${id}`,newEdit)
        getdata()
    } catch (error) {
        console.log(error)
    }
}
close.onclick=()=>{
    showd.close()
}


function getUser(data){
    box.innerHTML=""
    data.forEach((elem)=>{
        let con=document.createElement("div")
        con.classList.add("con")
        let user=document.createElement("p")
        
        let role=document.createElement("p")
        role.classList.add("role")
        let completed=document.createElement("p")
        let del=document.createElement("button")
      let input=document.createElement("input")
      let show=document.createElement("button")
      show.innerHTML="show"
      input.type="checkbox"
      completed.innerHTML="inactive"
input.checked=elem.completed;
input.onclick=()=>{
elem.completed=!elem.completed;
editUser(elem.id,elem)
}
if(elem.completed==true){
    user.classList.add("user")
    completed.innerHTML="Active"
    completed.classList.add("true")
}
completed.classList.add("false")

        del.innerHTML="delete"
        let editSHow=document.createElement("button")
editSHow.innerHTML="edit"

editSHow.onclick=()=>{
    idx=elem.id
inpe1.value=elem.user
inpe2.value=elem.role

    dialogEdit.showModal()
}
// del
del.onclick=function(){
    deleteUser(elem.id)
}
show.onclick=function(){
h1.textContent=elem.user
h2.textContent=elem.role
showd.showModal()
}
del.classList.add("del")
show.classList.add("show")
input.classList.add("com")
        user.innerHTML=elem.user
        role.innerHTML=elem.role
        completed.innerHTML=elem.completed
       
        con.appendChild(user)
        con.appendChild(role)
        con.appendChild(show)
        con.appendChild(completed)
        con.appendChild(del)
        con.appendChild(editSHow)
        con.appendChild(input)
        box.appendChild(con)
    })
}

getdata()