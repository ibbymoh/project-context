import json

from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import CreateView
from django.contrib import messages
from django.urls import reverse,reverse_lazy
from django.http import HttpResponseRedirect,HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from PyPDF2 import PdfReader
import pytesseract
from pdf2image import convert_from_path, convert_from_bytes
from django.conf import settings
import openai

# Create your views here.

# poppler_path = r"C:\Users\User\Downloads\Release-23.01.0-0\poppler-23.01.0\Library\bin"
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def home(request):
    return render(request,'readingFunctionality/home.html')



def fileChange(request):
    if request.method == "POST":
        file = request.FILES['file']
        images = convert_from_bytes(file.read(), POPPLER_PATH)
        # Extract text from image
        ocr_text = pytesseract.image_to_string(images[0])
        array = ocr_text.split()
        return JsonResponse({"alpha":ocr_text})

def translate(request):
    if request.method == "GET":
        my_word = request.GET['word-choice']
        openai.api_key = settings.OPENAI_API_KEY
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            temperature=0.6,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant for text translation.",
                },
                {
                    "role": "user",
                    "content": f"explain the meaning of this word: {my_word}",
                },
            ]
        )
        result = response["choices"][0]["message"]["content"]

        return JsonResponse({"answer": result})

