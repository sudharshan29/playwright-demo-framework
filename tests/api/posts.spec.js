const { test, expect } = require('@playwright/test');

test.describe('Posts API', () => {
  test('GET /posts/1 returns the expected shape', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(typeof body.title).toBe('string');
    expect(typeof body.body).toBe('string');
  });

  test('GET /posts?userId=1 filters by user', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 1 } });
    expect(res.ok()).toBeTruthy();
    const posts = await res.json();
    expect(posts).toHaveLength(10);
    for (const post of posts) expect(post.userId).toBe(1);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const payload = { title: 'demo', body: 'created by Playwright', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject({ ...payload, id: 101 });
  });

  test('GET unknown post returns 404', async ({ request }) => {
    const res = await request.get('/posts/99999');
    expect(res.status()).toBe(404);
  });
});
