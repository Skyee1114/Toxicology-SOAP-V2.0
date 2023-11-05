from django.urls import path
from api.views import chatbot_api, chatgpt_report, comprehensive_note, differential_diagnosis, evaluation_and_management, quick_overview

urlpatterns = [
    path("api/chatbot/", chatbot_api, name="chatbot_api"),#Test Sample Chatgpt api
    path("api/quick_overview/", quick_overview, name="quick_overview"),
    path("api/comprehensive_note/", comprehensive_note, name="comprehensive_note"),
    path("api/differential_diagnosis/", differential_diagnosis, name="differential_diagnosis"),
    path("api/evaluation_and_management/", evaluation_and_management, name="evaluation_and_management"),
    path("api/chatgpt_report/", chatgpt_report, name="chatbot_report"),
]




