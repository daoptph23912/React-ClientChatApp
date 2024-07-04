import { useEffect, useState } from "react";
import { apiGetListFriends } from "../../Services/apiConfig";
import "./ListFriends.scss";
import SearchFriend from "../search/searchFriend";
import { Image } from "antd";
import iconUser from "../../assets/Images/user_face.png";
function ListFriends({ onSelectFriend }) {
  const [listFriend, setListFriend] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const baseUrl = "http://localhost:8888";
  useEffect(() => {
    const fetchListFriends = async () => {
      try {
        const data = await apiGetListFriends();
        const sortedData = data.sort((a, b) => {
          if (a.FullName < b.FullName) return -1;
          if (a.FullName > b.FullName) return 1;
          return 0;
        });
        setListFriend(sortedData);
        setFilteredFriends(sortedData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchListFriends();
  }, []);
  const getAvatarUrl = (avatar) => {
    return avatar ? `${baseUrl}/api/images/${avatar}` : iconUser;
  };
  return (
    <>
      <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <SearchFriend
          listFriend={listFriend}
          setFilteredFriends={setFilteredFriends}
        />
        {filteredFriends.length > 0 ? (
          <div
            className="list-friends"
            style={{ maxHeight: "95vh", overflowY: "auto", width: "400px" }}
          >
            {filteredFriends.map((friend) => (
              <div
                className="class-friend"
                style={{
                  display: "flex",
                  backgroundColor: "#FBF6E2",
                  margin: "2px 0px 0px 0px",
                }}
                key={friend.FriendID}
                onClick={() => onSelectFriend(friend)}
              >
                <div style={{ position: "relative", display: "flex" }}>
                  <Image
                    src={getAvatarUrl(friend.Avatar)}
                    style={{
                      width: "45px",
                      height: "45px",
                      margin: "20px 10px 0px 10px",
                      borderRadius: "50%",
                    }}
                    preview={false}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = iconUser;
                    }}
                  />
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: friend.isOnline ? "green" : "red",
                      position: "absolute",
                      margin: "20px 0px 0px 40px ",
                    }}
                  />
                </div>
                <div className="content-type">
                  <p
                    style={{ fontSize: "22px", marginTop: "10px" }}
                    className="fullname"
                  >
                    {friend.FullName}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      marginTop: "-20px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth:"140px"
                    }}
                  >
                    {friend.Content || "none"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No user</p>
        )}
      </div>
    </>
  );
}
export default ListFriends;
