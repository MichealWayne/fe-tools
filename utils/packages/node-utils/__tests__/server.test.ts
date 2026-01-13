import fs from 'fs';
import http from 'http';
import path from 'path';
import { AddressInfo } from 'net';
import startServer from '../src/common/server';

describe('startServer', () => {
  const tempDir = path.join(__dirname, 'tmp-server');
  const indexPath = path.join(tempDir, 'index.html');
  let server: http.Server;
  let port: number;

  beforeAll(done => {
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(indexPath, '<html>ok</html>');

    startServer(tempDir, 0, (_url, createdServer) => {
      server = createdServer;
      const address = server.address() as AddressInfo;
      port = address.port;
      done();
    });
  });

  afterAll(done => {
    server.close(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
      done();
    });
  });

  const request = (pathName: string) =>
    new Promise<{ statusCode: number; body: string }>((resolve, reject) => {
      const req = http.get({ hostname: '127.0.0.1', port, path: pathName }, res => {
        let body = '';
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode || 0, body });
        });
      });
      req.on('error', reject);
    });

  it('should serve files within the root', async () => {
    const response = await request('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('ok');
  });

  it('should block path traversal', async () => {
    const response = await request('/../package.json');
    expect(response.statusCode).toBe(404);
  });
});
