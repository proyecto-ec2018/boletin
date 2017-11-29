-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 28-11-2017 a las 06:24:49
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `boletin`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

DROP TABLE IF EXISTS `articulos`;
CREATE TABLE IF NOT EXISTS `articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `autor` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `estado` int(11) DEFAULT '1',
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `nombre_archivo` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `extension_archivo` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `boletin_asoc` int(11) DEFAULT '0',
  `fecha_propuesta` timestamp NULL DEFAULT NULL,
  `fecha_respuesta` timestamp NULL DEFAULT NULL,
  `cantidad_favoritos` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `boletin_asoc` (`boletin_asoc`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boletines`
--

DROP TABLE IF EXISTS `boletines`;
CREATE TABLE IF NOT EXISTS `boletines` (
  `id_boletin` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_boletin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion_boletin` text COLLATE utf8_unicode_ci NOT NULL,
  `creador_boletin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `es_actual` bit(1) NOT NULL,
  PRIMARY KEY (`id_boletin`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_articulo` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_articulo` (`id_articulo`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `tipo` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`tipo`, `description`) VALUES
(1, 'usrRegistrado'),
(2, 'autor_contenido'),
(3, 'editor'),
(4, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `tipo` (`tipo`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `userName`, `email`, `password`, `fecha_registro`, `tipo`) VALUES
(1, 'asd', 'asd@gmail.com', '7815696ecbf1c96e6894b779456d330e', '2017-11-28 04:37:09', 4),
(2, 'asd2', 'asd2@gmail.com', 'a67995ad3ec084cb38d32725fd73d9a3', '2017-11-28 04:56:04', 3),
(3, 'asd3', 'asd3@gmail.com', '6867d9167683fb8f42558a81ad107f5b', '2017-11-28 04:56:15', 3),
(4, 'asd4', 'asd4@gmail.com', '52fe8f312eec568cac3e32e0a2813743', '2017-11-28 04:56:27', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
