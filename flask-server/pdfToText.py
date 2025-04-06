def pdf_to_text(file):
    with open(file, 'r') as pdf_document:
        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            text = page.get_text()
    return text