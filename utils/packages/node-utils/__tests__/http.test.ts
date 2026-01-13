import fs from 'fs';
import http from 'http';
import path from 'path';
import { AddressInfo } from 'net';
import {
  downloadFile,
  getJSON,
  parseHeaders,
  postJSON,
  createSimpleServer,
  createHTTPServer,
  createSimpleProxy,
  uploadFile,
  serveStatic,
} from '../src/http';

describe('http utilities', () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(done => {
    server = http.createServer((req, res) => {
      if (req.url === '/file') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('hello');
        return;
      }
      if (req.url === '/redirect') {
        res.writeHead(302, { Location: '/file' });
        res.end();
        return;
      }
      if (req.url === '/error') {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'fail' }));
        return;
      }
      if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
      }
      if (req.url === '/post' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ received: JSON.parse(body) }));
        });
        return;
      }
      if (req.url === '/upload' && req.method === 'POST') {
        let size = 0;
        req.on('data', chunk => {
          size += chunk.length;
        });
        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(String(size));
        });
        return;
      }
      res.writeHead(404);
      res.end();
    });

    server.listen(0, () => {
      const address = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${address.port}`;
      done();
    });
  });

  afterAll(done => {
    server.close(done);
  });

  it('should omit undefined headers', () => {
    const headers = parseHeaders({ 'x-test': '1', 'x-empty': undefined } as any);
    expect(headers).toEqual({ 'x-test': '1' });
  });

  it('should follow redirects when downloading', async () => {
    const destDir = path.join(__dirname, 'tmp-http');
    const dest = path.join(destDir, 'file.txt');

    await downloadFile(`${baseUrl}/redirect`, dest);
    const content = fs.readFileSync(dest, 'utf8');

    expect(content).toBe('hello');

    await fs.promises.rm(destDir, { recursive: true, force: true });
  });

  it('should reject non-2xx responses for JSON', async () => {
    await expect(getJSON(`${baseUrl}/error`)).rejects.toThrow('status 500');
  });

  it('should parse JSON responses', async () => {
    await expect(getJSON(`${baseUrl}/json`)).resolves.toEqual({ ok: true });
  });

  it('should post JSON and parse response', async () => {
    await expect(postJSON(`${baseUrl}/post`, { ok: true })).resolves.toEqual({
      received: { ok: true },
    });
  });

  it('should upload a file', async () => {
    const tempDir = path.join(__dirname, 'tmp-upload');
    const filePath = path.join(tempDir, 'file.txt');
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(filePath, 'hello');

    const response = await uploadFile(filePath, `${baseUrl}/upload`);
    expect(response).toBe('5');

    await fs.promises.rm(tempDir, { recursive: true, force: true });
  });
});

describe('http server helpers', () => {
  const request = (port: number, pathName: string) =>
    new Promise<string>((resolve, reject) => {
      const req = http.get({ hostname: '127.0.0.1', port, path: pathName }, res => {
        let body = '';
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => resolve(body));
      });
      req.on('error', reject);
    });

  it('createSimpleServer should respond to requests', async () => {
    const simpleServer = createSimpleServer(0, (_req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    });
    if (!simpleServer.listening) {
      await new Promise<void>(resolve => simpleServer.on('listening', resolve));
    }
    const address = simpleServer.address() as AddressInfo;
    const body = await request(address.port, '/');
    expect(body).toBe('ok');
    simpleServer.close();
  });

  it('createHTTPServer should respond to requests', async () => {
    const httpServer = createHTTPServer(0, (_req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('hello');
    });
    if (!httpServer.listening) {
      await new Promise<void>(resolve => httpServer.on('listening', resolve));
    }
    const address = httpServer.address() as AddressInfo;
    const body = await request(address.port, '/');
    expect(body).toBe('hello');
    httpServer.close();
  });

  it('createSimpleProxy should proxy responses', async () => {
    const targetServer = http.createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('proxied');
    });
    await new Promise<void>(resolve => targetServer.listen(0, resolve));
    const targetAddress = targetServer.address() as AddressInfo;

    const proxyServer = createSimpleProxy(`http://127.0.0.1:${targetAddress.port}`, 0);
    if (!proxyServer.listening) {
      await new Promise<void>(resolve => proxyServer.on('listening', resolve));
    }
    const proxyAddress = proxyServer.address() as AddressInfo;

    const body = await request(proxyAddress.port, '/');
    expect(body).toBe('proxied');

    proxyServer.close();
    targetServer.close();
  });

  it('serveStatic should serve files and block traversal', async () => {
    const tempDir = path.join(__dirname, 'tmp-static');
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(path.join(tempDir, 'index.html'), '<h1>ok</h1>');

    const staticServer = serveStatic(tempDir, 0);
    if (!staticServer.listening) {
      await new Promise<void>(resolve => staticServer.on('listening', resolve));
    }
    const address = staticServer.address() as AddressInfo;

    const body = await request(address.port, '/');
    expect(body).toContain('ok');

    await fs.promises.rm(tempDir, { recursive: true, force: true });
    staticServer.close();
  });
});
