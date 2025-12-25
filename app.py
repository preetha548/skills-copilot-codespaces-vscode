import os
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from PIL import Image
import cv2
from keras.models import load_model
from flask import Flask, request, render_template
from werkzeug.utils import secure_filename

app = Flask(__name__)
model = load_model('BrainTumor10EpochsCategorical.h5')
print('Model loaded. Check http://127.0.0.1:5000/')

# Ensure the uploads folder exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to process and predict tumor
def getResult(img):
    image = cv2.imread(img)
    img = Image.fromarray(image)
    img = img.resize((64, 64))
    img = np.array(img)
    input_img = img.astype('float32') / 255.0
    input_img = np.expand_dims(input_img, axis=0)
    predictions = model.predict(input_img)
    tumor_probability = predictions[0][1] * 100
    
    # Determine the binary classification based on a threshold
    threshold = 30  # Adjust the threshold as needed
    if tumor_probability >= threshold:
        binary_result = "Yes"
    else:
        binary_result = "No"
    
    return tumor_probability, binary_result

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        # Ensure the uploads directory is used to store files
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, UPLOAD_FOLDER, secure_filename(f.filename))
        
        # Save the file to the 'uploads' directory
        f.save(file_path)
        
        # Process the image and get the result
        tumor_probability, binary_result = getResult(file_path)
        
        # Return the result as a string
        result = (
            f"The probability of tumor presence is: {tumor_probability:.2f}%  and  "
            f"Tumor presence: {binary_result}"
        )
        
        return result
    return None

if __name__ == '__main__':
    app.run(debug=True)
