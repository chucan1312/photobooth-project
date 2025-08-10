from PIL import Image, ImageEnhance, ImageOps
import os, json

def apply_filter_and_frame(type, frame_path, filter, slots):
    abs_slots = []
    # Convert path for PIL 
    for slot in slots:
        if slot:
            filename = os.path.basename(slot)  # get 'photo_2.png'
            abs_path = os.path.join(os.getcwd(), 'static', 'temp-photos', filename)
            abs_slots.append(abs_path)

    frame_filename = os.path.basename(frame_path)  # e.g. white-frame-4.png
    frame_abs_path = os.path.join(os.getcwd(), 'static', 'frame', type, frame_filename)

    images = [Image.open(slot) for slot in abs_slots]

    if filter == 'brighten': 
        images = [ImageEnhance.Brightness(img).enhance(1.1) for img in images]
    elif filter == 'bnw':
        images = [ImageOps.grayscale(img) for img in images]

    if type == '4cuts':
        canvas = Image.new("RGB", (1652, 4920), (255, 255, 255))
        scale_factor = 1.676
        new_width = int(images[0].width * scale_factor)
        new_height = int(images[0].height * scale_factor)
        images = [img.resize((new_width, new_height), Image.LANCZOS) for img in images]
        canvas.paste(images[0], (181, 319))
        canvas.paste(images[1], (181 , 1449))
        canvas.paste(images[2], (181, 2581))
        canvas.paste(images[3], (181 , 3716))
    else:
        canvas = Image.new("RGB", (1200, 1800), (255, 255, 255))
        scale_factor = 0.8
        new_width = int(images[0].width * scale_factor)
        new_height = int(images[0].height * scale_factor)
        images = [img.resize((new_width, new_height), Image.LANCZOS) for img in images]
        canvas.paste(images[0], (50,158))
        canvas.paste(images[1], (612,158))
        canvas.paste(images[0], (50,700))
        canvas.paste(images[1], (612,700))
        canvas.paste(images[0], (50,1240))
        canvas.paste(images[1], (612,1240))

    
    frame = Image.open(frame_abs_path).convert("RGBA")
    canvas = canvas.convert("RGBA")
    canvas.alpha_composite(frame)

    output_path = os.path.join(os.getcwd(), 'static', 'photobooth.png')
    canvas.save(output_path, "PNG")