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
    public class PlatformPostRepository : BaseRepository, IPlatformPostRepository
    {
        public PlatformPostRepository(IConfiguration configuration) : base(configuration) { }

        public List<PlatformPost> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM PlatformPost";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var platformPosts = new List<PlatformPost>();
                        while (reader.Read())
                        {
                            platformPosts.Add(new PlatformPost()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                SocialPlatformId = DbUtils.GetInt(reader, "SocialPlatformId"),
                                PostId = DbUtils.GetInt(reader, "PostId")
                            });
                        }
                        return platformPosts;
                    }
                }
            }
        }

        public void AddPlatformToPost(PlatformPost platformPost)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PlatformPost
                                        (PostId, SocialPlatformId)
                                        VALUES (@PostId, @PlatformId)";
                    cmd.Parameters.AddWithValue("@PostId", platformPost.PostId);
                    cmd.Parameters.AddWithValue("@PlatformId", platformPost.SocialPlatformId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePlatformsForPost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PlatformPost
                                        WHERE PostId = @PostId";
                    cmd.Parameters.AddWithValue("@PostId", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
