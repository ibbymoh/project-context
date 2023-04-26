import io
import json
import os
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import CreateView
from django.contrib import messages
from django.urls import reverse,reverse_lazy
from django.http import HttpResponseRedirect,HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from PyPDF2 import PdfReader, PdfWriter
import pytesseract
from pdf2image import convert_from_path, convert_from_bytes
from django.conf import settings
import openai


# Create your views here.
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# poppler_path = r"C:\Users\User\Downloads\Release-23.01.0-0\poppler-23.01.0\Library\bin"
pytesseract.pytesseract.tesseract_cmd = '/app/.apt/usr/bin/tesseract'
poppler_path = os.getenv("POPPLER_PATH")


def home(request):
    return render(request,'readingFunctionality/home.html')

def upload_text(request):
    return render(request,'readingFunctionality/upload-text.html')


def upload_doc(request):
    return render(request,'readingFunctionality/upload-doc.html')


def fileChange(request):
    if request.method == "POST":
        file = request.FILES['file']
        page_number = request.POST.get('pageNumber')
        language = request.POST.get('language')
        pdf_reader = PdfReader(file)
        pdf_writer = PdfWriter()
        page = pdf_reader.pages[int(page_number)-1]
        pdf_writer.add_page(page)
        buf = io.BytesIO()
        pdf_writer.write(buf)
        buf.seek(0)
        # pdf_writer.write()
        images = convert_from_bytes(buf.read(), poppler_path=poppler_path)
        # Extract text from image
        if language == "Arabic":
            ocr_text = pytesseract.image_to_string(images[0], lang='ara')
        elif language == "English":
            ocr_text = pytesseract.image_to_string(images[0], lang='eng')

        array = ocr_text.split()
        return JsonResponse({"alpha":array})

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
                    "content": f" This is a word in arabic or english ,explain the meaning of this word in english and give 3 examples of it context: {my_word}",
                },
            ]
        )
        result = response["choices"][0]["message"]["content"]

        return JsonResponse({"answer": result})


def view_guide(request):
    return render(request,"readingFunctionality/guide.html")