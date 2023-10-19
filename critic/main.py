import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Ensure you have your OPENAI_API_KEY saved in your environment variables
api_key = os.getenv('OPENAI_API_KEY')

if api_key is None:
    print("Please set your OPENAI_API_KEY in your environment variables.")
    exit()

openai.api_key = api_key

print(dir(openai))

def query_gpt(prompt, model='text-davinci-003', max_tokens=150):
    """
    Function to query the OpenAI GPT-4 API (or whichever is the latest)

    :param prompt: str, a prompt for the AI.
    :param engine: str, the engine's identifier (assuming 'text-davinci-003' is for GPT-4 or replace with GPT-4's engine ID).
    :param max_tokens: int, the maximum length of the sequence to be generated.
    :return: str, the AI's response
    """

    try:
        response = openai.completions.create(
          model,
          messages=[
            {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
            {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
          ]
)

        # Extract the text from the response object
        text = response.choices[0].message
        return text
    except Exception as e:
        print(f"Received an error from the OpenAI API: {e}")
        return None

# Test the function
prompt = "Translate the following English text to French: 'Hello, how are you?'"
response = query_gpt(prompt)
if response:
    print(response)