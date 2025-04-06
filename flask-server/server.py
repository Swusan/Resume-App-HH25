import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from processor import *
import os
import fitz # PyMyPDF

app = Flask(__name__)
CORS(app)

pdfData = {}

if __name__ == "__main__":
    app.run(debug=True)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Create processor and login to openai
pdfProcessor = Processor()
pdfProcessor.openai_login()

@app.route('/submit', methods=['POST'])
def upload():
    file = request.files['pdf']
    data = request.form
    op = data['op']
    
    raw_text = ""
    pdf_stream = file.read()
    pdf_document = fitz.open(stream=pdf_stream, filetype="pdf")
    for page_number in range(len(pdf_document)):
        page = pdf_document.load_page(page_number)
        raw_text += page.get_text()
    pdf_document.close()

    if (op == True):
        pdfData = (pdfProcessor.convert_resume(user_prompt=raw_text))
        return jsonify(pdfData), 200
    else:
        return pdfProcessor.evaluate_resume(raw_text, "job")