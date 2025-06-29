import React, { useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import mic_icon from "../../assets/mic.png";
import upload_icon from "../../assets/upload.png";
import notification_icon from "../../assets/notification.png";
import more_icon from "../../assets/more.png";
import profile_icon from "../../assets/jack.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSidebar, setSearchQuery }) => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();

  // Voice search handler
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setSearchQuery(transcript);
      navigate("/");
    };

    recognition.onerror = () => setListening(false);

    recognition.start();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
    navigate("/");
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="nav-middle flex-div">
        <form className="search-box flex-div" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img src={search_icon} alt="" />
          </button>
        </form>
        <button
          type="button"
          className={`mic-btn${listening ? " listening" : ""}`}
          onClick={handleVoiceSearch}
          title="Voice Search"
        >
          <img src={mic_icon} alt="Voice Search" className="mic-icon" />
        </button>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img className="user-icon" src={profile_icon} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
