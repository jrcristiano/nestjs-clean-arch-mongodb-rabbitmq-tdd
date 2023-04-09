import { Channel, Connection, Message, connect } from 'amqplib';
import { Injectable } from '@nestjs/common';
import env from 'env';

@Injectable()
export class RabbitmqService {
	private conn: Connection;
	private channel: Channel;

	async start() {
		this.conn = await connect(env.RABBITMQ_CONNECTION);
		this.channel = await this.conn.createChannel();
	}

	async publishInQueue(queue: string, message: string) {
		await this.start();

		return this.channel.sendToQueue(queue, Buffer.from(message));
	}

	async consume(queue: string, callback: (message: Message) => void) {
		await this.start();

		return this.channel.consume(queue, (message) => {
			callback(message);
			this.channel.ack(message);
		});
	}
}
