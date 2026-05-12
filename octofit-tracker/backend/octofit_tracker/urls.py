from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def api_root(request, format=None):
	return Response({
		'users': '/users/',
		'teams': '/teams/',
		'activities': '/activities/',
		'leaderboard': '/leaderboard/',
		'workouts': '/workouts/',
	})

urlpatterns = [
	path('', api_root, name='api-root'),
	# path('users/', include(...)),
	# path('teams/', include(...)),
	# path('activities/', include(...)),
	# path('leaderboard/', include(...)),
	# path('workouts/', include(...)),
]