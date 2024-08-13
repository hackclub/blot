from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import convolve
import math
import tqdm

#Load image
image = Image.open('image.png').convert("L")
image_array = np.array(image)

plt.imshow(image_array)
plt.axis('off')
plt.show()

#Converting it to a bigger Numpy array
print(image_array.shape)
big_array = np.zeros((image_array.shape[0] * 16, image_array.shape[0] * 16, 1))
print(big_array.shape)
for x in tqdm.tqdm(range(image_array.shape[0])):
    for y in range(image_array.shape[1]):
        #Get intensity
        intensity = image_array[x][y].item()/16

        #Draw circle with appropriate radius
        for i in range(int(-intensity), int(intensity) + 1):
            for j in range(int(-intensity), int(intensity) + 1):
                if math.sqrt(i**2 + j**2) <= intensity:
                    big_array[16 * x + i][16 * y + j] = 1


plt.imshow(big_array, cmap="gray")
plt.axis('off')
plt.show()

#Blot code generation
with open("Blotcode.js", "w") as txt:
    txt.write("//Produced by Aditya Anand's Blotinator, not human-written\n")
    txt.write(f"setDocDimensions({big_array.shape[0]}, {big_array.shape[1]});\n")
    txt.write("const finalLines = [];\n")
    for x in tqdm.tqdm(range(big_array.shape[0])):
        for y in range(big_array.shape[1]):
           if big_array[x][y] == 1:
               txt.write(f"finalLines.push([[{x}, {y}]]);\n")
    txt.write("drawLines(finalLines);")