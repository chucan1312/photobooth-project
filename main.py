from flask import Flask, render_template, request, jsonify
import os, base64

app = Flask(__name__)
UPLOAD_FOLDER = 'static/temp-photos'
os.makedirs(UPLOAD_FOLDER, exist_ok=True) #create directories recursively

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

@app.route('/save-photo', methods=['POST'])
def save_photo():
    data = request.get_json()
    image_data = data['image'].split(',')[1]
    filename = data['filename']
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, 'wb') as f:
        f.write(base64.b64decode(image_data))

    return jsonify({'status': 'success'})

@app.route('/choose4cuts')
def choose4():
    return render_template('choose4cuts.html')

@app.route('/choose6cuts')
def choose6():
    return render_template('choose6cuts.html')

@app.route('/deco4cuts')
def deco4():
    return render_template('deco4cuts.html')


@app.route('/deco6cuts')
def deco6():
    return render_template('deco6cuts.html')

@app.route('/instruction')
def instruction():
    return render_template('instruction.html')

if __name__ == '__main__':
    app.run(debug=True)