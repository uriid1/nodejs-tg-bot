import https from 'node:https';
import util from 'node:util';

// Debug GET запрос с промисом
const getUpdates = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (e) => {
      reject(`problem with request: ${e.message}`);
    });

    req.end();
  });
}

// POST запрос с json
const sendJson = (params) => {
  let options = new URL(
    'https://api.telegram.org' + util.format('/bot%s/%s', params.token, params.method)
  )

  options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(params.post_data),
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (e) => {
      reject(`problem with request: ${e.message}`);
    });

    req.write(params.post_data);
    req.end();
  });
}

export default { getUpdates, sendJson };
