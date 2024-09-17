from bs4 import BeautifulSoup
import os
import sys

def extract_similarity_percentage(html_file, type):
    try:
        with open(html_file, 'r', encoding='utf-8') as file:
            soup = BeautifulSoup(file, 'html.parser')
            file_name_tag = soup.select_one(f"#{type}left > div > h4")
            if file_name_tag:
                percentage_text = file_name_tag.find("span", class_="text-secondary small").text.strip("()%")
                return int(percentage_text)
            else:
                return None
    except Exception as e:
        print(f"Error processing file {html_file}: {e}")
        return None

def process_html_files(directory, threshold=50, noise_threshold=20):
    print("Processing HTML files for plagiarism results...")
    high_plagiarism_detected = False
    high_plagiarism_files = []
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
            percentage = extract_similarity_percentage(file_path,"structure")
            percentage_text = extract_similarity_percentage(file_path,"text")
            if percentage is not None and percentage >= threshold:
                print(f"High plagiarism detected - {filename.replace('.html', '')}: {percentage}%, {percentage_text}%")
                high_plagiarism_files.append(f"{filename.replace('.html', '')}: \n- Structure: {percentage}% \n- Text: {percentage_text}%")
                high_plagiarism_detected = True
            elif percentage is not None and percentage < noise_threshold: # Avoid huge action artifacts
                print(f"Removing plagiarism report with {filename.replace('.html', '')}: {percentage}%,{percentage_text}% score as noise")
                os.remove(file_path)
    return high_plagiarism_detected, high_plagiarism_files

def write_to_markdown(file_path, lines):
    with open(file_path, 'w') as md_file:
        for line in lines:
            md_file.write(line + '\n')
    print(f"Markdown file written to {file_path}")

def main():
    if len(sys.argv) != 2:
        print("Incorrect number of arguments provided.")
        print("Usage: python extract_percentages.py <saved_dir_path>")
        sys.exit(1)

    saved_dir_path = sys.argv[1]
    high_plagiarism_detected, high_plagiarism_files = process_html_files(saved_dir_path)

    markdown_lines = ["# Plagiarism Report"]
    if high_plagiarism_detected:
        print("High plagiarism percentages detected.")
        markdown_lines.append("## Art overlap report:")
        markdown_lines.extend(high_plagiarism_files)
        write_to_markdown("plagiarism-report.md", markdown_lines)
        sys.exit(1)
    else:
        print("No high plagiarism percentages detected.")
    print("Plagiarism report generation completed.")
if __name__ == "__main__":
    main()