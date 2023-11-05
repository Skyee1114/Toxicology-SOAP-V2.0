from django_react import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import dotenv_values
import openai
import json
import time
import re
import requests

config = dotenv_values(".env")
openai.api_key = settings.OPENAI_API_KEY


@csrf_exempt
def chatbot_api(request):
    if request.method == "POST":
        initial_prompt = "You are a medical report feedback assistant."
        messages = [{"role": "system", "content": initial_prompt}]
        
        try:
            request_data = json.loads(request.body)
            prompt = request_data.get("prompt", "")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})
        
        print("prompt:", prompt)
        messages.append({"role": "user", "content": prompt})
        
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            print(attempt)
            try:
                res = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=messages
                )
                assistant_response = res["choices"][0]["message"]["content"]
                messages.append({"role": "assistant", "content": assistant_response})
                return JsonResponse({"response": assistant_response})
            except Exception as e:
                print(f"API call failed (attempt {attempt+1}): {str(e)}")
                if attempt < max_retries - 1:
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
        
        return JsonResponse({"error": "Failed to get response from the API after multiple attempts."})
    
    return JsonResponse({"error": "Invalid request method."})


#1. Quick Overview

@csrf_exempt
def quick_overview(request):
    if request.method == "POST":
        initial_prompt = "You are a medical report feedback assistant. Could you please condense the exposure and abnormal findings from the given text into a six-line summary for a quick overview?"
        messages = [{"role": "system", "content": initial_prompt}]
        
        try:
            request_data = json.loads(request.body)
            print(request_data)
            input = request_data.get("input", "")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})
        
        print("input:", input)
        messages.append({"role": "user", "content": input})
        
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            print(attempt)
            try:
                res = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=messages
                )
                assistant_response = res["choices"][0]["message"]["content"]
                messages.append({"role": "assistant", "content": assistant_response})
                return JsonResponse({"response": assistant_response})
            except Exception as e:
                print(f"API call failed (attempt {attempt+1}): {str(e)}")
                if attempt < max_retries - 1:
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
        
        return JsonResponse({"error": "Failed to get response from the API after multiple attempts."})
    
    return JsonResponse({"error": "Invalid request method."})


#2. Comprehensive Note


@csrf_exempt
def comprehensive_note(request):
    if request.method == "POST":
        initial_prompt = """You're a medical toxicologist evaluating a ToxSOAP note for toxic substance exposure. Here are your tasks:
1. Identify any substances in the Toxsoap and their toxic mechanisms in the toxicity.
2. Use guidelines to compare the patient's consumed dose mentioned in the ToxSOAP with the toxic dose. Also, you must provide a toxic dose of each substance.
3. Use guidelines to compare the patient's consumed serum levels mentioned in the ToxSOAP with the toxic serum level in the guideline, considering elapsed time post-ingestion /exposure with the guidelines' values. It would be best if you informed me of any serum level above the normal range. Also, you must provide each serum level's threshold and toxic serum level, Identify elevated serum levels post-exposure and related symptoms.
4. For each toxic dose of a substance, assess the top 7 mild-moderate and severe clinical findings and Note ECG effects, like QTC prolongation or QRS widening.
5. Identify elevated serum levels post-exposure and related symptoms.
6. Determine the best scientific approach for treating each substance with a toxic dose or serum level.
6. Suggest administration specifics, including dose and administration way, if an antidote exists.
7. Suggest an appropriate observation period for each toxic dose and toxic substance level.
You must first look for information about the substances or serum levels in the guideline; if you couldn’t find information about the toxic dose or toxic serum level of any substance or serum level in the guideline, you can use other scientific resources and provide the answer. Remember, you are a medical toxicologist, and your audiences are medical toxicologists, so be specific and avoid any general advice."""
        
        with open('static/guideline.txt', 'r', encoding='utf-8') as file:
            guideline = file.read()

        initial_prompt =  initial_prompt + " guideline: " + guideline
        JsonResponse({"initial_prompt": initial_prompt})
        messages = [{"role": "system", "content": initial_prompt}]
        
        try:
            request_data = json.loads(request.body)
            input = request_data.get("input", "")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})        
        
        so = re.search(r"S:(.*?)A:", input, re.DOTALL).group(1).strip()
        so = "S: " + so
        messages.append({"role": "user", "content": so})
        print("so:", so)
    
        try:
            res = openai.ChatCompletion.create(
                model="gpt-3.5-tubo",
                messages=messages
            )
            assistant_response = res["choices"][0]["message"]["content"]
            messages.append({"role": "assistant", "content": assistant_response})
            return JsonResponse({"response": assistant_response})
        except Exception as e:
            print(f"API call failed (attempt): {str(e)}")       
    
    return JsonResponse({"error": "Invalid request method."})


#3. Differential Diagnosis


@csrf_exempt
def differential_diagnosis(request):
    if request.method == "POST":
        initial_prompt = "Please conduct a comprehensive analysis of the patient's exposure history, symptoms, clinical findings, physical examination findings, laboratory results, and serum substances. Determine if these levels are within toxic limits and consider the patient's medication history, ECG, and cardiovascular findings. Your goal is to create a detailed inventory of potential causes of poisoning. Use a combination of clinical findings, symptoms, physical examination results, abnormal laboratory values, and toxic serum levels to identify any undisclosed exposures based on irregularities. Generate a comprehensive list of potential differential diagnoses, with a focus on the top five potential poisonings. Take into account the patient's denial of other exposures and match specific poisonings based on a combination of clinical findings, symptoms, physical examination results, abnormal laboratory values, and toxic serum levels. Additionally, provide potential specific causes of poisoning for any observed organ toxicities based on the combination of clinical findings, symptoms, physical examination results, abnormal laboratory values, and toxic serum levels. Please present your response in a concise and well-organized manner that can be easily understood by medical professionals, medical toxicologists, and poison specialists who require a specific and concise differential diagnosis. Avoid offering general recommendations and instead focus on delivering specific and concise responses."
        messages = [{"role": "system", "content": initial_prompt}]
        
        try:
            request_data = json.loads(request.body)
            input = request_data.get("input", "")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})
        
        print("input:", input)
        messages.append({"role": "user", "content": input})
        
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            print(attempt)
            try:
                res = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=messages
                )
                assistant_response = res["choices"][0]["message"]["content"]
                messages.append({"role": "assistant", "content": assistant_response})
                return JsonResponse({"response": assistant_response})
            except Exception as e:
                print(f"API call failed (attempt {attempt+1}): {str(e)}")
                if attempt < max_retries - 1:
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
        
        return JsonResponse({"error": "Failed to get response from the API after multiple attempts."})
    
    return JsonResponse({"error": "Invalid request method."})

#4. Evaluation and Management

@csrf_exempt
def evaluation_and_management(request):
    if request.method == "POST":
        initial_prompt = "Chatgpt, please evaluate the medical report of the patient that includes 4 parts: S, O, A, P). then consider the medical toxicology scientific literature and answer these questions:  \n1.First evaluate if the consumed dose is toxic based on the patient's age or in another way, is it higher than the determined toxic dose?\n2.	Evaluate each available serum levels (the serum levels with a value) , then evaluate if the provided serum level is above the normal or acceptable range? in this evaluation you might want to consider elapsed time after ingestion in related to time of measuring the serum levels. Also you should consider the chronicity or acuity of the exposure, If it is acute you can use available nomograms in the scientific medical toxicology literatures , but in chronic cases, nomograms are not helpful at all.\n3.	After you determine which substances or serum levels are in toxic range, list them. If the dose or serum level of any substance is not in toxic range also mention that.\n4.	After finding the potentially harmful substances or high serum levels, provide potential clinical effects based on the proved literature or medical toxicology textbooks. For elevated serum levels you should  consider the serum level value and determine the severity of that serum level and then provide potential clinical effects\n5.	Finally provide a very specific and proved management strategy including antidote , etc ( your audience are medical toxicologists, so please be specific)\n6.	Provide observation time considering release type and need for antidote."
        messages = [{"role": "system", "content": initial_prompt}]
        try:
            request_data = json.loads(request.body)
            input = request_data.get("input", "")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})
        
        print("input:", input)
        messages.append({"role": "user", "content": input})
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            print(attempt)
            try:
                res = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=messages
                )
                assistant_response = res["choices"][0]["message"]["content"]
                messages.append({"role": "assistant", "content": assistant_response})
                return JsonResponse({"response": assistant_response})
            except Exception as e:
                print(f"API call failed (attempt {attempt+1}): {str(e)}")
                if attempt < max_retries - 1:
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
        
        return JsonResponse({"error": "Failed to get response from the API after multiple attempts."})
    
    return JsonResponse({"error": "Invalid request method."})


#5. Chatgpt Report


@csrf_exempt
def chatgpt_report(request):
    if request.method == "POST":
        initial_prompt = """Answer the following question from the input below. Answer in a complete sentence form.

Does the patient have been exposed to any venomous animals?
Does the patient expose any mushrooms or plants?
Does the patient have any previous disease?
Has the patient had any previous mental disorder?
Does the patient have any known allergies?
Does the patient smoke or use any tobacco products?
Does the patient consume alcohol?
Does the patient use any recreational drugs?
Did the patient ingest any acetaminophen recently?

Desired Format:
A Json array with question as key and the answer as value. """
        
        messages = [{"role": "system", "content": initial_prompt}]
        
        try:
            request_data = json.loads(request.body)
            input = request_data.get("input", "")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})
        
        print("input:", input)
        messages.append({"role": "user", "content": input})
        
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            print(attempt)
            try:
                res = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=messages
                )
                assistant_response = res["choices"][0]["message"]["content"]
                messages.append({"role": "assistant", "content": assistant_response})
                return JsonResponse({"response": assistant_response})
            except Exception as e:
                print(f"API call failed (attempt {attempt+1}): {str(e)}")
                if attempt < max_retries - 1:
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
        
        return JsonResponse({"error": "Failed to get response from the API after multiple attempts."})
    
    return JsonResponse({"error": "Invalid request method."})
