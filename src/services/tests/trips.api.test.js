import { test, expect } from "@playwright/test";

test.describe("Trips API", () => {
  let tripId;
  let accessToken;
  let userId;

  test.beforeAll(async ({ request }) => {
    const uniqueEmail = `tester-${Date.now()}@example.com`;
    const password = "password123";
    const regRes = await request.post("auth/register", {
      data: { name: "Tester", email: uniqueEmail, password },
    });
    expect(regRes.ok()).toBeTruthy();

    const logRes = await request.post("auth/login", {
      data: { email: uniqueEmail, password },
    });
    const logData = await logRes.json();
    const cleanData = logData.data || logData;

    accessToken = cleanData.tokens.access;
    userId = cleanData.user.id;
  });

  test("GET user trips", async ({ request }) => {
    const res = await request.get(`users/${userId}/trips`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(res.status()).toBe(200);
  });

  test("RECOMMEND trip", async ({ request }) => {
    const res = await request.post("trips/recommend", {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        origin: { city: "Kyiv", lat: 50.45, lng: 30.52 },
        dates: { start: "2026-06-01", end: "2026-06-08" },
        budget: 2000,
        interests: ["culture"],
        transport: "car",
        timezone: "Europe/Kyiv",
        dryRun: false,
        currency: "UAH",
        language: "Ukrainian",
      },
    });

    expect(res.ok()).toBeTruthy();
    const body = await res.json();

    tripId = body.data?.trip?.id;
  });

  test("GET trip by id", async ({ request }) => {
    test.skip(!tripId, "Skipping: No tripId captured from recommendation");
    const res = await request.get(`trips/${tripId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(res.status()).toBe(200);
  });

  test("GET trip map", async ({ request }) => {
    test.skip(!tripId, "Skipping: No tripId");
    const res = await request.get(`trips/${tripId}/map`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(res.ok()).toBeTruthy();
  });

  test("UPDATE trip", async ({ request }) => {
    test.skip(!tripId, "Skipping: No tripId");
    const res = await request.patch(`trips/${tripId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { title: "Updated via Playwright" },
    });
    expect(res.ok()).toBeTruthy();
  });

  test("CLONE trip", async ({ request }) => {
    test.skip(!tripId, "Skipping: No tripId");
    const res = await request.post(`trips/${tripId}/clone`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(res.ok()).toBeTruthy();
  });

  test("DELETE trip", async ({ request }) => {
    test.skip(!tripId, "Skipping: No tripId");
    const res = await request.delete(`trips/${tripId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect([200, 204]).toContain(res.status());
  });
});
