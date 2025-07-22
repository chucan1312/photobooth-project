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
    return render_template('photobooth.html')

if __name__ == '__main__':
    app.run(debug=True)