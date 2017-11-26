-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-11-2017 a las 04:01:27
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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `titulo`, `autor`, `estado`, `descripcion`, `nombre_archivo`, `extension_archivo`, `boletin_asoc`, `fecha_propuesta`, `fecha_respuesta`, `cantidad_favoritos`) VALUES
(1, 'asdin1', 'asd', 1, 'asdin', 'asdin.pdf', '.pdf', 52, NULL, NULL, 0),
(2, 'asdin2', 'asd', 1, 'asdin2', 'asdin2.pdf', '.pdf', 52, NULL, NULL, 0),
(3, 'asdin3', 'asd', 1, 'asdin3', 'asdin3.pdf', '.pdf', 52, NULL, NULL, 0),
(4, 'asdin4', 'asd', 1, 'asdin4', 'asdin4.pdf', '.pdf', 53, NULL, NULL, 0),
(6, 'asdin6', 'asd', 1, 'asdin6', 'asdin6.pdf', '.pdf', 53, NULL, NULL, 0),
(7, 'asdin7', 'asd', 1, 'asdin7', 'asdin7.pdf', '.pdf', 54, NULL, NULL, 0),
(8, 'asdin8', 'asd', 1, 'asdin8', 'asdin8.pdf', '.pdf', 54, NULL, NULL, 0),
(9, 'asdin9', 'asd', 1, 'asdin9', 'asdin9.pdf', '.pdf', 54, NULL, NULL, 0),
(10, 'asdin10', 'asd', 1, 'asdin10', 'asdin10.pdf', '.pdf', 54, NULL, NULL, 0),
(11, 'asdin11', 'asd', 1, 'asdin11', 'asdin11.pdf', '.pdf', 0, NULL, NULL, 0),
(12, 'asdin12', 'asd', 1, 'asdin11', 'asdin12.pdf', '.pdf', 0, NULL, NULL, 0);

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
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `boletines`
--

INSERT INTO `boletines` (`id_boletin`, `nombre_boletin`, `descripcion_boletin`, `creador_boletin`, `fecha_creacion`, `es_actual`) VALUES
(52, 'boleti1', 'asdasdsadsa', 'asd', '2017-11-20 02:52:16', b'1'),
(53, 'boletin2', 'asddsaasd', 'asd', '2017-11-20 02:52:43', b'1'),
(54, 'boletin3', 'asdasdsad', 'asd', '2017-11-20 02:53:00', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id_favorito` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `id_usuario` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_favorito`),
  KEY `id_articulo` (`id_articulo`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `userName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` int(11) DEFAULT '1',
  PRIMARY KEY (`userName`),
  KEY `tipo` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`userName`, `email`, `password`, `fecha_registro`, `tipo`) VALUES
('asd', 'asd@gmail', '7815696ecbf1c96e6894b779456d330e', '2017-11-17 05:33:19', 4),
('asdin', 'asdin@gmail.com', 'd983c366d465b081845fabcd35731fd4', '2017-11-26 01:32:15', 1),
('Valoom', 'victornoriega7@gmail.com', 'c500080b8f612d20946914fcea81dc5a', '2017-10-30 02:06:13', 1),
('victor', 'victornoriega7@gmail.com', 'c500080b8f612d20946914fcea81dc5a', '2017-11-02 06:59:54', 1),
('Victor Noriega', 'victornoriega7@gmail.com', 'c500080b8f612d20946914fcea81dc5a', '2017-10-25 02:05:26', 4);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipo_usuario` (`tipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
