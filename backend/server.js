import express  from 'express';
import bodyParser from 'body-parser';
import cors from "cors"; 
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 10000;

app.use(bodyParser.json());


// Kết nối với MongoDB (thay đổi URL kết nối theo cấu hình của bạn)
//mongoose.connect('mongodb://127.0.0.1:27017/task4');
const uri = "mongodb+srv://tantienhmtt:UKYt2dZJJQ7ld9io@cluster0.s8pk0ll.mongodb.net/?retryWrites=true&w=majority";
// Định nghĩa mô hình người dùng
mongoose.connect(uri)
const userSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    email: String,
    password: String,
    phone: String,
});

const UserModel = mongoose.model('User', userSchema);

// Sử dụng CORS cho tất cả các routes
app.use(cors());

app.post('/register',async (req, res) => {
    const  {username, fullname, email, password, phone } = req.body ;  
    
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if ( existingUser) {
        res.status(400).send("already user"); 
        console.log(" có dữ liệu trong database");
        return; 
    }

    const hashpass = await bcryptjs.hash(password, 10); 

    const newuser = {
        username, 
        fullname, 
        email,
        password: hashpass,
        phone,
    }
    const result = UserModel.create(newuser); 
    if ( result) {
        res.status(200).json({ status: 'Message received successfully.' });
        console.log("đk thành công");
    }
    
});
    
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (isPasswordValid) {
            // Đăng nhập thành công
            const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: true });
            console.log("Đăng nhập thành công");
            res.status(200).json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone
            });
            return;
            
        }
    }

    // Sai tên người dùng hoặc mật khẩu
    console.log("Sai tên người dùng hoặc mật khẩu");
    res.status(403).send("Sai tên người dùng hoặc mật khẩu");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
