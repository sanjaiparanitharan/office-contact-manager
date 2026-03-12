const API = "https://h4uoooso2l.execute-api.us-east-2.amazonaws.com/prod/records";

// ==================== ADD CONTACT ====================
function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const task = document.getElementById("task").value || "";
    const status = document.getElementById("status").value || "active";

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Date.now().toString(),
            type: "contact",
            name: name,
            phone: phone,
            email: email,
            task: task,
            status: status
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Contact Added");
        // Clear input fields
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("task").value = "";
        document.getElementById("status").value = "active";
        loadRecords();
    })
    .catch(err => console.error("Error adding contact:", err));
}

// ==================== LOAD RECORDS ====================
function loadRecords() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
        let html = `
            <table border="1" cellpadding="5">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
        `;

        data.forEach(item => {
            html += `
                <tr>
                    <td>${item.id || ""}</td>
                    <td>${item.name || ""}</td>
                    <td>${item.phone || ""}</td>
                    <td>${item.email || ""}</td>
                    <td>${item.task || ""}</td>
                    <td>${item.status || ""}</td>
                    <td>
                        <button onclick="updateRecord('${item.id}')">Update</button>
                        <button onclick="deleteRecord('${item.id}')">Delete</button>
                    </td>
                </tr>
            `;
        });

        html += `</table>`;
        document.getElementById("records").innerHTML = html;
    })
    .catch(err => console.error("Error loading records:", err));
}

// ==================== DELETE RECORD ====================
function deleteRecord(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    fetch(API, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
    .then(res => res.json())
    .then(data => {
        alert("Record Deleted");
        loadRecords();
    })
    .catch(err => console.error("Error deleting record:", err));
}

// ==================== UPDATE RECORD ====================
function updateRecord(id) {
    const name = prompt("Enter new name");
    const phone = prompt("Enter new phone");
    const email = prompt("Enter new email");
    const task = prompt("Enter new task");
    const status = prompt("Enter new status");

    fetch(API, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: name,
            phone: phone,
            email: email,
            task: task,
            status: status
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Record Updated");
        loadRecords();
    })
    .catch(err => console.error("Error updating record:", err));
}

// ==================== INITIAL LOAD ====================
document.addEventListener("DOMContentLoaded", loadRecords);
