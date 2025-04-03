use MYM_DB;
go

--Modulo INVENTARIO

--SP listar productos con filtro
CREATE OR ALTER PROCEDURE SP_FILTRO_PRODUCTOS
(
    @nombre VARCHAR(50),
    @marca VARCHAR(50),
    @categoria VARCHAR(50),
    @stock INT,
    @precioMin DECIMAL(18,2),
	@precioMax DECIMAL(18,2)
)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    SET @SQL = 'SELECT TOP 25 * FROM PRODUCTO_SERVICIO WHERE 1=1';

    -- Condiciones para cada parametro
    IF (@nombre IS NOT NULL AND @nombre <> '')
        SET @SQL = @SQL + ' AND (nombre LIKE ''%' + @nombre + '%'' OR DIFFERENCE(nombre, ''' + @nombre + ''') >= 3)';--tolerancia a mayus, minus y errores de escritura.

    IF (@marca IS NOT NULL AND @marca <> '')
        SET @SQL = @SQL + ' AND marca = @marca';

    IF (@categoria IS NOT NULL AND @categoria <> '')
        SET @SQL = @SQL + ' AND categoria = @categoria';

    IF (@stock IS NOT NULL AND @stock > 0)
        SET @SQL = @SQL + ' AND stock <= @stock';

    IF (@precioMin IS NOT NULL AND @precioMax IS NOT NULL)
        SET @SQL = @SQL + ' AND precio BETWEEN @precioMin AND @precioMax';

    -- Ejecutar la consulta dinamica con los parametros correctamente pasados
    EXEC sp_executesql 
        @SQL, 
        N'@nombre VARCHAR(50), @marca VARCHAR(50), @categoria VARCHAR(50), @stock INT, @precioMin DECIMAL(18,2), @precioMax DECIMAL(18,2)',
        @nombre = @nombre,
        @marca = @marca,
        @categoria = @categoria,
        @stock = @stock,
        @precioMin = @precioMin,
        @precioMax = @precioMax;
END;
GO

-- SP para generar el codigo de orden
CREATE OR ALTER PROCEDURE GenerarCodigoOrden
    @CodigoOrden VARCHAR(9) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @CodigoOrden = UPPER(REPLACE(CONVERT(VARCHAR(36), NEWID()), '-', ''))
    SET @CodigoOrden = LEFT(@CodigoOrden, 9)
END;
GO

-- SP para insertar la orden
CREATE OR ALTER PROCEDURE SP_INSERTAR_ORDEN
    @tiempoEstimado DATETIME,
	@idVehiculo INT,
    @idTrabajador INT,
    @idCliente INT,
	@descripcion NVARCHAR(2048)
AS
BEGIN
    DECLARE @codigoOrden VARCHAR(9)
    
    -- Genera el código único
    EXEC GenerarCodigoOrden @CodigoOrden = @codigoOrden OUTPUT

    -- Inserta la orden con el código generado
    INSERT INTO ORDEN (codigoOrden,tiempoEstimado,descripcion, idVehiculo, idTrabajador, idCliente)
    VALUES (@codigoOrden,@tiempoEstimado,@descripcion, @idVehiculo, @idTrabajador, @idCliente)
    
END;
GO

-- SP para optener lista de ordenes dentro de las columnas de flujo
CREATE OR ALTER PROCEDURE SP_GET_ORDENES
    @estadoOrden INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        O.idOrden,
        O.codigoOrden,
		O.estadoAtrasado,
        FORMAT(DATEDIFF(DAY, GETDATE(), O.tiempoEstimado), '00') + ' días, ' +
        FORMAT(DATEDIFF(HOUR, GETDATE(), O.tiempoEstimado) % 24, '00') + ' horas, ' +
        FORMAT(DATEDIFF(MINUTE, GETDATE(), O.tiempoEstimado) % 60, '00') + ' minutos' AS TiempoRestante,
        O.descripcion,
		O.estadoOrden,
		V.marcaVehiculo,
        V.modeloVehiculo,
        V.annoVehiculo,
        FORMAT(O.fechaIngreso, 'dd/MM/yyyy') AS fechaIngreso,
        T.nombreCompleto as nombreMecanico,
        C.nombre + ' ' + C.apellido AS nombreCliente
    FROM ORDEN O
    INNER JOIN CLIENTE_VEHICULO V ON V.idVehiculo = O.idVehiculo
    INNER JOIN CLIENTE C ON C.idCliente = O.idCliente
    INNER JOIN TRABAJADOR T ON T.idTrabajador = O.idTrabajador
    WHERE O.estadoOrden = @estadoOrden 
    ORDER BY O.tiempoEstimado ASC;
END;
GO

--SP para cagar datos por idOrden
CREATE OR ALTER PROCEDURE GET_ORDEN
@idOrden INT
AS BEGIN
	SELECT
		O.idOrden,
		O.codigoOrden,
		O.estadoOrden,
		FORMAT(O.fechaIngreso, 'dd/MM/yyyy') AS fechaIngreso,
		FORMAT(DATEDIFF(DAY, GETDATE(), O.tiempoEstimado), '00') + ' días, ' +
		FORMAT(DATEDIFF(HOUR, GETDATE(), O.tiempoEstimado) % 24, '00') + ' horas, ' +
		FORMAT(DATEDIFF(MINUTE, GETDATE(), O.tiempoEstimado) % 60, '00') + ' minutos' AS TiempoRestante,
		FORMAT(O.tiempoEstimado, 'dd/MM/yyyy') AS tiempoEstimado,
		O.tiempoEstimado as tiempoEstimadoOriginal,
		O.descripcion,
		O.estadoAtrasado,
		O.idVehiculo,
		O.idCliente,
		T.idTrabajador,
		T.nombreCompleto as nombreMecanico,
		C.nombre + ' ' + C.apellido AS nombreCliente,
		V.marcaVehiculo + ' ' + V.modeloVehiculo + ' ' + CAST(V.annoVehiculo AS VARCHAR(4)) AS vehiculo
	FROM ORDEN O
		INNER JOIN CLIENTE_VEHICULO V ON V.idVehiculo = O.idVehiculo
		INNER JOIN CLIENTE C ON C.idCliente = O.idCliente
		INNER JOIN TRABAJADOR T ON T.idTrabajador = O.idTrabajador
		WHERE O.idOrden = @idOrden
	END;
GO

--Para ordenes atrasadas, cambia el estado atrasado en 1
CREATE OR ALTER PROCEDURE ACTUALIZAR_ORDENES_ATRASADAS
AS
BEGIN
    SET NOCOUNT ON;

    -- Capturar ordenes que se van a marcar como atrasadas
    DECLARE @OrdenesAtrasadas TABLE (idOrden INT);

    -- Marcar ordenes como atrasadas si la fecha estimada ya vencio
    UPDATE ORDEN
    SET estadoAtrasado = 1
    OUTPUT inserted.idOrden INTO @OrdenesAtrasadas
    WHERE tiempoEstimado < GETDATE() 
    AND estadoAtrasado = 0 
    AND estadoOrden < 4;

    -- Insertar notificacion
    INSERT INTO NOTIFICACIONES (titulo, cuerpo, modulo, tipo)
    SELECT 
        'Orden Atrasada', 
        'La orden con código ' + O.codigoOrden + ' se encuentra atrasada.', 
        'flujo', 
        'error'
    FROM @OrdenesAtrasadas OA
    INNER JOIN ORDEN O ON OA.idOrden = O.idOrden
    WHERE NOT EXISTS (
        SELECT 1 
        FROM NOTIFICACIONES N 
        WHERE N.titulo = 'Orden Atrasada' 
        AND N.modulo = 'flujo' 
        AND N.cuerpo LIKE '%código ' + O.codigoOrden + '%'
    );

    -- Marcar órdenes como NO atrasadas (en condicional contraria)
    UPDATE ORDEN
    SET estadoAtrasado = 0
    WHERE tiempoEstimado > GETDATE() 
    AND estadoAtrasado = 1;

END;
GO

CREATE OR ALTER PROCEDURE SP_INSERT_VENTA
@idOrden INT,
@detalles NVARCHAR(1024)
AS BEGIN

	--Insertar la venta
	INSERT INTO VENTA(detalles,idOrden)
	VALUES(@detalles, @idOrden);

	--Update orden, estado orden = 5 (desaparecer del listado de ordenes al generar ventas)
	UPDATE ORDEN SET
	estadoOrden = 5
	WHERE idOrden = @idOrden;

END;
GO

CREATE OR ALTER PROCEDURE SP_GET_VENTAS
    @codigoOrden VARCHAR(50) = NULL,
    @nombreCliente VARCHAR(50) = NULL
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX) = N'';
    DECLARE @where NVARCHAR(MAX) = N'WHERE 1 = 1 ';
    DECLARE @paramDefinition NVARCHAR(MAX) = N'@codigoOrden VARCHAR(50), @nombreCliente VARCHAR(50)';
    DECLARE @top NVARCHAR(10);

    IF @codigoOrden IS NULL AND @nombreCliente IS NULL
        SET @top = N'TOP 15';
    ELSE
        SET @top = N'TOP 30';

    -- Filtros dinamicos
    IF @codigoOrden IS NOT NULL
        SET @where += N' AND O.codigoOrden LIKE ''%'' +  @codigoOrden + ''%'' ';

    IF @nombreCliente IS NOT NULL
        SET @where += N' AND (C.nombre + '' '' + C.apellido) LIKE ''%'' + @nombreCliente + ''%'' ';

    -- consulta final
    SET @sql = N'SELECT ' + @top + '
        V.idVenta,
        V.fechaVenta,
        V.montoTotal,
        V.idOrden,
        O.codigoOrden,
        C.nombre + '' '' + C.apellido AS nombreCliente
    FROM VENTA V
    INNER JOIN ORDEN O ON O.idOrden = V.idOrden
    INNER JOIN CLIENTE C ON C.idCliente = O.idCliente
    ' + @where + N'
    ORDER BY V.fechaVenta ASC;';

    -- Ejecutar SQL
    EXEC sp_executesql @sql, @paramDefinition, @codigoOrden = @codigoOrden, @nombreCliente = @nombreCliente;
END;
GO

CREATE OR ALTER PROCEDURE SP_GET_VENTA
@idVenta INT
AS BEGIN

	SELECT
	--Venta
		V.idVenta,
		V.fechaVenta,
		V.montoTotal,
		V.detalles as VentaDetalles,
	--Orden
		O.codigoOrden,
		O.descripcion as descripcionOrden,
		O.fechaIngreso,
	--vehiculo
		CV.idVehiculo,
		CV.marcaVehiculo + ' ' + CV.modeloVehiculo + ' ' + CAST(CV.annoVehiculo AS VARCHAR(4)) AS vehiculo,
	--Cliente
		C.nombre + ' ' + C.apellido AS nombreCliente
	FROM VENTA V
	INNER JOIN ORDEN O ON O.idOrden = V.idOrden
	INNER JOIN CLIENTE C ON C.idCliente = O.idCliente
	INNER JOIN CLIENTE_VEHICULO CV ON CV.idVehiculo = O.idVehiculo
	WHERE V.idVenta = @idVenta

END;
GO

CREATE OR ALTER PROCEDURE SP_INSERTAR_PRODUCTO_VENTA
@idVenta INT,
@idProducto INT,
@cantidad INT --cantidad de unidades reservadas
AS BEGIN
	BEGIN TRY
		--Declarar variables
		DECLARE @precio DECIMAL(10,2), @porcentajeDescuento DECIMAL(10,2), @monto DECIMAL(10,2), @stock INT;

		BEGIN TRANSACTION; -- Iniciar transaccion

		--consultar datos de producto
		SELECT @stock = stock, @precio = precio, @porcentajeDescuento = porcentajeDescuento
		FROM PRODUCTO_SERVICIO WITH (UPDLOCK, ROWLOCK, HOLDLOCK) --bloqueo para evitar sobreventa
		WHERE idProducto = @idProducto;

		--condicional para aplicar o no descuento
		IF @porcentajeDescuento IS NOT NULL AND @porcentajeDescuento > 0.00
			SET @monto = @precio - (@precio * @porcentajeDescuento); --aplicar descuento
		ELSE
			SET @monto = @precio;

		--Insertar producto a la venta
			INSERT INTO PRODUCTO_POR_VENTA(idVenta,idProducto,cantidad,monto)
			VALUES (@idVenta, @idProducto,@cantidad, @monto)
	
		--Rebajar stock a producto
		-- Verificar si hay suficiente stock
		IF @stock < @cantidad
		BEGIN
			ROLLBACK TRANSACTION;
				THROW 50409, 'Stock insuficiente', 1;
			RETURN;
		END

		--update de stock
		UPDATE PRODUCTO_SERVICIO
		SET stock = stock - @cantidad
		WHERE idProducto = @idProducto 
		AND tipo = 'PRODUCTO';

		EXEC SP_NOTIFICACION_STOCK;

		--Confirmar transaccion
		COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH
		--manejo de errores y rollback
		IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
		THROW 50500, 'Error inesperado en el servidor', 1;
	END CATCH
END;
GO

CREATE OR ALTER PROCEDURE SP_GET_PRODUCTOS_VENTA
@idVenta INT
AS BEGIN

	SELECT
		CAST(PPV.idProductoVenta AS INT) AS idProductoVenta,
		PPV.cantidad,
		PPV.monto,
		PPV.monto * PPV.cantidad AS montoFinalUnitario, --monto con descuento aplicado * unidades
	--PRODUCTO
		PPV.idProducto,
		P.nombre + ' ' + P.marca AS nombreProducto,
	--VENTA
		CAST(PPV.idVenta AS INT) AS idVenta,
		(SELECT SUM(PPV2.monto * PPV2.cantidad) 
             FROM PRODUCTO_POR_VENTA PPV2 
             WHERE PPV2.idVenta = @idVenta) AS montoTotalVenta
	FROM PRODUCTO_POR_VENTA PPV
	INNER JOIN VENTA V ON V.idVenta = PPV.idVenta
	INNER JOIN PRODUCTO_SERVICIO P ON P.idProducto = PPV.idProducto
	WHERE V.idVenta = @idVenta;

END;
GO

CREATE OR ALTER PROCEDURE SP_DELETE_PRODUCTO_VENTA
@idProductoVenta INT,
@idProducto INT,
@cantidad INT
AS BEGIN
    BEGIN TRY
        DECLARE @tipo VARCHAR(25), @stock INT, @filasAfectadas INT;

        BEGIN TRANSACTION;

        -- Consultar datos de producto
        SELECT @tipo = tipo, @stock = stock
        FROM PRODUCTO_SERVICIO WITH (UPDLOCK, ROWLOCK, HOLDLOCK)
        WHERE idProducto = @idProducto;

        -- Devolver el stock, si es tipo producto
        IF @tipo = 'PRODUCTO'
        BEGIN
            UPDATE PRODUCTO_SERVICIO
            SET stock = stock + @cantidad
            WHERE idProducto = @idProducto;
        END
        ELSE 
        BEGIN
            UPDATE PRODUCTO_SERVICIO
            SET stock = 1
            WHERE idProducto = @idProducto;
        END

        -- Eliminar producto de la venta y obtener filas afectadas
        DELETE FROM PRODUCTO_POR_VENTA
        WHERE idProductoVenta = @idProductoVenta;

        SET @filasAfectadas = @@ROWCOUNT;

        -- Confirmar transacción
        COMMIT TRANSACTION;

        -- Retornar filas afectadas en un formato adecuado para Express.js
        SELECT CAST(@filasAfectadas AS INT) AS filasAfectadas;
    END TRY
    BEGIN CATCH
        -- Manejo de errores y rollback
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Retornar -1 en caso de error
        SELECT CAST(-1 AS INT) AS filasAfectadas;
    END CATCH
END;
GO

--NOTIFICACIONES
CREATE OR ALTER PROCEDURE SP_INSERT_NOTIFICACIONES
@titulo VARCHAR(50),
@cuerpo NVARCHAR(256),
@modulo VARCHAR(50),
@tipo VARCHAR(10)
AS BEGIN

	INSERT INTO NOTIFICACIONES(titulo, cuerpo, modulo, tipo)
	VALUES(@titulo,@cuerpo,@modulo,@tipo)

END;
GO
--eliminar notificacion
CREATE OR ALTER PROCEDURE SP_DESCARTAR_NOTIFICACIONES
@idNotificacion BIGINT
AS BEGIN

	UPDATE NOTIFICACIONES
	SET estado = 0
	WHERE idNotificacion = @idNotificacion

END;
GO

CREATE OR ALTER PROCEDURE SP_NOTIFICACION_STOCK
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @nombreProducto VARCHAR(100),
        @marca VARCHAR(100),
        @tipo VARCHAR(50),
        @cuerpo NVARCHAR(256);

    -- Cursor para recorrer productos con stock bajo
    DECLARE stock_cursor CURSOR FAST_FORWARD FOR
        SELECT nombre, marca, tipo
        FROM PRODUCTO_SERVICIO
        WHERE stockMinimo IS NOT NULL
          AND stock <= stockMinimo;

    OPEN stock_cursor;
    FETCH NEXT FROM stock_cursor INTO @nombreProducto, @marca, @tipo;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Si el producto es de tipo 'SERVICIO', no generar notificación.
        IF UPPER(@tipo) <> 'SERVICIO'
        BEGIN
            -- Construir el cuerpo de la notificación
            IF UPPER(@marca) = 'NINGUNO'
                SET @cuerpo = 'El stock de ' + @nombreProducto + ' esta por acabar';
            ELSE
                SET @cuerpo = 'El stock de ' + @nombreProducto + ' ' + @marca + ' esta por acabar';

            -- Verificar si ya existe una notificación similar para evitar duplicados
            IF NOT EXISTS (
                SELECT 1 
                FROM NOTIFICACIONES 
                WHERE titulo = 'Stock' 
                  AND modulo = 'inventario' 
                  AND cuerpo LIKE '%' + @nombreProducto + '%'
            )
            BEGIN
                EXEC SP_INSERT_NOTIFICACIONES
                    'Stock',
                    @cuerpo,
                    'inventario',
                    'warning';
            END;
        END;

        FETCH NEXT FROM stock_cursor INTO @nombreProducto, @marca, @tipo;
    END;

    CLOSE stock_cursor;
    DEALLOCATE stock_cursor;
END;
GO

CREATE OR ALTER PROCEDURE SP_NOTIFICACION_PAGO_ATRASADO
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @codigoOrden VARCHAR(50),
        @cuerpo NVARCHAR(256),
        @idVenta BIGINT;

    -- Cursor para recorrer ventas que llevan más de 3 semanas y no estan pagadas
    DECLARE atraso_cursor CURSOR FAST_FORWARD FOR
        SELECT V.idVenta, O.codigoOrden
        FROM VENTA V
        INNER JOIN ORDEN O ON V.idOrden = O.idOrden
        WHERE V.fechaVenta < DATEADD(WEEK, -3, GETDATE())
          AND V.ventaConsumada = 0;

    OPEN atraso_cursor;
    FETCH NEXT FROM atraso_cursor INTO @idVenta, @codigoOrden;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Construir el cuerpo de la notificacion usando el código de la orden
        SET @cuerpo = 'La orden ' + @codigoOrden + ' lleva más de 3 semanas de atraso';

        -- Verificar si ya existe una notificacion similar para esta orden
        IF NOT EXISTS (
            SELECT 1
            FROM NOTIFICACIONES
            WHERE titulo = 'Pago atrasado'
              AND modulo = 'ventas'
              AND cuerpo LIKE '%' + @codigoOrden + '%'
        )
        BEGIN
            EXEC SP_INSERT_NOTIFICACIONES
                'Pago atrasado',
                @cuerpo,
                'ventas',
                'warning';
        END;

        FETCH NEXT FROM atraso_cursor INTO @idVenta, @codigoOrden;
    END;

    CLOSE atraso_cursor;
    DEALLOCATE atraso_cursor;
END;
GO

CREATE OR ALTER PROCEDURE SP_GET_VENTAS_ATRASADAS
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        V.idVenta,
        V.fechaVenta,
        V.montoTotal,
        V.detalles,
        V.idOrden,
        O.codigoOrden,
        DATEDIFF(DAY, V.fechaVenta, GETDATE()) AS diasAtraso
    FROM VENTA V
    INNER JOIN ORDEN O ON O.idOrden = V.idOrden
    LEFT JOIN PAGO_CLIENTE P ON P.idVenta = V.idVenta
    WHERE V.ventaConsumada = 0  -- Venta no pagada
      AND P.idPago IS NULL  -- No existe pago asociado
      AND DATEDIFF(DAY, V.fechaVenta, GETDATE()) > 21; -- Mas de 3 semanas de atraso

END;
GO

select * from PAGO_CLIENTE
go

CREATE OR ALTER PROCEDURE SP_GET_GANANCIAS_MESES
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @totalMesActual DECIMAL(10,2);
    DECLARE @totalMesAnterior DECIMAL(10,2);
    DECLARE @diferenciaPorcentaje DECIMAL(10,2);

    -- Total de pagos del mes actual
    SELECT @totalMesActual = COALESCE(SUM(total), 0)
    FROM PAGO_CLIENTE
    WHERE YEAR(fecha) = YEAR(GETDATE()) 
      AND MONTH(fecha) = MONTH(GETDATE());

    -- Total de pagos del mes anterior
    SELECT @totalMesAnterior = COALESCE(SUM(total), 0)
    FROM PAGO_CLIENTE
    WHERE YEAR(fecha) = YEAR(DATEADD(MONTH, -1, GETDATE())) 
      AND MONTH(fecha) = MONTH(DATEADD(MONTH, -1, GETDATE()));

    -- Calcular la diferencia porcentual correctamente
    IF @totalMesAnterior = 0
        SET @diferenciaPorcentaje = CASE 
            WHEN @totalMesActual = 0 THEN 0  -- Si ambos son 0, no hay cambio
            ELSE 100  -- Si el mes anterior fue 0 y el actual tiene valor, es un 100% de aumento
        END;
    ELSE
        SET @diferenciaPorcentaje = ((@totalMesActual - @totalMesAnterior) * 100.0) / @totalMesAnterior;

    -- Retornar los resultados
    SELECT 
        @totalMesActual AS totalMesActual, 
        @totalMesAnterior AS totalMesAnterior, 
        @diferenciaPorcentaje AS diferenciaPorcentaje;
END;
GO

CREATE OR ALTER PROCEDURE SP_GET_GASTOS_MESES
AS
BEGIN
    DECLARE @totalMesActual DECIMAL(10,2)
    DECLARE @totalMesAnterior DECIMAL(10,2)
    DECLARE @diferenciaPorcentual DECIMAL(10,2)

    -- Suma de los gastos operativos y devoluciones del mes actual
    SELECT @totalMesActual = 
        (SELECT ISNULL(SUM(monto), 0) FROM DEVOLUCION WHERE MONTH(fecha) = MONTH(GETDATE()) AND YEAR(fecha) = YEAR(GETDATE()))
        +
        (SELECT ISNULL(SUM(monto), 0) FROM GASTO_OPERATIVO WHERE MONTH(fecha) = MONTH(GETDATE()) AND YEAR(fecha) = YEAR(GETDATE()))

    -- Suma de los gastos operativos y devoluciones del mes anterior
    SELECT @totalMesAnterior = 
        (SELECT ISNULL(SUM(monto), 0) FROM DEVOLUCION WHERE MONTH(fecha) = MONTH(DATEADD(MONTH, -1, GETDATE())) AND YEAR(fecha) = YEAR(DATEADD(MONTH, -1, GETDATE())))
        +
        (SELECT ISNULL(SUM(monto), 0) FROM GASTO_OPERATIVO WHERE MONTH(fecha) = MONTH(DATEADD(MONTH, -1, GETDATE())) AND YEAR(fecha) = YEAR(DATEADD(MONTH, -1, GETDATE())))

    -- Calcular la diferencia porcentual
    IF @totalMesAnterior = 0 
        SET @diferenciaPorcentual = CASE WHEN @totalMesActual = 0 THEN 0 ELSE 100 END
    ELSE 
        SET @diferenciaPorcentual = ((@totalMesActual - @totalMesAnterior) / @totalMesAnterior) * 100

    -- resultado
    SELECT 
        @totalMesActual AS totalMesActual,
        @totalMesAnterior AS totalMesAnterior,
        @diferenciaPorcentual AS diferenciaPorcentual
END;
GO
