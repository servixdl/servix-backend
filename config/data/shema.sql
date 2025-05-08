
--psql -U postgres  
--postgres en este caso es el nomnbre del usuario para ingresar a la base de datos          

DROP DATABASE IF EXISTS servicesmarket;
CREATE DATABASE servicesmarket;

\c servicesmarket; --conectar con base de datos


CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla de comunas
CREATE TABLE comuna (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    region_id INTEGER REFERENCES region(id) ON DELETE CASCADE
);



CREATE TABLE usuario (
    rut VARCHAR(12) PRIMARY KEY,  
    nombre VARCHAR(100),
    fecha_nacimiento DATE,
    correo VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    vendedor BOOLEAN NOT NULL,
    oficio VARCHAR(100),
    direccion VARCHAR(255),
    imagen VARCHAR(255),
    telefono VARCHAR(255),
    experiencia VARCHAR(255),
    comuna_id INTEGER REFERENCES comuna(id)
);

-- Crear tipo_servicio
CREATE TABLE tipo_servicio (
    id_tipo_servicio SERIAL PRIMARY KEY,
    tipo_servicio VARCHAR(100) NOT NULL
);

-- Crear servicios
CREATE TABLE servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10,2),
    descripcion TEXT,
    imagen VARCHAR(255),
    tipo_servicio_id INT,
    usuario_id VARCHAR(12),
    FOREIGN KEY (tipo_servicio_id) REFERENCES tipo_servicio(id_tipo_servicio),
    FOREIGN KEY (usuario_id) REFERENCES usuario(rut)
);

-- Crear ventas
CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    usuario_id VARCHAR(12),
    servicio_id INT,
    fecha_venta DATE,
    total NUMERIC(10,2),
    FOREIGN KEY (usuario_id) REFERENCES usuario(rut),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id_servicio)
);

-- Crear ENUM para estado de citas
CREATE TYPE estado_cita_enum AS ENUM ('pendiente', 'confirmada', 'cancelada');

-- Crear citas
CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    venta_id INT,
    fecha_cita DATE,
    hora_inicio TIME,
    hora_termino TIME,
    usuario_id VARCHAR(12),
    estado estado_cita_enum DEFAULT 'pendiente',
    FOREIGN KEY (venta_id) REFERENCES ventas(id_venta),
    FOREIGN KEY (usuario_id) REFERENCES usuario(rut)
);  

-- Crear feedback
CREATE TABLE feedback (
    id_feedback SERIAL PRIMARY KEY,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    usuario_id VARCHAR(12),
    servicio_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(rut),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id_servicio)
);

--IMPORTANTE!!
--insertar las regiones y comunas del archivo regionComuna.sql

INSERT INTO usuario (
    rut, nombre, fecha_nacimiento, correo, contrasena, vendedor, oficio, direccion, imagen, telefono, experiencia, comuna_id
) VALUES
('11111111-1', 'Ana Pérez', '1990-05-20', 'ana@example.com', '$2b$10$E0wIOkUZzSkm1CkJZmbFq.vk/mUNzzWJ8D3KK8.EaPfzfpK3epz96', false, NULL, 'Calle 1, Ciudad', NULL, '987654321', NULL, 304),
('22222222-2', 'Carlos Ruiz', '1985-11-10', 'carlos@example.com', '$2b$10$Qd/X1FIKT1OUbiEEEPMLD.2RKwRuFLbblwDjapvLZPpsDNv1DksB.', true, 'Electricista', 'Calle 2, Ciudad', NULL, '987654322', '5 años', 306),
('33333333-3', 'Lucía Gómez', '1993-08-30', 'lucia@example.com', '$2b$10$rXj6OaQg0H3PYDu9oPbK3Ok/8v4yRWznbHxS9ubGUuK6GUhQuZpN2', false, NULL, 'Calle 3, Ciudad', NULL, '987654323', NULL, 310),
('44444444-4', 'Mario Silva', '1980-02-14', 'mario@example.com', '$2b$10$skkd4yB9XjMBc2Fc7tuhxOLCrEzhNHaJzk9CHkOMsm39x3eFyHeCK', true, 'Plomero', 'Calle 4, Ciudad', NULL, '987654324', '10 años', 318),
('55555555-5', 'Sofía León', '1995-09-17', 'sofia@example.com', '$2b$10$Ugl.dn6e6Zc0hG5ZXxqUtuvX1Ad86El9uXxRHUpy6wbk62V3sdZ92', false, NULL, 'Calle 5, Ciudad', NULL, '987654325', NULL, 316),
('19999999-1', 'Matías Lorenzetti', '1994-01-29', 'matias2@example.com', '$2b$10$2H/eEQL/MaPaLH0Cq/xXmegQ6s3Ozs02u27FIb8QsgCTKwyKHMeK6', false, 'Técnico', 'Calle Falsa 123', NULL, '987654326', '2 años', 312);

INSERT INTO tipo_servicio (tipo_servicio) VALUES
('Electricidad'),
('Plomería'),
('Jardinería'),
('Limpieza'),
('Reparaciones generales');

INSERT INTO servicios (nombre, precio, descripcion, imagen,tipo_servicio_id, usuario_id) VALUES
('Instalación de luces LED', 50000.00, 'Instalación profesional de luces LED','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4s_-KLXK_hpAbwSs2XXex2u8EFzeSMGWizg&s' ,1, '22222222-2'),
('Reparación de cañerías', 40000.00, 'Solución de filtraciones en baños y cocinas','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/PI4EBZWKDJEOPIZWI6BOOBV4AA.jpg' ,2, '44444444-4'),
('Corte de césped', 25000.00, 'Servicio rápido y eficiente de jardinería','https://leccionachile.b-cdn.net/wp-content/uploads/2020/08/curso-online-jardinero-profesional_l_primaria_1.jpg' ,3, '44444444-4'),
('Limpieza profunda de hogar', 30000.00, 'Limpieza detallada de casas y departamentos', 'https://pinturashipopotamo.es/wp-content/uploads/2020/01/como-elegir-un-buen-pintor.jpg',4, '22222222-2'),
('Reparación de electrodomésticos', 45000.00, 'Arreglo de lavadoras, microondas y más', 'https://cypes.grupoeurohispana.com/img/profesion/1796/recurso-principal-7372459.jpg',5, '22222222-2');



INSERT INTO ventas (usuario_id, servicio_id, fecha_venta, total) VALUES
('11111111-1', 1, '2025-04-01', 50000.00),
('33333333-3', 2, '2025-04-02', 40000.00),
('55555555-5', 3, '2025-04-03', 25000.00),
('11111111-1', 4, '2025-04-04', 30000.00),
('33333333-3', 5, '2025-04-05', 45000.00);


INSERT INTO citas (venta_id, fecha_cita, hora_inicio, hora_termino, estado, usuario_id) VALUES
(1, '2025-04-10', '10:00', '11:00', 'confirmada','33333333-3'),
(2, '2025-04-11', '15:00', '16:00', 'pendiente','11111111-1'),
(3, '2025-04-12', '09:00', '10:00', 'confirmada','33333333-3'),
(4, '2025-04-13', '13:00', '14:00', 'pendiente','11111111-1'),
(5, '2025-04-14', '16:00', '17:00', 'cancelada','33333333-3');


INSERT INTO feedback (puntuacion, comentario, usuario_id, servicio_id) VALUES
(5, 'Excelente trabajo y muy profesional', '11111111-1', 1),
(4, 'Rápido y eficiente', '33333333-3', 2),
(3, 'Podría mejorar en puntualidad', '55555555-5', 3),
(5, 'Muy detallistas con la limpieza', '11111111-1', 4),
(4, 'Reparó mi lavadora en una hora', '33333333-3', 5);



