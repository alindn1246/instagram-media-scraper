// Small runner to POST a form to Instagram GraphQL endpoint.
// Usage: set required headers via environment variables and run with Node.

// Required env vars:
// COOKIE, USER_AGENT, X_IG_APP_ID, X_CSRFTOKEN, X_FB_LSD, X_ASBD_ID, REFERER

const fetch = global.fetch;
if (!fetch) {
  console.error('global.fetch not available. Use Node 18+ or install node-fetch.');
  process.exit(1);
}

const COOKIE = process.env.COOKIE;
const USER_AGENT = process.env.USER_AGENT;
const X_IG_APP_ID = process.env.X_IG_APP_ID;
const X_CSRFTOKEN = process.env.X_CSRFTOKEN;
const X_FB_LSD = process.env.X_FB_LSD;
const X_ASBD_ID = process.env.X_ASBD_ID;
const REFERER = process.env.REFERER || 'https://www.instagram.com/p/DQFnBl0iWkb/?hl=en';

if (!COOKIE || !USER_AGENT || !X_IG_APP_ID || !X_CSRFTOKEN || !X_FB_LSD || !X_ASBD_ID) {
  console.error('Missing one or more required environment variables. Please set COOKIE, USER_AGENT, X_IG_APP_ID, X_CSRFTOKEN, X_FB_LSD, X_ASBD_ID.');
  process.exit(1);
}

const url = 'https://www.instagram.com/api/graphql';

const form = new URLSearchParams({
  av: '17841476320496372',
  hl: 'en',
  __d: 'www',
  __user: '0',
  __a: '1',
  __req: '2',
  __hs: '20388.HYP:instagram_web_pkg.2.1...0',
  dpr: '2',
  __ccg: 'GOOD',
  __rev: '1028962608',
  __s: 'louchy:ukgeov:eytsir',
  __hsi: '7565810098841011998',
  __dyn: '7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o0B-q1ew6ywaq0yE462mcw5Mx62G5UswoEcE7O2l0Fwqo31w9O1lwxwQzXwae4UaEW2G0AEco5G0zK5o4q3y1Sw62wLyES1TwTU9UaQ0Lo6-3u2WE5B08-269wr86C1mgcEed6goK10xKi2qi7E5y4UrwHwrE5SbBK4o11o5O3a13AwhES5E',
  __csr: 'gT1X4slsIhbOEaqRssGineGaLaD9h4aAX8vbWCiHIN4paZ1oxayryVpanx6HVJ6hHLBAiUpVa8F8GmFrAQWhtpGGuAcyBDz6aCwRCzuuECQaxpx96ylGp1G5UC9mdUOl6ALCyHQEyV65d9Kp4U-2LVp8hCGFUG-aAG6kcwDyoKlaqqaG-le7VFU5200m7AM8qwb226aKi0ebS0OLacKqZ07zwfC1Kg660t-0c9wbh03MEy0skw3ToGeEZ0913U5iow2Exa443h06sm09-c0k69yWc0-o2DL9g4dw11kGxd8xowba0Ho2MyU067u05to6e2O4E0nGzU09gE',
  __hsdp: 'l0WmA2v50y3qI5ciQV4h2Baih2sHK2BHUp8t29i1q0w60YoOfx_HwV80HofEpwVhU8EEVd0eC0webwNAwduicwMDxa5E4u2m5UaUmx-5qyFbxGdwpU3MU1Ro2CwpVo7y089w4QyE2Rw2eE4W0ky0IpE2Wg3cw-S2m0yoeU',
  __hblp: '0vE3aw9e5E5-0hiUC3dwVwioux22e19DGE5q5F9ElwFzAEboS1gwyxTG1tUK36iqu9w8W2-icwMDx51q4ogwAwBxu2K5EvxmEjDxadwFwZAweLwuU2HwaSfwBDwJwWwpVp8984W0jS0OUKm0Xod8Gq3q1Cx208WwjE1gV8O0F9E426U5mt0cJ0UBS2aEkg72bwGDxu0I8ow-w',
  __sjsp: 'l0WmA2v50y3qIhf34iQV4h2B8mh2sHK2BHUp8u9B80qy',
  __comet_req: '7',
  fb_dtsg: 'NAfvWjJRhANcjV0P5JFg4NmZLo-eBhQZcvZunJBiqyIsE5JL-kNoYiA:17843683195144578:1754833790',
  jazoest: '26297',
  lsd: X_FB_LSD,
  __spin_r: '1028962608',
  __spin_b: 'trunk',
  __spin_t: String(Math.floor(Date.now() / 1000)),
  __crn: 'comet.igweb.PolarisPostRouteNext',
  fb_api_caller_class: 'RelayModern',
  fb_api_req_friendly_name: 'PolarisThreadsNavItemWithBadgeQuery',
  server_timestamps: 'true',
  variables: '{}',
  doc_id: '24429790469985328'
});

const headers = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9,ar;q=0.8',
  'content-type': 'application/x-www-form-urlencoded',
  origin: 'https://www.instagram.com',
  referer: REFERER,
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': USER_AGENT,
  'x-asbd-id': X_ASBD_ID,
  'x-csrftoken': X_CSRFTOKEN,
  'x-fb-lsd': X_FB_LSD,
  'x-ig-app-id': X_IG_APP_ID,
  Cookie: COOKIE
};

async function run() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: form.toString(),
      redirect: 'follow'
    });

    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response length:', text.length);
    // Print the full body — user asked to run the code and see the output.
    console.log(text);
  } catch (err) {
    console.error('Request failed:', err);
    process.exit(1);
  }
}

run();
