import request from "supertest";

const domain = process.env.DOMAIN;
console.log(domain);

describe('Testing /api/likes/new endpoint', () => {
	it('should return a 200 status code if both userId and projectId exist', async () => {
		//check for whether userId and projectId actually exist should happen on frontend
		const response = await request(domain)
			.post('/api/likes/new')
			.send({userId: 6, projectId: 1})
			.then( (response) => {
				expect(response.statusCode).toBe(200);
			});

	});

	it('should return a 500 status code if userId is null', async () => {
		const response = await request(domain)
			.post('/api/likes/new')
			.send({userId: null, projectId: null})
			.then( (response) => {
				expect(response.statusCode).toBe(500);
			});
	});

	it('should return a 500 status code if projectId is null', async () => {
		const response = await request(domain)
			.post('/api/likes/new')
			.send({userId: 1, projectId: null})
			.then( (response) => {
				expect(response.statusCode).toBe(500);
			});
	});

	it('should return a 500 status code if both userId and projectId are null', async () => {
		const response = await request(domain)
			.post('/api/likes/new')
			.send({userId: null, projectId: null})
			.then( (response) => {
				expect(response.statusCode).toBe(500);
			});
	});
});

