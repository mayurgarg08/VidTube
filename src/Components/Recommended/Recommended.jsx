import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY, value_Converter } from "../../data";
import moment from "moment";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchRecommendedVideos = async () => {
    const recommende_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=85&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(recommende_url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.items);
      });
  };

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>
                {value_Converter(item.statistics.viewCount)} •{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
