import express,{Express,Request,Response} from 'express';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';
const cors = require('cors');
const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());
app.use('/api', userRoutes);
app.use(errorHandler);

    
const PORT = process.env.PORT || 8080;
app.get('/',(req:Request,res:Response)=>{
    res.send("working")
    })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


