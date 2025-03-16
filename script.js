// Select necessary elements from the DOM
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const addButton = expenseForm.querySelector("button[type='submit']");

let editingRow = null; // Tracks the row being edited
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // Load saved expenses or start with an empty array

// Function to Save Expenses to Local Storage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to Load Expenses from Local Storage on Page Load
function loadExpenses() {
    expenseList.innerHTML = ""; // Clear table before loading
    expenses.forEach(expense => {
        addExpenseToTable(expense);
    });
}

// Function to Add Expense to Table
function addExpenseToTable(expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td>
            <button class="btn btn-warning btn-sm edit-btn">✏️</button>
            <button class="btn btn-danger btn-sm delete-btn">❌</button>
        </td>
    `;

    expenseList.appendChild(row);
}

// Handle Form Submission (Add or Edit Expense)
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect user input
    const name = document.getElementById('expense-name').value.trim();
    const amount = document.getElementById('expense-amount').value.trim();
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    if (!name || !amount || !date) {
        alert("Please fill in all fields.");
        return;
    }

    if (editingRow) {
        // Update existing expense
        const index = editingRow.dataset.index;
        expenses[index] = { name, amount, category, date };

        // Update table row with new data
        editingRow.children[0].textContent = name;
        editingRow.children[1].textContent = `$${amount}`;
        editingRow.children[2].textContent = category;
        editingRow.children[3].textContent = date;

        editingRow = null; // Reset editing state
        addButton.textContent = "➕ Add Expense";
    } else {
        // Add new expense
        const newExpense = { name, amount, category, date };
        expenses.push(newExpense);
        addExpenseToTable(newExpense);
    }

    saveExpenses(); // Save updated expenses to Local Storage
    expenseForm.reset();
});

// Handle Edit & Delete Buttons Using Event Delegation
expenseList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        // Delete Expense
        const row = event.target.closest('tr');
        const index = Array.from(expenseList.children).indexOf(row);
        expenses.splice(index, 1); // Remove from array
        row.remove();
        saveExpenses(); // Save updated expenses
    } else if (event.target.classList.contains('edit-btn')) {
        // Edit Expense
        editingRow = event.target.closest('tr');
        const index = Array.from(expenseList.children).indexOf(editingRow);
        const expense = expenses[index];

        // Load row data into the form
        document.getElementById('expense-name').value = expense.name;
        document.getElementById('expense-amount').value = expense.amount;
        document.getElementById('expense-category').value = expense.category;
        document.getElementById('expense-date').value = expense.date;

        addButton.textContent = "✏️ Update Expense";
        editingRow.dataset.index = index;
    }
});

// Load saved expenses when the page loads
loadExpenses();