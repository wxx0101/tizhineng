-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2019 年 09 月 15 日 12:30
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `tizhineng`
--

-- --------------------------------------------------------

--
-- 表的结构 `identity`
--

CREATE TABLE IF NOT EXISTS `identity` (
  `id` int(11) NOT NULL,
  `identityName` varchar(111) DEFAULT NULL COMMENT '权限名称',
  `isAble` tinyint(1) DEFAULT NULL COMMENT '是否存在该身份',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `identity`
--

INSERT INTO `identity` (`id`, `identityName`, `isAble`) VALUES
(1, '主管', 1),
(2, '老师', 1);

-- --------------------------------------------------------

--
-- 表的结构 `identity_autho`
--

CREATE TABLE IF NOT EXISTS `identity_autho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identity_id` int(11) DEFAULT NULL,
  `authority` varchar(100) DEFAULT NULL,
  `isAble` tinyint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `identity_autho`
--

INSERT INTO `identity_autho` (`id`, `identity_id`, `authority`, `isAble`) VALUES
(1, 1, 'management', 1),
(2, 1, 'checkWork', 1),
(3, 1, 'plan', 1),
(4, 1, 'customer', 1),
(5, 1, 'college', 1),
(6, 1, 'level', 1),
(7, 1, 'assistant', 1),
(8, 1, 'integral', 1),
(9, 2, 'plan', 1),
(10, 2, 'home', 1),
(11, 1, 'home', 1);

-- --------------------------------------------------------

--
-- 表的结构 `kindergarener`
--

CREATE TABLE IF NOT EXISTS `kindergarener` (
  `garenerName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `garenerId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `className` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `classId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `hourSubsidy` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `kindergarener`
--

INSERT INTO `kindergarener` (`garenerName`, `garenerId`, `className`, `classId`, `hourSubsidy`) VALUES
('星星幼儿园', '10001', '大一班', '301', '20'),
('霞光托儿所', '10002', '中二班', '202', '15'),
('王府幼儿园', '10003', '小三班', '103', '30');

-- --------------------------------------------------------

--
-- 表的结构 `staff_list`
--

CREATE TABLE IF NOT EXISTS `staff_list` (
  `staffName` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `staffId` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `department` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `position` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tel` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `isQuit` varchar(6) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `quitReason` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IDNum` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `entryTime` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `education` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nativePlace` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nation` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `isMarray` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nativeType` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `classId` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gartenId` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `classNum` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `headerId` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `staff_list`
--

INSERT INTO `staff_list` (`staffName`, `staffId`, `department`, `position`, `salary`, `tel`, `isQuit`, `quitReason`, `IDNum`, `entryTime`, `education`, `nativePlace`, `nation`, `isMarray`, `nativeType`, `address`, `classId`, `gartenId`, `classNum`, `headerId`, `id`) VALUES
('蔡黎明', '', '垃圾部', '废品', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '301', '1001', '24', '讲师', 'b95ld1b03b'),
('王霞', '', '财务部', '会计', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西晋城', '汉', '否', '务农', '北京', '301', '1002', '22', '讲师', 'bailzfjk1i'),
('蔡黎明', '', '垃圾部', '废品', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '301', '1001', '24', '讲师', 'b7ef424flk'),
('王霞', '', '财务部', '会计', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西晋城', '汉', '否', '务农', '北京', '301', '1002', '22', '讲师', 'b97f24200j'),
('赵立莹', '', '貌美部', '化妆', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '202', '1003', '23', '讲师', 'b9b7eekqfh'),
('蔡黎明', '', '垃圾部', '废品', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '301', '1001', '24', '讲师', 'b9ey9hxspc'),
('武津向', '', '胖子部', '猪头', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西太原', '汉', '否', '务农', '北京', '103', '1003', '25', '讲师', 'b9ip4lauey'),
('王霞', '', '财务部', '会计', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西晋城', '汉', '否', '务农', '北京', '301', '1002', '22', '讲师', 'b76vwo81ro'),
('赵立莹', '', '貌美部', '化妆', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '202', '1003', '23', '讲师', 'b7ao8yr33f'),
('武津向', '', '胖子部', '猪头', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西太原', '汉', '否', '务农', '北京', '103', '1003', '25', '讲师', 'b9nsqegx3o'),
('蔡黎明', '', '垃圾部', '废品', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '301', '1001', '24', '讲师', 'b9k1vb45hz'),
('赵立莹', '', '貌美部', '化妆', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '202', '1003', '23', '讲师', 'b9gb07rdwa'),
('王霞', '', '财务部', '会计', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西晋城', '汉', '否', '务农', '北京', '301', '1002', '22', '讲师', 'b9cinx8xp8'),
('武津向', '', '胖子部', '猪头', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西太原', '汉', '否', '务农', '北京', '103', '1003', '25', '讲师', 'b2p6lc2v5w'),
('蔡黎明', '', '垃圾部', '废品', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '301', '1001', '24', '讲师', 'b2lfq8qkr8'),
('赵立莹', '', '貌美部', '化妆', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '202', '1003', '23', '讲师', 'b2hov5eacm'),
('王霞', '', '财务部', '会计', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西晋城', '汉', '否', '务农', '北京', '301', '1002', '22', '讲师', 'b2dvqux4dn'),
('武津向', '', '胖子部', '猪头', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西太原', '汉', '否', '务农', '北京', '103', '1003', '25', '讲师', 'ble0saf1z6'),
('蔡黎明', '', '垃圾部', '废品', '10000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '301', '1001', '24', '讲师', 'bla9xcq8z8'),
('赵立莹', '', '貌美部', '化妆', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西临汾', '汉', '否', '务农', '北京', '202', '1003', '23', '讲师', 'bl6j2f1fza'),
('王霞', '', '财务部', '会计', '20000', '13412341234', '是', '回家', '140524200001014021', '2012.6', '本科', '山西晋城', '汉', '否', '务农', '北京', '301', '1002', '22', '讲师', 'bl2qqa96ud');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(100) DEFAULT NULL COMMENT '用户名',
  `userPwd` varchar(100) DEFAULT NULL COMMENT '用户密码',
  `isAble` int(11) DEFAULT NULL COMMENT '用户是否存在',
  `identity` int(11) DEFAULT NULL COMMENT '用户权限',
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`userid`, `userName`, `userPwd`, `isAble`, `identity`) VALUES
(1, 'admin', 'admin', 1, 1),
(2, 'yihang', 'yihang123', 1, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
