// Select necessary elements from the DOM
const expenseForm = document.getElementById('expense-form'); // to add and event listener on submit
const expenseList = document.getElementById('expense-list'); // to add the expense lisiting dynamically
const addButton = expenseForm.querySelector("button[type='submit']"); // The Add Expense button

let editingRow = null; //Stores the row being edited

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault(); // to prevent page reload

    // collect user input 
    const name = document.getElementById('expense-name').value.trim();
    const amount = document.getElementById('expense-amount').value.trim();
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    //validate the input
    if (!name || !amount || !date) {
        alert("Please fill in all fields");
        return;
    }

     // If editing an existing expense
     if (editingRow){
        editingRow.children[0].textContent = name;
        editingRow.children[1].textContent = `$${amount}`;
        editingRow.children[2].textContent = category;
        editingRow.children[3].textContent = date;

        // Reset form state after updating
        addButton.textContent = "➕ Add Expense";
        editingRow = null; // Clear editing state
     }else{

    // create a new row
    const row = document.createElement('tr');
    row.innerHTML = 
        `
        <td>${name}</td>
        <td>$${amount}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>
            <button class="btn btn-warning btn-sm edit-btn">✏️</button>
            <button class="btn btn-danger btn-sm delete-btn">❌</button>
        </td>
    `;

    //append the row to the expense list which is in out tbody
    expenseList.appendChild(row);
    }

    // Clear the form fields for the new entry
    expenseForm.reset();

});

   // Handle Edit & Delete Buttons Using Event Delegation
   expenseList.addEventListener('click', function(event){
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr'); // Finds the nearest row
        row.remove(); //Removes the row from the table.

    } else if (event.target.classList.contains('edit-btn')) {
        // Edit Expense
        editingRow = event.target.closest('tr'); // Get the row being edited
        document.getElementById('expense-name').value = editingRow.children[0].textContent;
        document.getElementById('expense-amount').value = editingRow.children[1].textContent.replace("$", ""); // Remove $
        document.getElementById('expense-category').value = editingRow.children[2].textContent;
        document.getElementById('expense-date').value = editingRow.children[3].textContent;

        // Change button text to "Update Expense"
        addButton.textContent = "✏️ Update Expense";
    }
});