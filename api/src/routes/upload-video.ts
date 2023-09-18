import { FastifyInstance } from 'fastify';
import { fastifyMultipart } from '@fastify/multipart';
import { prisma } from '../lib/prisma';
import { randomUUID } from 'crypto';

import path from 'path';
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
	app.register(fastifyMultipart, {
		limits: {
			fileSize: 1_048_576 * 25, // 25MB
		},
	});

	app.post('/videos', async (request, reply) => {
		const data = await request.file();

		if (!data) {
			return reply.status(400).send({
				error: 'Missing file input.',
			});
		}

		const extension = path.extname(data.filename);

		if (extension !== '.mp3') {
			return reply.status(400).send({
				error: 'Invalid input type, please upload a .mp3 file.',
			});
		}

		const fileBaseName = path.basename(data.filename, extension);

		const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;

		const uploadDestination = path.resolve(
			__dirname,
			'../../tmp',
			fileUploadName
		);

		try {
			await pump(data.file, fs.createWriteStream(uploadDestination));

			const video = await prisma.video.create({
				data: {
					name: data.filename,
					path: uploadDestination,
				},
			});
			return reply.status(201).send({ video });
		} catch (error) {
			return reply.status(500).send({
				error: 'Internal server error: ' + error,
			});
		}
	});
}
