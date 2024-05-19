import csv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.core.files.storage import default_storage
from django.http import Http404
from .models import BankAccount
from .serializers import BankAccountSerializer, TransferSerializer

# Create your views here.

# upload csv file for accounts data
class UploadCSV(APIView):
    def post(self, request, format=None):
        if 'csv_file' not in request.FILES:
            return Response({'error': 'No file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['csv_file']
        file_path = default_storage.save(file.name, file)
        file_full_path = default_storage.path(file_path)

        try:
            with open(file_full_path, 'r') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    id = row.get('ID')
                    name = row.get('Name')
                    balance = row.get('Balance')
                    
                    if not all([id, name, balance]):
                        return Response({'error': f'Missing data in row: {row}'}, status=status.HTTP_400_BAD_REQUEST)
                    
                    # Convert balance str into decimal number
                    try:
                        balance = float(balance)
                    except ValueError:
                        return Response({'error': f'Invalid balance value in row: {row}'}, status=status.HTTP_400_BAD_REQUEST)

                    # Saving accounts to database "bank_accounts" table
                    try:
                        BankAccount.objects.get_or_create(
                            id=id,
                            defaults={
                                'name': name,
                                'balance': balance
                            }
                        )
                    except Exception as ex:
                        return Response({'error': f'Error saving row {row} into database. Error: {str(ex)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': 'CSV file has been uploaded successfully!'}, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({'error': f'Error processing CSV file: {str(ex)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# list all accounts
class BankAccountList(generics.ListAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

# transfer between accounts
# transfer between accounts
class TransferBalance(APIView):
    def post(self, request, format=None):
        serializer = TransferSerializer(data=request.data)
        if serializer.is_valid():
            from_account_id = serializer.validated_data['from_account_id']
            to_account_id = serializer.validated_data['to_account_id']
            amount = serializer.validated_data['amount']

            if amount <= 0:
                return Response({'error': 'Transfer amount must be positive.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                from_account = BankAccount.objects.get(id=from_account_id)
                to_account = BankAccount.objects.get(id=to_account_id)
            except BankAccount.DoesNotExist:
                return Response({'error': 'One or both accounts do not exist.'}, status=status.HTTP_404_NOT_FOUND)

            # Debugging prints
            print(f"from_account.balance: {from_account.balance}")
            print(f"transfer amount: {amount}")

            if from_account.balance < amount:
                return Response({'error': 'Insufficient funds in the from account'}, status=status.HTTP_400_BAD_REQUEST)

            from_account.balance -= amount
            to_account.balance += amount

            from_account.save()
            to_account.save()

            return Response({'success': 'Transfer completed successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountDetailView(APIView):
    def get_object(self, pk):
        try:
            return BankAccount.objects.get(pk=pk)
        except BankAccount.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = BankAccountSerializer(account)
        return Response(serializer.data)