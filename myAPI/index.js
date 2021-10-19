document.body.innerHTML=`<div class="user-form">
<input class="add-user-name" placeholder="enter your name"/>
<input class="add-user-avatar" placeholder="enter your pic url">
<button onclick="addUser()">ADD USER</button>
</div>
<section class="user-list"></section>`;
 async function getAllUsers(){
     const data=await fetch("https://6166c4e813aa1d00170a6715.mockapi.io/users",{method:"GET"});
     const users=await data.json();
     const userContainer=document.querySelector(".user-list");
     userContainer.innerHTML="";
     users.forEach((user) => {
         userContainer.innerHTML+=`
         
         <div class="user-container">
         <img class="user-avatar" src="${user.avatar}" alt=${user.name}/>
         <div>
         <p class="user-name">${user.name}</p>
         <button onclick="toggleEdit(${user.id})">EDIT</button>
         <button onclick="deleteUser(${user.id})">DELETE</button>
         <div class="edit-user-form edit-${user.id}">
         <input value="${user.name}" class="edit-${user.id}-user-name" 
         placeholder="enter your name"/>
         <input value="${user.avatar}" class="edit-${user.id}-user-avatar" 
         placeholder="enter your url"/>
         <button onclick="saveUser(${user.id})">save</button>
         </div>
         </div>
         </div>
      
         `;
         
     });
     console.log(users);
 }
 getAllUsers();


 async function deleteUser(userId){
     console.log("Deleting...",userId);
     const data=await fetch("https://6166c4e813aa1d00170a6715.mockapi.io/users/" + userId,
     {method:"DELETE"});
     getAllUsers();
 }



 async function addUser(){
    console.log("Adding.....");
    const userName=document.querySelector(".add-user-name").value;
    const userAvatar=document.querySelector(".add-user-avatar").value;
    console.log(userName,userAvatar);
    const data=await fetch("https://6166c4e813aa1d00170a6715.mockapi.io/users",
    {method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name:userName,avatar:userAvatar}),
});
    getAllUsers();
}

function toggleEdit(userId){
    console.log("editing.....user");
    const editUserForm=document.querySelector(`.edit-${userId}`);
    console.log(editUserForm.style.display);
    editUserForm.style.display=
    editUserForm.style.display==="block"?"none":"block";

}
async function saveUser(userId)
{
console.log("saving.....",userId);
    const userName=document.querySelector(`.edit-${userId}-user-name`).value;
    const userAvatar=document.querySelector(`.edit-${userId}-user-avatar`).value;
    console.log(userName,userAvatar);
    const data=await fetch("https://6166c4e813aa1d00170a6715.mockapi.io/users/" + userId,
    {method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name:userName,avatar:userAvatar}),
}
    );
     getAllUsers();
}