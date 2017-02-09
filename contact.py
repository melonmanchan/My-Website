# Simple mail server utilizing mailgun.net API
from flask import Flask
from flask import request
import sendgrid

client = sendgrid.SendGridClient("SENDGRID_APIKEY")
app = Flask(__name__)


@app.route("/sendmail", methods=['POST'])
def hello():
    email = request.form.get('email')
    msg = request.form.get('message')
    subject = request.form.get('subject')
    send_mail(email, msg, subject)
    return 'OK'


def send_mail(email, message, subject):
        message = sendgrid.Mail()
        message.add_to('melonmanchan@gmail.com')

        message.set_from(email)
        message.set_subject(subject)
        message.set_html(message)

        client.send(message)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
