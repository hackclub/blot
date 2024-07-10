import os
import shutil
from PIL import Image

def compress_images(input_folder, output_folder, max_size=550):
    # Clear the output folder if it exists
    if os.path.exists(output_folder):
        shutil.rmtree(output_folder)
    os.makedirs(output_folder)
    
    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        file_path = os.path.join(input_folder, filename)
        
        # Check if the file is an image
        if os.path.isfile(file_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            with Image.open(file_path) as img:
                # Get original dimensions
                width, height = img.size
                
                # Determine new dimensions if needed
                if max(width, height) > max_size:
                    if width > height:
                        new_width = max_size
                        new_height = int((max_size / width) * height)
                    else:
                        new_height = max_size
                        new_width = int((max_size / height) * width)
                    
                    # Resize image
                    img = img.resize((new_width, new_height), Image.LANCZOS)
                    print(f"Resized {filename} to {new_width}x{new_height}")
                else:
                    print(f"{filename} is smaller than {max_size}x{max_size}, not resized")
                
                # Save the compressed image to the output folder
                output_path = os.path.join(output_folder, filename)
                img.save(output_path, optimize=True, quality=85)
                print(f"Processed and saved: {output_path}")

if __name__ == "__main__":
    input_folder = './raw-assets'  # Input folder with images
    output_folder = './assets'     # Output folder for processed images
    compress_images(input_folder, output_folder)