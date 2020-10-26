CREATE PROCEDURE InsertOrUpdateClient
@DNI char(9),
@Empresa varchar(25)
as
IF (NOT EXISTS (SELECT DNI FROM Cliente WHERE DNI = @DNI)) BEGIN INSERT INTO Cliente(DNI, Empresa) VALUES (@DNI,@Empresa) END
ELSE BEGIN UPDATE Cliente SET DNI = @DNI, Empresa = @Empresa WHERE DNI = @DNI END;

GO;

CREATE PROCEDURE InsertOrUpdatePersona
@Nombre varchar(25),
@Apellidos varchar(40),
@DNI char(9),
@Telefono int,
@Email varchar(40),
@Usuario varchar(25),
@Contraseña varchar(25),
@IBAN varchar(4),
@NumeroCuentaBancaria varchar(4)
as
IF (NOT EXISTS (SELECT DNI FROM Persona WHERE DNI = @DNI))
BEGIN
INSERT INTO Persona(Nombre, Apellidos, DNI, Telefono, Email, Usuario, Contraseña, IBAN, NumeroCuentaBancaria)
VALUES (@Nombre, @Apellidos, @DNI, @Telefono, @Email, @Usuario, @Contraseña, @IBAN, @NumeroCuentaBancaria)
END
ELSE
BEGIN
UPDATE Persona SET Nombre = @Nombre, Apellidos = @Apellidos, Telefono = @Telefono, Email = @Email, Usuario = @Usuario, Contraseña = @Contraseña, IBAN = @IBAN, NumeroCuentaBancaria = @NumeroCuentaBancaria
WHERE DNI = @DNI
END;

GO;

CREATE PROCEDURE InsertOrUpdateEncargo
@Nombre varchar(25),
@Apellidos varchar(40),
@DNI char(9),
@Telefono int,
@Email varchar(40),
@Usuario varchar(25),
@Contraseña varchar(25),
@IBAN varchar(4),
@NumeroCuentaBancaria varchar(4)
as
IF (NOT EXISTS (SELECT DNI FROM Persona WHERE DNI = @DNI))
BEGIN
INSERT INTO Persona(Nombre, Apellidos, DNI, Telefono, Email, Usuario, Contraseña, IBAN, NumeroCuentaBancaria)
VALUES (@Nombre, @Apellidos, @DNI, @Telefono, @Email, @Usuario, @Contraseña, @IBAN, @NumeroCuentaBancaria)
END
ELSE
BEGIN
UPDATE Persona SET Nombre = @Nombre, Apellidos = @Apellidos, Telefono = @Telefono, Email = @Email, Usuario = @Usuario, Contraseña = @Contraseña, IBAN = @IBAN, NumeroCuentaBancaria = @NumeroCuentaBancaria
WHERE DNI = @DNI
END;

GO;

CREATE PROCEDURE InsertOrUpdateTransportista

@DNI char(9),

@NaturalezaCamion varchar(10),

@Capacidad numeric(5,2)

as

IF (NOT EXISTS (SELECT DNI FROM Transportista WHERE DNI = @DNI))
BEGIN INSERT INTO Transportista (DNI, NaturalezaCamion, Capacidad)
VALUES (@DNI,@NaturalezaCamion, @Capacidad)
END
ELSE
BEGIN UPDATE Transportista SET NaturalezaCamion = @NaturalezaCamion, Capacidad = @Capacidad WHERE DNI = @DNI
END

GO;

Alter table Persona add unique (usuario)