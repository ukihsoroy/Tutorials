import flask
from flask import Flask
import openai

openai.api_key  = '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'

app = Flask(__name__)


@app.route('/query', methods=['post'])
def index():
    token = flask.request.headers.get("token")
    print(token)
    if token != "":
        return {
            "code": 0,
            "msg": "token error."
        }
    body = flask.request.get_json()
    prompt = f"""
    By chinese identify a list of emotions that the writer of the \
    following review is expressing. Include no more than \
    five items in the list. Format your answer as a list of \
    lower-case words separated by commas.
    
    Review: ```{body['prod_review']}```
    """

    res = get_completion(prompt)
    print(res)
    response = {
        "code": 0,
        "msg": "success",
        "response": res
    }
    return response


def get_completion(prompt, model="gpt-3.5-turbo"): # Andrew mentioned that the prompt/ completion paradigm is preferable for this class
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=80)
