from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer
# from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]