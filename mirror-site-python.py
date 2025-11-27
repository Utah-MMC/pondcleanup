#!/usr/bin/env python3
"""
Mirror nationalpondservice.com using requests and BeautifulSoup
"""
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

BASE_URL = 'https://nationalpondservice.com'
OUTPUT_DIR = 'nationalpondservice.com'
visited_urls = set()
to_visit = [BASE_URL]

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0'
}

session = requests.Session()
session.headers.update(headers)

def save_file(url, content, content_type='text/html'):
    """Save a file to the appropriate location"""
    parsed = urlparse(url)
    path = parsed.path.strip('/')
    if not path or path.endswith('/'):
        path = path + 'index.html'
    
    filepath = os.path.join(OUTPUT_DIR, path.lstrip('/'))
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    with open(filepath, 'wb') as f:
        if isinstance(content, str):
            f.write(content.encode('utf-8'))
        else:
            f.write(content)
    
    print(f"Saved: {filepath}")

def should_visit(url):
    """Check if URL should be visited"""
    parsed = urlparse(url)
    if parsed.hostname not in ['nationalpondservice.com', 'www.nationalpondservice.com']:
        return False
    if url in visited_urls:
        return False
    if parsed.path.startswith(('/wp-admin', '/wp-includes', '/wp-content/uploads')):
        return True  # Allow these for assets
    if parsed.path.endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot', '.pdf')):
        return True  # Allow asset files
    return True

def extract_links(html, base_url):
    """Extract all links from HTML"""
    soup = BeautifulSoup(html, 'html.parser')
    links = set()
    
    # Find all links
    for tag in soup.find_all(['a', 'link', 'script', 'img', 'source']):
        url = None
        if tag.name == 'a' and tag.get('href'):
            url = tag.get('href')
        elif tag.name == 'link' and tag.get('href'):
            url = tag.get('href')
        elif tag.name == 'script' and tag.get('src'):
            url = tag.get('src')
        elif tag.name == 'img' and tag.get('src'):
            url = tag.get('src')
        elif tag.name == 'source' and tag.get('src'):
            url = tag.get('src')
        
        if url:
            absolute_url = urljoin(base_url, url)
            if should_visit(absolute_url):
                links.add(absolute_url)
    
    return links

max_pages = 100
page_count = 0

print(f"Starting to mirror {BASE_URL}...")
print(f"This may take several minutes...")

while to_visit and page_count < max_pages:
    url = to_visit.pop(0)
    
    if url in visited_urls:
        continue
    
    visited_urls.add(url)
    page_count += 1
    
    try:
        print(f"[{page_count}] Fetching: {url}")
        response = session.get(url, timeout=30)
        response.raise_for_status()
        
        content_type = response.headers.get('Content-Type', '')
        
        if 'text/html' in content_type:
            # It's HTML, extract links and save
            html = response.text
            save_file(url, html)
            
            # Extract links
            links = extract_links(html, url)
            for link in links:
                if link not in visited_urls and link not in to_visit:
                    to_visit.append(link)
        else:
            # It's a binary file (image, CSS, JS, etc.)
            save_file(url, response.content, content_type)
        
        time.sleep(1)  # Be polite, wait 1 second between requests
        
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        continue

print(f"\nMirroring complete!")
print(f"Visited {len(visited_urls)} URLs")


