# 📸 Photobooth Project

A web application that allows users to take photos, apply filters, add frames, and download their customized photobooth images.

## ✨ Features

- Capture photos with a virtual photobooth.
- Choose between different photobooth types (4-cuts or 6-cuts).
- Apply various filters (normal, brighten, black & white).
- Select from multiple frame options.
- Download the final decorated photobooth image.

## 🛠️ Tech Stack

- Python 3
- Flask (Web framework)
- Pillow (Image processing)
- HTML/CSS/JavaScript (Frontend)

## 🚀 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/chucan1312/photobooth-project.git
    cd photobooth-project
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask app:
    ```bash
    flask run
    ```

5. Open your browser and go to `http://127.0.0.1:5000`

## 📁 Project Structure

photobooth-project/
│
├── static/ # Static files: CSS, JS, images, frames
├── templates/ # HTML templates
├── filter.py # Image processing functions
├── main.py # Flask app entry point
├── requirements.txt # Python dependencies
└── README.md # This file

## 📬 Author

This is a personal project created by Chuc An Trinh
GitHub: [https://github.com/chucan1312/photobooth-project](https://github.com/chucan1312/photobooth-project)
