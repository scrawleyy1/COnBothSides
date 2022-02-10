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

        public List<Post> GetAll(int id)
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
                        AND p.userProfileId = @id
                        ORDER BY CompleteBy asc";

                    DbUtils.AddParameter(cmd, "@id", id);

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
                                CompleteBy = DbUtils.GetDateTime(reader, "CompleteBy"),
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
                    c.Name as CategoryName, sp.[Name] AS SocialPlatformName, sp.Id AS SocialPlatformId,
                    up.Id as UserId, up.Email, up.FirstName, up.LastName,
                    up.UserName, up.CreateDateTime AS UserCreateDateTime, up.UserTypeId, ut.[Name]
                        FROM Post p
                        LEFT JOIN Category c
                        ON p.CategoryId = c.Id
                        LEFT JOIN PlatformPost pp
                        ON pp.PostId = p.Id
                        LEFT JOIN SocialPlatform sp
                        ON sp.Id = pp.SocialPlatformId
                        LEFT JOIN UserProfile up
                        ON p.UserProfileId = up.Id
                        LEFT JOIN UserType ut
                        ON up.UserTypeId = ut.Id
                        WHERE p.Id = @id
                        ORDER BY CompleteBy asc";

                    cmd.Parameters.AddWithValue(@"id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Post post = null;
                        while (reader.Read())
                        {
                            if (post == null)
                            {
                                post = NewPostFromReader(reader);
                            }
                            if (DbUtils.IsNotDbNull(reader, "SocialPlatformId"))
                            {
                                post.Platforms.Add(new SocialPlatform()
                                {
                                    Name = DbUtils.GetString(reader, "SocialPlatformName"),
                                    Id = DbUtils.GetInt(reader, "SocialPlatformId")

                                });
                            }
                        }
                        return post;
                    }
                }
            }
        }

        public void Add(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post
                            (Title, Description, Url, Complete, CompleteBy,
                            isFavorite, CreateDateTime, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Description, @Url, @Complete, @CompleteBy,
                            @isFavorite, GETDATE(), @CategoryId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Description", post.Description);
                    cmd.Parameters.AddWithValue("@Url", post.Url);
                    cmd.Parameters.AddWithValue("@Complete", post.Complete);
                    cmd.Parameters.AddWithValue("@CompleteBy", post.CompleteBy);
                    cmd.Parameters.AddWithValue("@isFavorite", post.isFavorite);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"UPDATE Post
                                        SET Title = @Title,
                                        Description = @Description,
                                        Url = @Url,
                                        CompleteBy = @CompleteBy
                                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Description", post.Description);
                    cmd.Parameters.AddWithValue("@Url", post.Url);
                    cmd.Parameters.AddWithValue("@CompleteBy", post.CompleteBy);
                    cmd.Parameters.AddWithValue("@Id", post.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM POST WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
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
                CompleteBy = DbUtils.GetDateTime(reader, "CompleteBy"),
                isFavorite = DbUtils.GetBool(reader, "isFavorite"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    Name = DbUtils.GetString(reader, "CategoryName"),
                },
                Platforms = new List<SocialPlatform>(),
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
