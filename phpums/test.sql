/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50560
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50560
 File Encoding         : 65001

 Date: 16/08/2018 11:47:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL,
  `name` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` tinyint(255) NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '赵大', 0, '1994-01-01', 'uploads/1.jpg');
INSERT INTO `users` VALUES (2, '孙二', 1, '1995-02-02', 'uploads/1.jpg');
INSERT INTO `users` VALUES (3, '李三', 0, '1996-03-03', 'uploads/1.jpg');
INSERT INTO `users` VALUES (4, '周四', 1, '1997-04-04', 'uploads/1.jpg');
INSERT INTO `users` VALUES (5, '郑五', 0, '1998-05-05', 'uploads/1.jpg');
INSERT INTO `users` VALUES (6, '王六', 1, '1999-06-06', 'uploads/1.jpg');
INSERT INTO `users` VALUES (7, '张七', 0, '1993-07-07', 'uploads/1.jpg');
INSERT INTO `users` VALUES (8, '刘八', 1, '1992-08-08', 'uploads/1.jpg');
INSERT INTO `users` VALUES (9, '杨九', 0, '1991-09-09', 'uploads/1.jpg');
INSERT INTO `users` VALUES (10, '罗十', 1, '1990-10-10', 'uploads/1.jpg');

SET FOREIGN_KEY_CHECKS = 1;
