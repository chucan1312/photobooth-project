from flask import Flask, render_template, request
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/frameselection')
def frame():
    return render_template('frameselection.html')

@app.route('/photobooth')
def photobooth():
    max_photos = request.args.get('max')
    return render_template('photobooth.html', max = max_photos)

@app.route('/deco')
def deco():
    return render_template('deco.html')

if __name__ == '__main__':
    app.run(debug=True)