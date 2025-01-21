const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/server");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

describe("Authentication Tests", () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.MONGO_DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("MongoDB connected successfully");
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
        }
    });
    

    // afterEach(async () => {
    //     await User.deleteMany({}); // Clean database after each test
    // });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Should register a new user", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                username: "testuser",
                password: "123456",
            });
        
        expect(res.status).toBe(201);
        const userInDb = await User.findOne({ name: "testuser" });
        expect(userInDb).toBeTruthy();
    });

    // test("Should validate password hashing and comparison", async () => {
    //     const res = await request(app).post("/register").send({
    //         username: "testuser",
    //         password: "123456",
    //     });

    //     const userInDb = await User.findOne({ name: "testuser" });
    //     expect(userInDb).toBeTruthy();

    //     // Validate password is hashed 
    //     expect(userInDb.password).not.toBe(password);

    //     // Validate bcrypt comparison
    //     const isMatch = await bcrypt.compare(password, userInDb.password);
    //     expect(isMatch).toBe(true);
    // });

    // test("Should login with valid credentials and return JWT", async () => {
    //     // Register user
    //     await request(app).post("/register").send({
    //         username: "testuser",
    //         password: "123456",
    //     });

    //     // Login
    //     const res = await request(app).post("/login").send({
    //         username: "testuser",
    //         password: "123456",
    //     });

    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toHaveProperty("token");
    //     const decoded = jwt.verify(res.body.token, process.env.PRIVATE_KEY);
    //     expect(decoded).toHaveProperty("name", "testuser");
    // });

    // test("Should access private route with valid JWT token", async () => {
    //     // Register user
    //     await request(app).post("/register").send({
    //         username: "testuser",
    //         password: "123456",
    //     });

    //     // Login to get token
    //     const loginRes = await request(app).post("/login").send({
    //         username: "testuser",
    //         password: "123456",
    //     });

    //     const token = loginRes.body.token;

    //     // Access private route
    //     const privateRes = await request(app)
    //         .get("/notes")
    //         .set("Authorization", `Bearer ${token}`);

    //     expect(privateRes.statusCode).toBe(200);
    //     expect(privateRes.body).toHaveProperty("message", "Access granted");
    // });

    // test("Should not access private route without or with invalid JWT token", async () => {
    //     // Without token
    //     const resNoToken = await request(app).get("/notes");
    //     expect(resNoToken.statusCode).toBe(401);
    //     expect(resNoToken.body).toHaveProperty("error", "Unauthorized");

    //     // With invalid token
    //     const resInvalidToken = await request(app)
    //         .get("/notes")
    //         .set("Authorization", "Bearer invalidtoken");

    //     expect(resInvalidToken.statusCode).toBe(401);
    //     expect(resInvalidToken.body).toHaveProperty("error", "Unauthorized");
    // });
});
