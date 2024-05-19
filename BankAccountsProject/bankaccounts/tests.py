from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .models import BankAccount
import uuid
import os
import tempfile
import csv

class BankAccountTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.account_1 = BankAccount.objects.create(id=uuid.uuid4(), name="Account 1", balance=1000)
        self.account_2 = BankAccount.objects.create(id=uuid.uuid4(), name="Account 2", balance=2000)

    def test_get_all_accounts(self):
        response = self.client.get(reverse('bank_account_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)

    def test_get_account_details(self):
        response = self.client.get(reverse('account_details', args=[self.account_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], self.account_1.name)

    def test_transfer_funds(self):
        data = {
            "from_account_id": str(self.account_1.id),
            "to_account_id": str(self.account_2.id),
            "amount": 500
        }
        response = self.client.post(reverse('transfer_balance'), data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.account_1.refresh_from_db()
        self.account_2.refresh_from_db()
        self.assertEqual(self.account_1.balance, 500)
        self.assertEqual(self.account_2.balance, 2500)

    def test_upload_csv(self):
        csv_file = tempfile.NamedTemporaryFile(delete=False, mode='w', newline='')
        try:
            writer = csv.writer(csv_file)
            writer.writerow(['ID', 'Name', 'Balance'])
            writer.writerow([uuid.uuid4(), 'Account 3', 3000])
            writer.writerow([uuid.uuid4(), 'Account 4', 4000])
            csv_file.close()

            with open(csv_file.name, 'rb') as f:
                response = self.client.post(reverse('upload_csv'), {'csv_file': f})

            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(BankAccount.objects.count(), 4)
        finally:
            os.remove(csv_file.name)

    def test_transfer_funds_insufficient_balance(self):
        data = {
            "from_account_id": str(self.account_1.id),
            "to_account_id": str(self.account_2.id),
            "amount": 1500
        }
        response = self.client.post(reverse('transfer_balance'), data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.json())


    def test_transfer_funds_negative_amount(self):
        data = {
            "from_account_id": str(self.account_1.id),
            "to_account_id": str(self.account_2.id),
            "amount": -500
        }
        response = self.client.post(reverse('transfer_balance'), data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.json())

    def test_get_account_details_not_found(self):
        non_existent_id = uuid.uuid4()
        response = self.client.get(reverse('account_details', args=[non_existent_id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

