from django.urls import path
from base.views import order_views as views


urlpatterns =[
   path('add/',views.addOrderItem,name='add-order'),
    path('myorders/',views.getMyOrder,name='myorder'),

   path('<str:pk>/',views.getOrderById,name='get-order-by-id'),
   path('<str:pk>/pay/',views.updateOrderToPaid,name='pay'),
]
