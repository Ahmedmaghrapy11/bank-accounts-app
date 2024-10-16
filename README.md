# Bank Accounts App

## Introduction
This is a full stack bank accounts application that allows users to manage bank accounts. Users can import bank accounts from a CSV file and transfer money from one account to another. The backend is built using Django Rest Framework with SQLite3 as the database, and the frontend is developed with Vite, React JS, and styled using Bootstrap. The app communicates between the frontend and backend using Axios for API calls.

## Technologies

### Backend:
- **Django**: 4.x.x
- **Django Rest Framework**: 3.x.x
- **SQLite3**: Database for local development

### Frontend:
- **Vite**: 4.x.x (Frontend tooling)
- **React JS**: 18.x.x
- **Bootstrap**: 5.x.x (For responsive design)
- **Axios**: 1.x.x (For making API calls)

## Features
- **Import CSV**: Upload a CSV file containing bank account details (e.g., account number, balance).
- **Account Listing**: View all bank accounts and their details.
- **Transfer Money**: Transfer funds between accounts using the frontend, which communicates with the backend via Axios API calls.
- **Error Handling**: Displays validation errors for invalid operations such as insufficient funds or incorrect account details.
- **Responsive UI**: The UI is responsive and styled using Bootstrap.

## Setup

### Backend (Django Rest Framework):
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ahmedmaghrapy11/bank-accounts-app.git
   cd BankAccountsProject
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```
   
3. **Activate the virtual environment**:
  - For windows
     ```bash
     venv\Scripts\activate
     ```
  - For macOS/Linux
      ```bash
       venv\Scripts\activate
      ```

4. **Install backend dependencies**:
   ```bash
     pip install -r requirements.txt
   ```
   
5. **Run migrations**:
   ```bash
     python manage.py migrate
   ```

6. **Start the Django server**:
   ```bash
     python manage.py runserver
   ```

### Frontend (Vite + React JS):

1. **Navigate to the frontend directory**:
   ```bash
     cd bank-accounts-frontend
   ```
   
2. **Install frontend dependencies**:
   ```bash
     npm install
   ```

3. **Start the Vite development server**:
   ```bash
     npm run dev
   ```
