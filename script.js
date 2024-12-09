// Bank system object to hold accounts and operations
const bankSystem = {
    accounts: {},

    createAccount(accountHolderName, accountNumber, initialDeposit) {
        if (this.accounts[accountNumber]) {
            alert('Account already exists with this account number.');
            return false;
        }

        this.accounts[accountNumber] = {
            accountHolderName: accountHolderName,
            balance: initialDeposit
        };
        return true;
    },

    getBalance(accountNumber) {
        const account = this.accounts[accountNumber];
        if (account) {
            return account.balance;
        }
        return null;
    },

    deposit(accountNumber, amount) {
        const account = this.accounts[accountNumber];
        if (account) {
            account.balance += amount;
            return true;
        }
        return false;
    },

    withdraw(accountNumber, amount) {
        const account = this.accounts[accountNumber];
        if (account && account.balance >= amount) {
            account.balance -= amount;
            return true;
        }
        return false;
    }
};

// Handle form submissions
document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const accountHolderName = document.getElementById('accountHolderName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);

    if (bankSystem.createAccount(accountHolderName, accountNumber, initialDeposit)) {
        alert('Account created successfully!');
        this.reset();
    }
});

document.getElementById('viewBalanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const accountNumber = document.getElementById('viewAccountInput').value; // Updated to match the new id
    const balance = bankSystem.getBalance(accountNumber);

    const balanceMessage = document.getElementById('balanceMessage');
    if (balance !== null) {
        balanceMessage.textContent = `Current Balance: ₹${balance}`;
    } else {
        balanceMessage.textContent = 'Account not found!';
    }
});


document.getElementById('depositForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const accountNumber = document.getElementById('depositAccountNumber').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);

    const depositMessage = document.getElementById('depositMessage');
    if (bankSystem.deposit(accountNumber, amount)) {
        depositMessage.textContent = `₹${amount} deposited successfully!`;
    } else {
        depositMessage.textContent = 'Account not found!';
    }

    this.reset();
});

document.getElementById('withdrawForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const accountNumber = document.getElementById('withdrawAccountNumber').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);

    const withdrawMessage = document.getElementById('withdrawMessage');
    if (bankSystem.withdraw(accountNumber, amount)) {
        withdrawMessage.textContent = `₹${amount} withdrawn successfully!`;
    } else {
        withdrawMessage.textContent = 'Insufficient balance or account not found!';
    }

    this.reset();
});
