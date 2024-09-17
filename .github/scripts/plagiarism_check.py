import sys
import subprocess
import os
import glob
import shutil

def run_compare50(single_file, directory, output_dir, saved_dir_base):
    try:
        if not os.path.exists(saved_dir_base):
            os.makedirs(saved_dir_base)
            print("Created base directory for saved files.")

        all_js_files = glob.glob(os.path.join(directory, "**/index.js"))
        total_files = len(all_js_files)
        current_file_number = 0

        for file in all_js_files:
            current_file_number += 1
            if os.path.abspath(file) == os.path.abspath(single_file):
                print(f"Skipping comparison for the same file: {file}")
                continue

            print(f"Processing file {current_file_number} of {total_files}: {file}")
            if os.path.exists(output_dir):
                shutil.rmtree(output_dir)
                print(f"Cleaned existing output directory: {output_dir}")
            
            command = [
                "compare50",
                f'"{single_file}"',
                f'"{file}"',
                "--output", f'"{output_dir}"',
                "--max-file-size", str(1024 * 1024 * 100),
                "--passes", "structure text"
            ]

            command_str = ' '.join(command)
            print(f"Running command: {command_str}")
            subprocess.run(command_str, shell=True, check=True)
            print("Compare50 command executed successfully.")

            match_file = os.path.join(output_dir, "match_1.html")

            if os.path.exists(match_file):
                new_filename = os.path.basename(os.path.normpath(os.path.dirname(file))) + '.html'
                saved_file_path = os.path.join(saved_dir_base, new_filename)
                print(f"Match found. Moving {match_file} to {saved_file_path}")
                shutil.move(match_file, saved_file_path)
            else:
                print(f"No match found for file: {file}")

    except subprocess.CalledProcessError as e:
        print(f"Error in running Compare50: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 5:
        print("Incorrect number of arguments provided.")
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir> <saved_dir_base>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_dir = sys.argv[3]
    saved_dir_base = sys.argv[4]

    print(f"Starting plagiarism check with the following arguments:")
    print(f"Single file: {single_file}")
    print(f"Directory: {directory}")
    print(f"Output directory: {output_dir}")
    print(f"Saved directory base: {saved_dir_base}")

    # print(f"Listing all JavaScript files in directory '{directory}':")
    # for f in glob.glob(os.path.join(directory, "**/index.js")):
    #     print(f)

    run_compare50(single_file, directory, output_dir, saved_dir_base)
    print("Plagiarism check completed.")

if __name__ == "__main__":
    main()