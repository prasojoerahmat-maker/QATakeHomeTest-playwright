const { test, expect } = require('@playwright/test');

const API_BASE_URL = 'https://petstore.swagger.io/v2';

// Generate a different pet ID for each test run.
function createPetId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function buildPet(id, name = 'Playwright Test Pet') {
  return {
    id,
    category: {
      id: 1,
      name: 'Dogs',
    },
    name,
    photoUrls: ['https://example.com/dog.jpg'],
    tags: [
      {
        id: 1,
        name: 'playwright',
      },
    ],
    status: 'available',
  };
}

test.describe('Pet Store API Tests', () => {
  test('API-POST-01: Add a new pet', async ({ request }) => {
    const petId = createPetId();
    const pet = buildPet(petId);

    const response = await request.post(`${API_BASE_URL}/pet`, {
      data: pet,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(pet.id);
    expect(responseBody.name).toBe(pet.name);
    expect(responseBody.status).toBe(pet.status);
    expect(responseBody.photoUrls).toEqual(pet.photoUrls);
    expect(responseBody.category).toEqual(pet.category);
    expect(responseBody.tags).toEqual(pet.tags);
  });

  test('API-GET-01: Find pets by available status', async ({ request }) => {
    // Create a pet first so there is a known test record.
    const pet = buildPet(createPetId(), 'Available Status Test Pet');

    const createResponse = await request.post(`${API_BASE_URL}/pet`, {
      data: pet,
    });

    expect(createResponse.status()).toBe(200);

    const response = await request.get(
      `${API_BASE_URL}/pet/findByStatus`,
      {
        params: {
          status: 'available',
        },
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);

    // Every returned pet should have the requested status.
    for (const returnedPet of responseBody) {
      expect(returnedPet.status).toBe('available');
    }

    // Verify that the pet created for this test is included.
    expect(
      responseBody.some((returnedPet) => returnedPet.id === pet.id)
    ).toBe(true);
  });

  test('API-DELETE-01: Delete a pet by ID', async ({ request }) => {
    // Create a pet before deleting it.
    const pet = buildPet(createPetId(), 'Pet To Delete');

    const createResponse = await request.post(`${API_BASE_URL}/pet`, {
      data: pet,
    });

    expect(createResponse.status()).toBe(200);

    const deleteResponse = await request.delete(
      `${API_BASE_URL}/pet/${pet.id}`
    );

    expect(deleteResponse.status()).toBe(200);

    const responseBody = await deleteResponse.json();

    expect(String(responseBody.message)).toBe(String(pet.id));
  });
});
