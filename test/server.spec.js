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
    })
    console.log(token)

    describe("GET /services/:id",()=>{
        it("testing route get/:id",async ()=>{
            const id = 2
            const response = await request(app).get("/services/"+id).send();
            const status =response.statusCode;
            expect(status).toBe(200);
        })
    })

    describe("POST /user/register",()=>{
        it("creating an user that exist",async()=>{
    const user = {
            "rut":"19999999-1",
            "nombre":"matias",
            "fecha_nacimiento":"1994-01-29",
            "correo": "matias2@example.com",
            "contrasena": "micontrasena123",
            "tipo_usuario":"cliente",
            "profesion":"tecnico",
            "direccion":"calle falsa 123"
}
    const response = await request(app).post("/users/register").send(user)
    const status = response.statusCode;
    expect(status).toBe(500)
        })
    })

    
    describe("GET /services/:id",()=>{
        it("should access with valid token",async ()=>{
            const response = await await request(app).get("/appointments")
            .set("Authorization", `Bearer ${token}`).send();
            const status =response.statusCode;
            expect(status).toBe(200);
        })
    })


})