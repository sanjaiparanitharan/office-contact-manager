const API = "https://h4uoooso2l.execute-api.us-east-2.amazonaws.com/prod/records";

function addContact(){

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const email = document.getElementById("email").value;

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id: Date.now().toString(),
type:"contact",
name:name,
phone:phone,
email:email,
task:"",
status:"active"
})
})
.then(res=>res.json())
.then(data=>{
alert("Contact Added");
loadRecords();
});

}

function loadRecords(){

fetch(API)
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(item=>{
html += `<li>
Name: ${item.name || ""} |
Phone: ${item.phone || ""} |
Email: ${item.email || ""}
<button onclick="updateRecord('${item.id}')">Update</button>
<button onclick="deleteRecord('${item.id}')">Delete</button>
</li>`;
});

document.getElementById("records").innerHTML = html;

});
}

function deleteRecord(id){

fetch(API,{
method:"DELETE",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
id:id
})
})
.then(res=>res.json())
.then(data=>{
alert("Record Deleted");
loadRecords();
});

}

function updateRecord(id){

const name = prompt("Enter new name");
const phone = prompt("Enter new phone");
const email = prompt("Enter new email");

fetch(API,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:id,
name:name,
phone:phone,
email:email
})
})
.then(res=>res.json())
.then(data=>{
alert("Record Updated");
loadRecords();
});

}

