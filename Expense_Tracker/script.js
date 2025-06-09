//Selections 

//form selections
const textarea = document.querySelector("#description")
const inputAmout = document.querySelector("#amount")
const addBtn = document.querySelector("#add-transaction-btn")

//transaction selections

const allTransactions = document.querySelector(".all-transactions")

// Totals
const expense = document.querySelector("#expense")
const income = document.querySelector("#income")

// calculating Totals
function updateSummary() {
    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach(({ amount }) => {
        const value = Number(amount);

        if (value < 0) {
            expense += value;
        } else {
            income += value;
        }

        balance += value;
    });

    // Update the UI
    document.querySelector("#balance").textContent = `$${balance.toFixed(2)}`;
    document.querySelector("#income").textContent = `$${income.toFixed(2)}`;
    document.querySelector("#expense").textContent = `$${Math.abs(expense).toFixed(2)}`;
}


// Transaction Data

const transactions = [];

// Redering the the amounts

function renderTransactions() {
    allTransactions.innerHTML = ""; // clear existing content

    transactions.forEach((data, index) => {
        const { amount, description } = data;

        const element = `
            <div class="transaction type-${amount.startsWith("-") ? "expense" : "income"}" id="transaction${index + 1}">
                <p class="purpose" id="transaction-purpose">${description}</p>
                <p class="amount" id="transaction-amount">$${amount}</p>
            </div>
        `;

        allTransactions.innerHTML += element;
    });
}

// handling the form

let inputData = {};

textarea.addEventListener("change", function(e) {
    inputData.description = e.target.value
})

inputAmout.addEventListener("change", function(e) {
    inputData.amount = e.target.value
})

addBtn.addEventListener("click", function() {
    const data = Object.assign({}, inputData);
    transactions.push(data);

    renderTransactions();
    updateSummary()
    
    inputData = {};
    textarea.value = "";
    inputAmout.value = "";
});

