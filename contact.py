# Simple mail server utilizing mailgun.net API
from flask import Flask
from flask import request
import requests
app = Flask(__name__)

@app.route("/sendmail", methods= ['POST'])
def hello():
    email    = request.form.get('email')
    msg      = request.form.get('message')
    subject  = request.form.get('subject')
    send_mail(email, msg, subject)
    return 'OK'


def send_mail(email, message, subject):
        return requests.post(
            "https://api.mailgun.net/v3/sandbox12e603e0bce5426bbe66f14c68530ae3.mailgun.org/messages",
            auth=("api", "xxxx"),
            data={"from": email,
                  "to": ["melonmanchan@gmail.com"],
                  "subject": subject,
                  "text": message})

if __name__ == "__main__":
    app.run(host='0.0.0.0')

