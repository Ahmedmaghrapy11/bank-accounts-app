Installation:

1. Clone the repository:
# git clone https://github.com/Ahmedmaghrapy11/bank-accounts-app

2. Navigate to the bank-accounts-frontend directory:
# cd bank-accounts-frontend

3. Install dependencies:
# npm install

4. Run the development server:
# npm run dev

5. Open your browser and visit http://localhost:5173/ to view the application.

6. Navigate to backend dir:
# cd..
# cd BankAccountsProject

7. Create a virtual environment (optional but recommended):
# virtualenv venv

8. Activate the virtual environment:
# venv\Scripts\activate

9. Install dependencies:
# pip install -r requirements.txt

10. Run migrations:
# python manage.py migrate

11. Start the development server:
# python manage.py runserver

API Endpoints:
1. POST /api/bank-accounts/upload-csv-file/: Upload CSV file to add bank accounts.
2. GET /api/bank-accounts/: List all bank accounts.
3. POST /api/bank-accounts/transfer/: Transfer funds between accounts.
4. GET /api/bank-accounts/details/<uuid:pk>/: View details of individual bank accounts.
