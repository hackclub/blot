import requests
from urllib.parse import urlparse

def get_pr_files(repo, pr_number):
    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/files"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

def check_art_folder_created(files):
    for file in files:
        if file['status'] == 'added' and file['filename'].startswith('art/'):
            folder = file['filename'].split('/')[1]
            return folder
    return None

def extract_repo_and_pr(url):
    parsed_url = urlparse(url)
    path_parts = parsed_url.path.strip('/').split('/')
    repo = f"{path_parts[0]}/{path_parts[1]}"
    pr_number = path_parts[3]
    return repo, pr_number

def main(pr_url):
    repo, pr_number = extract_repo_and_pr(pr_url)
    files = get_pr_files(repo, pr_number)
    folder = check_art_folder_created(files).replace(" ", "")

    code_url = f"https://raw.githubusercontent.com/hackclub/blot/main/art/{folder}/index.js"
    playable_url = f"https://blot.hackclub.com/editor?src={code_url}"
    screenshot = f"https://github.com/hackclub/blot/tree/main/art/{folder}/snapshots"
    
    if folder:
        print(folder)
    else:
        print("No folder created in 'art' directory.")

if __name__ == "__main__":
    pr_urls = [
"https://github.com/hackclub/blot/pull/612",
"https://github.com/hackclub/blot/pull/649",
"https://github.com/hackclub/blot/pull/647",
"https://github.com/hackclub/blot/pull/637",
"https://github.com/hackclub/blot/pull/650",
    ]

    for pr_url in pr_urls:
      main(pr_url)
