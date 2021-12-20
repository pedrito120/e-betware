import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private client: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hello World! ${apiKey} ${name}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.client.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
