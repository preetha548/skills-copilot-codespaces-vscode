import cv2
from keras.models import load_model
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import pickle

# Load the trained model
model = load_model('BrainTumor10EpochsCategorical.h5')

with open('x_train.pkl', 'rb') as f:
    x_train = pickle.load(f)
with open('y_train.pkl', 'rb') as f:
    y_train = pickle.load(f)



with open('x_test.pkl', 'rb') as f:
    x_test = pickle.load(f)
with open('y_test.pkl', 'rb') as f:
    y_test = pickle.load(f)

# Read and preprocess the image
image_path = 'C:\\Users\\omtri\\Downloads\\BrainTumor Classification DL-11\\pred\\pred2.jpg'
image = cv2.imread(image_path)
img = Image.fromarray(image)
img = img.resize((64, 64))
img = np.array(img)

# Preprocess the image - assuming normalization to [0, 1] during training
input_img = img.astype('float32') / 255.0
input_img = np.expand_dims(input_img, axis=0)

# Make predictions
predictions = model.predict(input_img)
tumor_probability = predictions[0][1] * 100  # Probability of tumor presence

# Determine the binary classification based on a threshold
threshold = 50  # Adjust the threshold as needed
if tumor_probability >= threshold:
    binary_result = "Yes"
else:
    binary_result = "No"








# Extract the training loss and epochs
history = model.fit(x_train, y_train,
                   batch_size=16,
                   verbose=1,
                   epochs=9,
                   validation_data=(x_test, y_test),
                   shuffle=False)

# Print the training loss and number of epochs
print("Training Loss:")
for epoch in range(9):
    print(f"Epoch {epoch+1}: {history.history['loss'][epoch]:.4f}")

print("\nNumber of Epochs: 9")













# Print the percentage of efficiency and binary classification
print(f"The probability of tumor presence is: {tumor_probability:.2f}%")
print(f"Tumor presence: {binary_result}")

