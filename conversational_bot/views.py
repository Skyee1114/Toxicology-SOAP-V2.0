from dotenv import dotenv_values
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai
import os

from django_react import settings

from .models import Chat, Message
from .serializers import (
    ChatMessageSerializer,
    ChatResponseSerializer,
    MessageSerializer,
    ChatSerializer,
)

config = dotenv_values(".env")
openai.api_key = settings.OPENAI_API_KEY

class ChatGPT(APIView):
    def post(self, request, format=None):
        serializer = ChatMessageSerializer(data=request.data)
        if serializer.is_valid():
            report_data = serializer.validated_data.get('report_data', None)
            print(report_data)
            request_message = serializer.validated_data.get('message', None)
            chat_id = serializer.validated_data.get('chat_id', None)
            print(request_message)
            if chat_id:
                print(chat_id)
                chat = Chat.objects.get(id=chat_id)
            else:
                chat = Chat.objects.create()

            if not request_message:
                serializer = ChatSerializer(chat)
                return Response(serializer.data)
            
            user_message_obj = Message(content=request_message, role=Message.RoleChoices.USER, chat=chat)
            user_message_obj.save()

            messages = Message.objects.filter(chat=chat).order_by('timestamp')
            message_list = []
            
            initial_prompt = f"""As an AI chatbox, your role is to conduct a comprehensive analysis of a SOAP note for a patient who has been poisoned. 
                                Your task is to provide detailed and accurate answers to questions based on your assessment of the SOAP note. You should carefully search the SOAP note to find the necessary information to answer the questions. 
                                Your answers should be detailed, accurate, and specific to the information available in the SOAP note. If the question pertains to specific substance doses, toxic doses, serum levels, clinical findings, lab results, demographic information, or any other information provided in the SOAP note, you should search within the SOAP note and provide the relevant information to answer the question. 
                                If necessary, you may refer to the provided guideline for evaluation, and if the guideline does not provide sufficient information, you may use scientific sources to answer the questions. Please ensure that you provide proper citations or references from the note when applicable. Your goal is to provide a thorough and reliable analysis of the SOAP note to assist in understanding and treating the patient's poisoning. To accomplish this, your responses should demonstrate a deep understanding of medical toxicology and the ability to apply knowledge and information from the SOAP note accurately and comprehensively. 
                                Your responses should also be clear and concise, focusing on the most pertinent information to address each question. Please note that the optimized prompt retains the original prompt's instructions for assessing a SOAP note and answering questions based on its contents. However, it streamlines the instructions, making them clearer and more specific. It also emphasizes the importance of providing detailed, accurate, and specific answers by incorporating those qualities into the prompt itself. Additionally, the optimized prompt maintains the requirement for proper citations or references when applicable. 
                                In your answers, please ensure accuracy, detail, and clarity, as your analysis will inform the appropriate course of action for the poisoned patient. In any question you must look for the answer from the SOAP note and then in the guideline, if the answer wasn’t in these two search in other scientific resources.
                                1. Please provide general information and demographic details of both the patient and the caller. Include relevant information such as age, gender, and contact details. 
                                Additionally, provide any other pertinent details that may help in assessing the situation.
                                2. Evaluate the substance(s) involved in the poisoning. Analyze the patient's history of exposure to substances, the consumed dose, and the expected toxic dose of each substance. 
                                Assess the symptoms and clinical findings associated with each substance and provide explanations for their effects on the patient's health.
                                3. Analyze the results of the physical examination. Focus on relevant findings related to the patient's vital signs, neurological findings, and ECG. 
                                Explain the significance of these findings and how they relate to the patient's condition.
                                4. Examine the patient's medical history and medications. Identify any details that may be relevant to the poisoning and explain their potential impact on the patient's current situation.
                                5. Carefully assess the lab results. Please evaluate any serum level provided in the SOAP note. 
                                If I ask any question about the value of any serum level or its time you must carefully evaluate the note and provide the response. Consider the toxic level of each substance in relation to the time of ingestion or exposure. 
                                Evaluate each serum level and use the provided guideline to determine if it is higher than expected or outside the therapeutic range. Additionally, analyze any clinical findings, signs, and symptoms observed in the patient. Provide detailed explanations for your assessments. 
                                Also, if I have any question about the clinical finding of the patient you must find the answer based on the SOAP note.
                                6. Evaluate the suggested treatment and recommendations provided for the poisoned patient. Assess any recommended lab tests or procedures. 
                                Explain the rationale behind these recommendations and their potential effects on the patient's recovery.
                                7. Analyze the SOAP note for each section of Subjective (S), Objective (O), Assessment (A), and Plan (P). 
                                Evaluate the completeness and accuracy of each section and provide suggestions for improvement if necessary. 
                                Also, if I have any question about information in each section, you must find the answer based on the SOAP note.
                                8. Finally, answer a series of questions about the poisoned patient and evaluate the SOAP note each time you provide an answer. 
                                Your responses should be comprehensive and provide detailed explanations based on the information provided in the SOAP note.
                                In your answers, please ensure accuracy, detail, and clarity, as your analysis will inform the appropriate course of action for the poisoned patient. 
                                In any question you must look for the answer from the SOAP note and then in the guideline, if the answer wasn’t in these two search in other scientific resources.
            {report_data}"""
            with open('static/guideline.txt', 'r', encoding='utf-8') as file:
                guideline = file.read()

            initial_prompt =  initial_prompt + " guideline: " + guideline
            initial_setup = {"role": "user", "content": initial_prompt}
            message_list.append(initial_setup)

            for message in messages:
                # print(message)
                role = message.role
                # print(role)
                message_list.append({"role": role, "content": message.content})

            message_list.append({"role": "user", "content": request_message})

            print(message_list)
            response = openai.ChatCompletion.create(
                model="gpt-3.5-tubo",
                messages=message_list
            )

            ai_message = response.choices[0].message['content'].strip()

            ai_message_obj = Message(content=ai_message, role=Message.RoleChoices.ASSISTANT, chat=chat)
            ai_message_obj.save()

            response_serializer = ChatResponseSerializer(data={"message": ai_message})
            if response_serializer.is_valid():
                return Response({"message": response_serializer.validated_data["message"], "chat_id": chat.id})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, chat_id=None, format=None):
        if chat_id:
            # GET method for fetching messages in a chat
            chat = Chat.objects.get(pk=chat_id)
            messages = Message.objects.filter(chat=chat).order_by('timestamp')
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        else:
            # GET method for fetching all chats
            chats = Chat.objects.all().order_by('-created_at')
            serializer = ChatSerializer(chats, many=True)
            return Response(serializer.data)
