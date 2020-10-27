CREATE TABLE Persona (
    Nombre varchar(25) NOT NULL,
    Apellidos varchar(40) NOT NULL,
    DNI char(9),
    Telefono int NOT NULL,
    Email varchar(40) NOT NULL,
    Usuario varchar(25) NOT NULL,
    Contraseña varchar(50) NOT NULL,
    IBAN varchar(4) NOT NULL,
    NumeroCuentaBancaria varchar(24) NOT NULL,
    PRIMARY KEY (DNI)
);

CREATE TABLE Transportista (
    DNI char(9),
    NaturalezaCamion varchar(10) NOT NULL,
    Capacidad decimal(5,2) NOT NULL,
    PRIMARY KEY(DNI),
    CONSTRAINT Fk_transportista_persona FOREIGN KEY (DNI)
    REFERENCES Persona(DNI)
)
CREATE TABLE Cliente (
    DNI char(9),
    Empresa varchar(25) NOT NULL,
    PRIMARY KEY(DNI),
)
CREATE TABLE Encargo (
    Id char(15) PRIMARY KEY,
    NaturalezaEncargo varchar(10) NOT NULL,
    Peso decimal(10,2) NOT NULL,
    Alto decimal(5,2) NOT NULL,
    Ancho decimal(5,2) NOT NULL,
    Largo decimal(5,2) NOT NULL,
    Origen varchar(100) NOT NULL,
    Destino varchar(100) NOT NULL,
    AltitudOrigen float(10,6) NOT NULL,
    AltitudDestino float(10,6) NOT NULL,
    LongitudOrigen float(10,6) NOT NULL,
    LongitudDestino float(10,6) NOT NULL,
    FechaRecogida date,
    FechaEntrega date,
    Precio decimal(10,2) NOT NULL,
    Pagado boolean NOT NULL,
    DNICliente char(9) NOT NULL,
    DNITransportista char(9), /*Cuando se crea el encargo no necesariamente tiene un transportista asignado*/
    CONSTRAINT Fk_Encargo_Transportista FOREIGN KEY (DNITransportista)
    REFERENCES Transportista(DNI),
    CONSTRAINT Fk_Encargo_Cliente FOREIGN KEY (DNICliente)
    REFERENCES Cliente(DNI)   
)