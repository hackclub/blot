import cv2
import numpy as np

import os

img_file = "picasso'sWorld/bardock.jpg" #change the img src
start_line = 8
jsname="index.js"

im = cv2.imread(img_file)
im = cv2.rotate(im, cv2.ROTATE_180)
im = cv2.flip(im, 1)
def print_clickable_file_url_relative(file_path):
    # Get the absolute path of the file
    abs_file_path = os.path.abspath(file_path)
    
    # Convert the absolute path to a file URL
    file_url = f"file://{abs_file_path}"
    
    # Print the clickable URL
    print(file_url)

np.set_printoptions(threshold=np.inf)
# Load image


height, width = im.shape[:2]

# Define the blue colour we want to find - remember OpenCV uses BGR ordering
black = [0,0,0]

# Get X and Y coordinates of all blue pixels
Y, X = np.where(np.all(im==black,axis=2))

# print(X,Y)
def change_specific_line(file_path, line_number, new_content):
    # Read the content of the file
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Modify the desired line
    if 0 < line_number <= len(lines):
        lines[line_number - 1] = new_content + '\n'  # Ensure the content has a newline character
    else:
        print("Invalid line number")
        return

    # Write the modified content back to the file
    with open(file_path, 'w') as file:
        file.writelines(lines)


zipped = np.array2string(np.column_stack((X,Y)), separator=', ').replace("\n", "")
# print(zipped)
data = f"let data = {zipped}"

change_specific_line(jsname, start_line + 7, data)
change_specific_line(jsname, start_line + 1, f"const height = {height}")
change_specific_line(jsname, start_line, f"const width = {width}")



print("You're ready to go")

# Example usage
print_clickable_file_url_relative(jsname)