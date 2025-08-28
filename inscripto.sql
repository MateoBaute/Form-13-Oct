-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2025 a las 04:19:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inscriptos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripto`
--

CREATE TABLE `inscripto` (
  `id` int(11) NOT NULL,
  `nombre_completo` varchar(11) NOT NULL,
  `edad` varchar(11) NOT NULL,
  `nmro_teléfono` varchar(11) NOT NULL,
  `cédula` varchar(11) NOT NULL,
  `categoría` varchar(11) NOT NULL,
  `género` varchar(11) NOT NULL,
  `talla` varchar(11) NOT NULL,
  `distancia` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripto`
--

INSERT INTO `inscripto` (`id`, `nombre_completo`, `edad`, `nmro_teléfono`, `cédula`, `categoría`, `género`, `talla`, `distancia`) VALUES
(1, 'Mateo Baute', '17', '+598 98 563', '5.746.505-3', '', 'Masculino', 'M', '4k'),
(2, 'Cintya De L', '46', '+598 99 007', '3.546.525-5', '', 'Femenino', 'S', '4k');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inscripto`
--
ALTER TABLE `inscripto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inscripto`
--
ALTER TABLE `inscripto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
