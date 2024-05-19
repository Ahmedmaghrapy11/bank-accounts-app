from django.urls import path
from .views import UploadCSV, BankAccountList, TransferBalance, AccountDetailView

urlpatterns = [
    path('', BankAccountList.as_view(), name='bank_account_list'),
    path('upload-csv-file/', UploadCSV.as_view(), name='upload_csv'),
    path('transfer/', TransferBalance.as_view(), name='transfer_balance'),
    path('details/<uuid:pk>/', AccountDetailView.as_view(), name='account_details'),
]