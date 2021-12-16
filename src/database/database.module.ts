import { Module, Global } from '@nestjs/common';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD123456';
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const tasks = await http
    //       .get('https://jsonplaceholder.typicode.com/todos')
    //       .toPromise();
    //     return tasks.data;
    //   },
    //   inject: [HttpService],
    // },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
