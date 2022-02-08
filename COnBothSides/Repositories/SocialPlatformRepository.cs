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
    public class SocialPlatformRepository : BaseRepository, ISocialPlatformRepository
    {
        public SocialPlatformRepository(IConfiguration configuration) : base(configuration) { }

        public List<SocialPlatform> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM SocialPlatform
                                        ORDER BY Name ASC;";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var socialPlatforms = new List<SocialPlatform>();
                        while (reader.Read())
                        {
                            socialPlatforms.Add(new SocialPlatform()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            });
                        }
                        return socialPlatforms;
                    }
                }
            }
        }

        public SocialPlatform GetSocialPlatformById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Name
                                          FROM SocialPlatform 
                                         WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SocialPlatform socialPlatform = null;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (socialPlatform == null)
                        {
                            socialPlatform = new SocialPlatform()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            };
                        }
                    }
                    reader.Close();
                    return socialPlatform;
                }
            }
        }

        public void Add(SocialPlatform socialPlatform)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO SocialPlatform (Name)
                                                     VALUES (@Name)";
                    cmd.Parameters.AddWithValue("@Name", socialPlatform.Name);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM SocialPlatform
                                        WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
