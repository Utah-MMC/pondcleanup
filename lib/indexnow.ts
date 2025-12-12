/**
 * IndexNow utility for submitting URLs to search engines
 * 
 * IndexNow is a protocol that allows websites to instantly inform search engines
 * about URL changes on their website.
 * 
 * Key file must be accessible at: https://pondcleanup.com/3c431b6cecfc4290ac5ef9671f6e489a.txt
 */

const INDEXNOW_KEY = '3c431b6cecfc4290ac5ef9671f6e489a';
const INDEXNOW_API_URL = 'https://api.indexnow.org/IndexNow';
const BASE_URL = 'https://pondcleanup.com';

export interface IndexNowSubmission {
  host: string;
  key: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow
 * @param urls Array of full URLs to submit (e.g., ['https://pondcleanup.com/shop', 'https://pondcleanup.com/shop/product-1'])
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (urls.length === 0) {
    return false;
  }

  // Ensure all URLs are absolute and from our domain
  const normalizedUrls = urls.map(url => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If relative, make it absolute
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${BASE_URL}${cleanUrl}`;
  });

  const payload: IndexNowSubmission = {
    host: new URL(BASE_URL).hostname,
    key: INDEXNOW_KEY,
    urlList: normalizedUrls,
  };

  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // IndexNow returns 200 for success, 202 for accepted, 400+ for errors
    return response.ok || response.status === 202;
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return false;
  }
}

/**
 * Submit a single URL to IndexNow
 * @param url Full URL or relative path to submit
 * @returns Promise<boolean>
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  return submitToIndexNow([url]);
}

/**
 * Submit multiple URLs in batches (IndexNow supports up to 10,000 URLs per request)
 * @param urls Array of URLs to submit
 * @param batchSize Number of URLs per batch (default: 10000)
 * @returns Promise<number> - Number of successful batches
 */
export async function submitUrlsInBatches(
  urls: string[],
  batchSize: number = 10000
): Promise<number> {
  let successCount = 0;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const success = await submitToIndexNow(batch);
    if (success) {
      successCount++;
    }
    // Small delay between batches to avoid rate limiting
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return successCount;
}

