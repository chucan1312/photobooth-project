from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory
from filter import apply_filter_and_frame
import os, base64

app = Flask(__name__)
UPLOAD_FOLDER = 'static/temp-photos'
os.makedirs(UPLOAD_FOLDER, exist_ok=True) #create directories recursively
app.secret_key = "ptb"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/instruction')
def instruction():
    return render_template('instruction.html')

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
    slots = session.get("slots", [])
    return render_template('choose4cuts.html')

@app.route('/choose6cuts')
def choose6():
    slots = session.get("slots", [])
    return render_template('choose6cuts.html')

@app.route("/save_selection", methods=["POST"])
def save_selection():
    cut_type = request.form.get("cut-type")

    # Dynamically get all slots from the form
    slots = []
    for i in range(1, 7):  
        slot_val = request.form.get(f"slot{i}")
        if slot_val:
            slots.append(slot_val)

    # Save in session so next page can use it
    session["slots"] = slots

    # Redirect to correct deco page
    if cut_type == "6cuts":
        return redirect(url_for("deco6"))
    else:
        return redirect(url_for("deco4"))


@app.route('/deco4cuts')
def deco4():
    return render_template('deco4cuts.html', slots=session.get("slots", []))

@app.route('/deco6cuts')
def deco6():
    return render_template('deco6cuts.html', slots=session.get("slots", []))

@app.route('/save_deco', methods=["POST"])
def save_deco():
    cut_type = request.form.get("cut-type")
    frame = request.form.get("frame")
    filter = request.form.get("filter")
    
    if cut_type == '4cuts':
        slots = [request.form.get("slot1"), request.form.get("slot2"), request.form.get("slot3"), request.form.get("slot4")]
    else:
        slots = [request.form.get("slot1"), request.form.get("slot2"), request.form.get("slot3"),
                 request.form.get("slot4"), request.form.get("slot5"), request.form.get("slot6")]
        
    apply_filter_and_frame(cut_type, frame,filter, slots)
    return redirect(url_for("downloadmenu"))

@app.route('/downloadmenu')
def downloadmenu():
    return render_template('download.html')

@app.route('/download')
def download():
    return send_from_directory('static', 'photobooth.png', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)