// Select necessary elements from the DOM
const expenseForm = document.getElementById('expense-form'); // to add and event listener on submit
const expenseList = document.getElementById('expense-list'); // to add the expense lisiting dynamically

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

    // create a new row
    const row = document.createElement('tr');
    row.innerHTML = 
        `
        <td>${name}</td>
        <td>$${amount}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>
            <button class="btn btn-danger btn-sm delete-btn">❌</button>
        </td>
    `;

    //append the row to the expense list which is in out tbody
    expenseList.appendChild(row);

    // Clear the form fields for the new entry
    expenseForm.reset();

});

   //handle delete button clicks.
   expenseList.addEventListener('click', function(event){
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr'); // Finds the nearest row
        row.remove(); //Removes the row from the table.

    }
});