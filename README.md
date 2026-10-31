# VidTube: YouTube Clone

A YouTube-style video platform built with **React** and the **YouTube Data API v3**. Browse trending videos by category, search by text or by voice, and watch any video with its details, channel info, comments and recommendations.

**Live:** [myvidtube-live.netlify.app](https://myvidtube-live.netlify.app/)

## Features

- **Home feed** of the most popular videos, filtered by category from a collapsible sidebar (Home, Gaming, Autos, Sports, Entertainment, Technology, Music, Blogs, News)
- **Search** for any video through the navbar
- **Voice search** with the Web Speech API
- **Watch page** with an embedded player, title, views, publish time, likes, channel info and subscriber count, description and up to 35 top comments
- **Recommended videos** from the same category beside the player
- View, like and subscriber counts formatted as K or M, and relative timestamps ("3 days ago") using Moment.js
- Responsive layout

## Tech stack

React 19 · Vite · React Router · Moment.js · YouTube Data API v3 · CSS

## Pages

| Route | Page |
| --- | --- |
| `/` | Home feed with sidebar categories |
| `/video/:categoryId/:videoId` | Watch page with recommendations |

## Project structure

```
src/
  Components/
    Navbar/        logo, search, voice search, sidebar toggle
    Sidebar/       category links and subscriptions
    Feed/          video grid (popular or search results)
    PlayVideo/     player, stats, channel and comments
    Recommended/   related videos
  Pages/
    Home/
    Video/
  data.js          API key export and number formatter
```

## Getting started

### Prerequisites
- Node.js 18+
- A YouTube Data API v3 key from the [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

```bash
git clone https://github.com/mayurgarg08/VidTube.git
cd VidTube
npm install
```

Create a `.env` file:

```env
VITE_API_KEY=your_youtube_data_api_key
```

```bash
npm run dev       # http://localhost:5173
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | Run ESLint |

## Author

**Mayur Garg** · [GitHub](https://github.com/mayurgarg08) · [LinkedIn](https://www.linkedin.com/in/mayur-garg-428a291b4/)
