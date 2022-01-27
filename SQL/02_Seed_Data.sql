USE [C_on_both_sides]
GO

set identity_insert [UserType] ON
insert into [UserType] ([Id], [Name]) values (1, 'Admin'), (2, 'Author');
set identity_insert [UserType] off

set identity_insert [UserProfile] ON
insert into UserProfile (Id, Email, FirstName, LastName, UserName, FirebaseId, UserTypeId, CreateDateTime) values (1, 'syd@gmail.com', 'Sydney', 'Crawley', 'Squid', 'QmBu9nsPzFYZq5xpGGoogM3iuUx1', 1, '2022-01-26');
insert into UserProfile (Id, Email, FirstName, LastName, UserName, FirebaseId, UserTypeId, CreateDateTime) values (2, 'frank@gmail.com', 'Frank', 'Ocean', 'FrankO', 'QToIFJHUKWVrS1f8p5OQpOuUhwq2', 1, '2022-01-26');
set identity_insert [UserProfile] off

set identity_insert [Category] ON
insert into [Category] ([Id], [Name])
values (1, 'Relatable Content'), (2, 'Comedy'), (3, 'Friends and Family'), (4, 'Health and Skin Care'), (5, 'Misc.'), (6, 'Brand Deals')
set identity_insert [Category] off

set identity_insert [Post] ON
insert into Post (Id, Title, Description, Url, UserProfileId, Complete, CompleteBy, CategoryId, isFavorite, CreateDateTime) values (1, 'Create 15s Video', 'Video for brand promotion', 'https://vm.tiktok.com/TTPdhAXABp/', 1, 0, '2022-02-12', 6, 0, '2022-01-26 ');
insert into Post (Id, Title, Description, Url, UserProfileId, Complete, CompleteBy, CategoryId, isFavorite, CreateDateTime) values (2, 'Take pictures', 'Take photos for a Valentines Day promotion', 'https://www.pintrest.com/amp/terirosen/valentines-photography-ideas/', 2, 0, '2022-02-14', 6, 0, '2022-01-26 ');
insert into Post (Id, Title, Description, Url, UserProfileId, Complete, CompleteBy, CategoryId, isFavorite, CreateDateTime) values (3, 'Create 30s Video', 'Skin care video for Duvolle SpinCareSystem', 'https://www.tiktok.com/TTPdhDJqeG/', 1, 0, '2022-02-28', 4, 0, '2022-01-26 ');
insert into Post (Id, Title, Description, Url, UserProfileId, Complete, CompleteBy, CategoryId, isFavorite, CreateDateTime) values (4, 'Post to LinkedIn', 'Post about first capstone', 'https://www.linkedin.com/in/sydcrawley/', 1, 0, '2022-01-31', 5, 0, '2022-01-26 ');
set identity_insert [Post] off

set identity_insert [SocialPlatform] ON
insert into [SocialPlatform] ([Id], [Name])
values (1, 'TikTok'), (2, 'Instagram'), (3, 'YouTube'), (4, 'LinkedIn');
set identity_insert [SocialPlatform] off

set identity_insert [PlatformPost] ON
insert into PlatformPost (Id, SocialPlatformId, PostId) values (1, 1, 1);
insert into PlatformPost (Id, SocialPlatformId, PostId) values (2, 2, 2);
insert into PlatformPost (Id, SocialPlatformId, PostId) values (3, 1, 3);
insert into PlatformPost (Id, SocialPlatformId, PostId) values (4, 4, 4);
set identity_insert [PlatformPost] off