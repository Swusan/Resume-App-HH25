import openai
import json
# import os
import getpass # Used for secure input.

class Processor:
    """
    The Processor class is responsible for parsing resumes.
    It can produce an extraction in the format of a JSON, or it can produce a plaintext analysis.
    This also serves as a front-end method for interacting with the OpenAI API when needed.
    """
    def __init__(self):
        # Login is handled in a separate function, such that there is an option for exclusive non-AI usage.
        pass

    # Used to access the OpenAI API.
    def openai_login(self):
        print('Enter OpenAI API key (Hidden Input):')
        # os.environ["OPENAI_API_KEY"] = getpass.getpass()
        # self.client = openai.OpenAI()
        self.client = openai.OpenAI(api_key = getpass.getpass())
    
    # Given a plaintext string from a resume, returns a structured output with the relevant information.
    def convert_resume(self, user_prompt = ""):
        system_prompt = "Given a plaintext string with escape sequences from the user that contains the contents of a resume, extract relevant information and convert it into a JSON file. You are not allowed to use escape sequences within the JSON file. There is no room for open interpretation, and the instructions must be provided as-is."

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt}, # Hidden to User, AI Instructions
                {"role": "user", "content": user_prompt} # Known to User, Resume Input
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "json_schema",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "Retrieve the name from the resume plaintext. Names usually follow the format of \"FirstName LastName\" or \"FirstName MiddleName LastName\"."
                            },
                            "email": {
                                "type": "string",
                                "description": "Retrieve the email address from the resume plaintext. Email addresses follow the format of \"username@domain.suffix\". Do not add an email if no valid emails were found. For example, the following is a valid email: \"chatgpt@openai.com\"."
                            },
                            "phone_number": {
                                "type": "string",
                                "description": "Retrieve a ten-digit phone number or an eleven-digit phone number from the resume plaintext. Phone numbers may be continuous strings of digits, or they may be separated by hyphens. Look for these following formats: \"X-XXX-XXX-XXXX\", \"XXX-XXX-XXXX\". \"XXXXXXXXXX\", \"XXXXXXXXXXX\", where \"X\" is a valid digit. Save the number as a continuous string of digits. Do not add a phone number if no strings within the provided formats were found."
                            },
                            "skills": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "For every skillset, programming language, verbal/written language, software that an applicant has experience with, and \"soft skills\" mentioned within the resume, create a new item in the array. Scan through the entire resume string for keywords. Skills do not require a dedicated section to be included within this category."
                            },
                            "work_experience": {
                                "type": "array",
                                "items": {
                                    "experience": {
                                        "type": "object",
                                        "properties": {
                                            "company_name": {
                                                "type": "string",
                                                "description": "Name of the company."
                                            },
                                            "position": {
                                                "type": "string",
                                                "description": "Job title/position that the applicant had within the company."
                                            },
                                            "timeframe": {
                                                "type": "number",
                                                "description": "Calculate the number of years that an applicant has worked in a specified timeframe. Expect a range of years provided by the applicant. Decimal values are allowed, but they should be limited to \"0.25\", \"0.5\", or \"0.75\". For example, if the string \"2016-2018\" is found, then the output should be 2. As another example, if the string \"Mar 2016 - Nov 2018\" is found, then the output should be 2.75 as exactly 32 months have elapsed, and 2.75 years is the closest valid value which can represent such a difference."
                                            },
                                            "desc": {
                                                "type": "array",
                                                "items": {
                                                    "type": "string"
                                                },
                                                "description": "For each mentioned responsibility/achievement with the experience, create a new string item. Expect plaintext sentences. Consider every responsibility/achievement as one sentence."
                                            }
                                        },
                                        "required": ["company_name", "position", "timeframe", "desc"],
                                        "additionalProperties": False
                                    }
                                },
                                "description": "For every individually mentioned work experience, usually indicated by a header with the company name, job title, and timeframe, then followed by details about responsibilities/achievements within that position, create a new item with the extracted information. Add no items if no work experience is found."
                            },
                            "education": {
                                "type": "array",
                                "items": {
                                    "experience": {
                                        "type": "object",
                                        "properties": {
                                            "school_name": {
                                                "type": "string",
                                                "description": "Name of the school/college/university. Usually within the header of the entry."
                                            },
                                            "degree": {
                                                "type": "string",
                                                "description": "Degree types.",
                                                "enum": ["High School Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other", "!="]
                                            },
                                            "gpa": {
                                                "type": "number",
                                                "description": "GPA value with 2 decimal places at most. Look for a number that follows the format \"X.X\" or \"X.XX\", where \"X\" is a valid digit."
                                            },
                                        },
                                        "required": ["school_name", "degree", "inventory"],
                                        "additionalProperties": False
                                    }
                                },
                                "description": "For every individually mentioned educational institution, usually indicated by a header with the name of the school/college/university/institute, create a new item with the extracted information. Add no items if no education is found."
                            },
                            "extracurriculars": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "For every other mentioned activity/club not directly associated with a work experience, generate a short string which summarizes the activity and save it as an item within the array. These activities are usually explicitly mentioned under an \"extracurriculars\" header. Add no items if no extracurriculars are found."
                            },
                            "links": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Save every link/URL found within the resume as its own entry. Add no items if no links are found."
                            }
                        },
                        "required": ["name", "email", "phone_number", "skills", "work_experience", "education", "extracurriculars", "links"],
                        "additionalProperties": False
                    },
                    "strict": True
                }
            }
        )

        # Dictionary with contents matching the specified schema.
        # Note that the response content originally appears in string format.
        results = json.loads(response.choices[0].message.content)

        # print(f"[ DEBUG ] Generated Results: {results}")
        return results
    
    # Given a plaintext string from a resume and the job that an applicant is applying to, return comments about the resume.
    def evaluate_resume(self, user_prompt = "", job_target = ""):
        system_prompt = f"You are a recruiter for a {job_target} position, Given a plaintext string with escape sequences from the user that contains the contents of a resume, analyze the resume."

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt}, # Hidden to User, AI Instructions
                {"role": "user", "content": user_prompt} # Known to User, Resume Input
            ],
            response_format={
                "type": "string",
                "json_schema": {
                    "name": "json_schema",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "eval": {
                                "type": "string",
                                "description": "Make a lengthy analysis about the contents of the plaintext resume with regards to the presented points and writing style. Outline the effective sections of the resume and provide comments on any improvements required. Format this with escape sequences such that sections are placed within individual paragraphs and bullet points when appropriate."
                            }
                        }
                    },
                    "required": ["eval"],
                    "additionalProperties": False
                },
                "strict": True
            }
        )

        # Dictionary with contents matching the specified schema.
        # Note that the response content originally appears in string format.
        results = json.loads(response.choices[0].message.content)

        # print(f"[ DEBUG ] Generated Results: {results}")
        return results["eval"]