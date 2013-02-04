--
-- Table structure for table `artist`
--

CREATE TABLE IF NOT EXISTS `artist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE IF NOT EXISTS `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artist_id` int(11) NOT NULL,
  `name` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `albumart` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE IF NOT EXISTS `track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` text COLLATE utf8_unicode_ci NOT NULL,
  `uripath` text COLLATE utf8_unicode_ci NOT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `name` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `bitrate` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `frequency` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trackno` int(11) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `genre_id` (`genre_id`),
  KEY `album_id` (`album_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`);

--
-- Constraints for table `track`
--
ALTER TABLE `track`
  ADD CONSTRAINT `track_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  ADD CONSTRAINT `track_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`);
