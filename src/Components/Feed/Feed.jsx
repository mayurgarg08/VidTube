import React, { useEffect, useState } from "react";
import "./Feed.css";
import { value_Converter } from "../../data";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    d: "1 day",
  },
});

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let url = "";
    if (searchQuery && searchQuery.trim() !== "") {
      // Search API
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(
        searchQuery
      )}&type=video&regionCode=IN&key=${API_KEY}`;
      const res = await fetch(url);
      const result = await res.json();
      // fetching video details for each videoId (to get statistics)
      const videoIds = result.items.map((item) => item.id.videoId).join(",");
      if (videoIds) {
        const detailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();
        setData(detailsData.items);
      } else {
        setData([]);
      }
    } else {
      // Most popular API
      url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=150&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const res = await fetch(url);
      const result = await res.json();
      setData(result.items);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [category, searchQuery]);

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          to={`video/${item.snippet.categoryId || category}/${item.id}`}
          className="card"
          key={item.id}
        >
          <img
            src={
              item.snippet.thumbnails.maxres
                ? item.snippet.thumbnails.maxres.url
                : item.snippet.thumbnails.high
                ? item.snippet.thumbnails.high.url
                : item.snippet.thumbnails.medium.url
            }
            alt={item.snippet.title}
          />
          <div className="card-content">
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {item.statistics
                ? value_Converter(item.statistics.viewCount)
                : "N/A"}{" "}
              views • {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
