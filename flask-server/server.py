import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import pdfToText
import processor

app = Flask(__name__)
CORS(app)

pdfData = {}

if __name__ == "__main__":
    app.run(debug=True)

# Create processor and login to openai
pdfProcessor = processor()
pdfProcessor.openai_login()

@app.route('/submit', methods=['POST'])
def upload():
    file = request.files['pdf']

    pdfData = (pdfProcessor.convert_resume(user_prompt=pdfToText(file)))

    return jsonify(pdfData), 200