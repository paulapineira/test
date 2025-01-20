const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    
    // Test 1 pra verificar la ruta get/cafes
    it("debería devolver un código 200 y un arreglo de cafes", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test 2 para verificar que al eliminar un cafe con un id que no existe se devuelve un código 404
    it("debería devolver un código 404 si el id no existe al eliminar un cafe", async () => {
        const response = await request(server)
            .delete("/cafes/9999")
            .set("Authorization", "Bearer tu-token-valido-aqui"); 
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
    });

    // Test 3 para verificar que la ruta post/cafes agrega un nuevo cafe y devuelve un codigo 201
    it("debería agregar un nuevo café y devolver un código 201", async () => {
        const nuevoCafe = {
            id: 5,
            nombre: "Latte"
        };

        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);

        expect(response.status).toBe(201);
        expect(response.body).toHaveLength(5);
        expect(response.body[4]).toMatchObject(nuevoCafe);
    });

    // Test 4 para verificar que put/cafes devuelve un código 400 si el id no coincide con el del payload
    it("debería devolver un código 400 si el id del parámetro no coincide con el id del payload", async () => {
        const cafeAActualizar = {
            id: 2,
            nombre: "Espresso"
        };

        const response = await request(server)
            .put("/cafes/3") 
            .send(cafeAActualizar);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            "El id del parámetro no coincide con el id del café recibido"
        );
    });

});


