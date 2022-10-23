declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production';
      MONGOOSE_DB: string;
      MONGOOSE_PASSWORD: string;
      PORT: number;
    }
  }
}
export {};
