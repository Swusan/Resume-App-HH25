import pymupdf as fitz

def pdf_to_text(pdf_path):
    pdf_document = fitz.open(pdf_path)
    for page_number in range(len(pdf_document)):
        page = pdf_document.load_page(page_number)
        text = page.get_text()
        pdf_document.close()
    
    return text