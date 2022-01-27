USE [master]
GO

IF db_id('C_on_both_sides') IS NULL
  CREATE DATABASE [C_on_both_sides]
GO

USE [C_on_both_sides]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [SocialPlatform];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [PlatformPost];
DROP TABLE IF EXISTS [Category];

CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [Email] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [UserName] nvarchar(255),
  [FirebaseId] nvarchar(255),
  [UserTypeId] int,
  [CreateDateTime] datetime
)
GO

CREATE TABLE [UserType] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Post] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255),
  [Description] nvarchar(500),
  [Url] nvarchar(255),
  [UserProfileId] int,
  [Complete] bit,
  [CompleteBy] datetime,
  [CategoryId] int,
  [isFavorite] bit,
  [CreateDateTime] datetime
)
GO

CREATE TABLE [SocialPlatform] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [PlatformPost] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [SocialPlatformId] int,
  [PostId] int
)
GO

CREATE TABLE [Category] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([id])
GO

ALTER TABLE [PlatformPost] ADD FOREIGN KEY ([SocialPlatformId]) REFERENCES [SocialPlatform] ([id])
GO

ALTER TABLE [PlatformPost] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([id]) ON Delete Cascade
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([id])
GO
