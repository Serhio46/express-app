import { createApp } from './app.module';
import dotenv from 'dotenv';
dotenv.config();

import { config } from './common/config/env.config';

const PORT = process.env.PORT || 3000;
//const PORT = config.PORT || 3000; //requires  explicit extensions imports

createApp().listen(PORT, () => console.log(`http://localhost:${PORT}`));
