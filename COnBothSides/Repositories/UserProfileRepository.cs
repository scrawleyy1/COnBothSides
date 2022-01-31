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
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id AS UserProfileId, up.Email AS UserProfileEmail, up.FirstName, up.LastName,
                    up.UserName, up.CreateDateTime AS UserProfileCreateDateTime, up.UserTypeId, ut.[Name]
                    
                    FROM UserProfile up
                    LEFT JOIN UserType ut
                        ON up.UserTypeId = ut.Id";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var UserProfiles = new List<UserProfile>();
                        while (reader.Read())
                        {
                            UserProfiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Email = DbUtils.GetString(reader, "UserProfileEmail"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserType = new UserType()
                                {
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Id = DbUtils.GetInt(reader, "UserTypeId")
                                }
                            });
                        }
                        return UserProfiles;
                    }
                }
            }
        }

        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseId, up.FirstName, up.LastName, up.UserName, 
                               up.Email, up.CreateDateTime, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    UserProfile userProfiles = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfiles = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                    SELECT up.Id AS UserProfileId, up.UserName, up.FirstName, up.LastName,
		                up.Email AS UserProfileEmail, up.CreateDateTime AS UserProfileCreateDateTime,
		                up.UserTypeId, ut.[Name]

                           FROM UserProfile up
                           LEFT JOIN UserType ut
                           ON up.UserTypeId = ut.Id
                            WHERE up.Id = {id}";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var userProfiles = new UserProfile();
                        if (reader.Read())
                        {
                            userProfiles = NewUserProfileFromReader(reader);
                        }
                        return userProfiles;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseId, FirstName, LastName, UserName, 
                                                                 Email, CreateDateTime, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @FirstName, @LastName, @UserName, 
                                                @Email, @CreateDateTime, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private UserProfile NewUserProfileFromReader(SqlDataReader reader)
        {
            UserProfile userProfiles = new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "UserProfileId"),
                UserName = DbUtils.GetString(reader, "UserName"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "UserProfileEmail"),
                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                UserType = new UserType()
                {
                    Name = DbUtils.GetString(reader, "Name"),
                    Id = DbUtils.GetInt(reader, "UserTypeId")
                }
            };
            return userProfiles;
        }
    }
}
