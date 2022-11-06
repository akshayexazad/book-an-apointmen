function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phonenumber', phonenumber)
    const obj = {
        name,
        email,
        phonenumber
    }
    axios.post("https://crudcrud.com/api/ba1ccf0acf6b4505ac8ac620143fa292/addnew",obj)
    .then((res)=>{
        showNewUserOnScreen(res.data)
        console.log(res)})

    .catch((err)=>{console.log(err)})
   axios("https://crudcrud.com/api/ba1ccf0acf6b4505ac8ac620143fa292/addnew")
   .then((res)=>{console.log(res)})

    // localStorage.setItem(obj.email, JSON.stringify(obj))
    // showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/ba1ccf0acf6b4505ac8ac620143fa292/addnew")
    .then((res)=>{
        for(i=0;i<res.data.length;i++){
            showNewUserOnScreen(res.data[i])
        }
        console.log(res)})
    .catch((err)=>{console.log(err)})

 })

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user._id}','${user.name}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(emailId, name, phonenumber){


    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(emailId)
 }

// deleteUser('abc@gmail.com')

function deleteUser(emailId){
    axios.delete(`https://crudcrud.com/api/ba1ccf0acf6b4505ac8ac620143fa292/addnew/${emailId}`)
    .then((res)=>{
     removeUserFromScreen(emailId)
    }).catch((err)=>{
     console.log(err)
    })
 
 }
 

function removeUserFromScreen(emailId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
