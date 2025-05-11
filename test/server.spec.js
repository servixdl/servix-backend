import request from "supertest";
import app from "../server.js"
describe ("CRUD Operation  for diferents routes",()=>{
 let token = '';

    describe("POST /users/login",()=>{
        it("testing route post/login",async ()=>{
            const user = {
                "correo": "matias2@example.com",
                "contrasena": "micontrasena123"
                        }
            const response = await request(app).post("/users/login").send(user);
            const status =response.statusCode;
            token = response.body.token
            expect(status).toBe(200);
        })
    });

    describe("GET /services/:id",()=>{
        it("testing route get/:id",async ()=>{
            const id = 2
            const response = await request(app).get("/services/"+id).send();
            const status =response.statusCode;
            expect(status).toBe(200);
        })
    });

    describe("PUT /sales",()=>{
        it("update an user that exist",async()=>{
            const id = 1;
            const sale = {
                "usuario_id": "11111111-1",
                "servicio_id": 1,
                "fecha_venta":"2025-04-01",
                "total":"50000.00"
        }
    const response = await request(app).put("/sales/"+id).set("Authorization", `Bearer ${token}`).send(sale)
    const status = response.statusCode;
    expect(status).toBe(200)
        })
    });

    describe("GET /appointments",()=>{
        it("should access with valid token",async ()=>{
            const response =  await request(app).get("/appointments")
            .set("Authorization", `Bearer ${token}`).send();
            const status =response.statusCode;
            expect(status).toBe(200);
        })
    });

})