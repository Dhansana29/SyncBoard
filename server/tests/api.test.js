const request=require("supertest");
const mongoose=require("mongoose");
const {MongoMemoryServer}=require("mongodb-memory-server");
process.env.JWT_SECRET="test_secret";
const app=require("../src/app");
let mongo,token;

beforeAll(async()=>{mongo=await MongoMemoryServer.create();await mongoose.connect(mongo.getUri());});
afterAll(async()=>{await mongoose.disconnect();await mongo.stop();});

test("register user",async()=>{
  const r=await request(app).post("/api/auth/register").send({name:"Test",email:"test@example.com",password:"123456"});
  expect(r.statusCode).toBe(201); token=r.body.token;
});
test("create task",async()=>{
  const r=await request(app).post("/api/tasks").set("Authorization",`Bearer ${token}`).send({title:"Test task"});
  expect(r.statusCode).toBe(201);
});
test("get tasks",async()=>{
  const r=await request(app).get("/api/tasks").set("Authorization",`Bearer ${token}`);
  expect(r.statusCode).toBe(200); expect(r.body.length).toBeGreaterThan(0);
});
