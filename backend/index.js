// Import statements
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import connectToDatabase from './config/db.js';

dotenv.config();

// Create Express App
const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  'http://localhost:3000',
  /\.vercel\.app$/ // allows any *.vercel.app
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/chat', chatRoutes);
app.use('/user', userRoutes);

// Connect To Database & Start Server
connectToDatabase()
.then(()=>{
    console.log('Connected to the database✔️');
    app.listen(PORT, (error) => 
    {
        if (error) console.error(error);
        else
        console.log(`Server running on http://localhost:${PORT} 🚀`)
    }
);
})
.catch(error=>{
    console.error(error);
})
