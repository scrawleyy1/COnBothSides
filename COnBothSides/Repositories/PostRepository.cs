using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using COnBothSides.Models;
using COnBothSides.Utils;

namespace COnBothSides.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Description, p.Url,
                    p.UserProfileId, p.Complete, p.CompleteBy,
                    p.CategoryId, p.isFavorite, p.CreateDateTime,
                    c.Name as CategoryName,
                    up.Id as UserId, up.Email, up.FirstName, up.LastName,
                    up.UserName, up.CreateDateTime AS UserCreateDateTime, up.UserTypeId, ut.[Name]
                        FROM Post p
                        LEFT JOIN Category c
                        ON p.CategoryId = c.Id
                        LEFT JOIN UserProfile up
                        ON p.UserProfileId = up.Id
                        LEFT JOIN UserType ut
                        ON up.UserTypeId = ut.Id
                        WHERE p.CreateDateTime < GETDATE()
                        AND p.Complete = 'false'
                        ORDER BY CreateDateTime desc";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var post = new List<Post>();
                        while (reader.Read())
                        {
                            post.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Url = DbUtils.GetString(reader, "Url"),
                                Complete = DbUtils.GetBool(reader, "Complete"),
                                CompleteBy = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                isFavorite = DbUtils.GetBool(reader, "isFavorite"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                },
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    UserName = DbUtils.GetString(reader, "UserName"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                    UserType = new UserType()
                                    {
                                        Name = DbUtils.GetString(reader, "Name"),
                                        Id = DbUtils.GetInt(reader, "UserTypeId")
                                    }
                                }
                            });
                        }
                        return post;
                    }
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @$"
                    SELECT p.Id, p.Title, p.Description, p.Url,
                    p.UserProfileId, p.Complete, p.CompleteBy,
                    p.CategoryId, p.isFavorite, p.CreateDateTime,
                    c.Name as CategoryName,
                    up.Id as UserId, up.Email, up.FirstName, up.LastName,
                    up.UserName, up.CreateDateTime AS UserCreateDateTime, up.UserTypeId, ut.[Name]
                        FROM Post p
                        LEFT JOIN Category c
                        ON p.CategoryId = c.Id
                        LEFT JOIN UserProfile up
                        ON p.UserProfileId = up.Id
                        LEFT JOIN UserType ut
                        ON up.UserTypeId = ut.Id
                        WHERE p.Id = {id}
                        ORDER BY CreateDateTime desc";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var post = new Post();
                        if (reader.Read())
                        {
                            post = NewPostFromReader(reader);
                        }
                        return post;
                    }
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            Post post = new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Description = DbUtils.GetString(reader, "Description"),
                Url = DbUtils.GetString(reader, "Url"),
                Complete = DbUtils.GetBool(reader, "Complete"),
                CompleteBy = DbUtils.GetDateTime(reader, "CreateDateTime"),
                isFavorite = DbUtils.GetBool(reader, "isFavorite"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    Name = DbUtils.GetString(reader, "CategoryName"),
                },
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    Email = DbUtils.GetString(reader, "Email"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    UserName = DbUtils.GetString(reader, "UserName"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Name = DbUtils.GetString(reader, "Name"),
                        Id = DbUtils.GetInt(reader, "UserTypeId")
                    }
                }
            };
            return post;

        }
    }
}
