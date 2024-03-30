import "./App.css";
import * as Carousel from "./component/ui/carousel";
import { Header } from "./component/ui/header";

import { Settings } from "react-slick";
import { MovieCard, TrailerCard } from "./component/ui/card";
import { useList } from "./hooks/useList";
import { Autocomplete, TextField } from "@mui/material";
import { useSearching } from "./hooks/useSearching";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { result, setQuery } = useSearching({ defaultQuery: "the" });
  return (
    <>
      <Header />
      <div
        className="  min-h-80 h-[50dvh] lg:h-[70dvh]  flex justify-center shadow-inner max-w-[1780px] m-auto items-center"
        style={{
          backgroundImage: `url(
"https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/71293304-1e8e-4c03-aa3c-9ece66025d12/ID-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg"          )`,
          boxShadow:
            "inset 0 0 50px 50px #111111, inset 0 0 185px 100px #111111", // inset 42px 42px 185px black",
          //inset 32px 32px 85px #ffffff"
        }}
      >
        <div className=" px-2 lg:px-0 ">
          <h2 className=" p-4 text-3xl font-semibold ">
            <span className=" text-4xl">Welcome.</span>
            <br /> Millions of movies, TV shows and people to discover. Explore
            now.
          </h2>
          <Autocomplete
            id="free-solo-demo-search"
            freeSolo
            options={result?.map((option) => option) || [""]}
            renderInput={(params) => (
              <TextField
                {...params}
                className="bg-black"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie, tv show, person...."
              />
            )}
          />
        </div>
      </div>
      <div className=" my-8 max-w-6xl m-auto">
        <MovieCarousel
          title="Trending"
          opts={[
            { label: "Today", val: "day" },
            { label: "Week", val: "week" },
          ]}
          defaultOpt="day"
          getUrl={(opt) =>
            `https://api.themoviedb.org/3/trending/all/${opt}?api_key=${apiKey}`
          }
        />
      </div>
      <div
        className=" h-52 w-full"
        style={{
          backgroundImage: `url("../src/assets/popcorn.jpg")`,
          backgroundSize: "cover",
          boxShadow: "inset 0 0 8px 6px #111111, inset 0 0 200px 80px #111111",
        }}
      ></div>
      <img src="../src/assets/popcorn.jpg" alt="" width={"100%"} height={500} />

      <div className=" my-8 max-w-6xl relative backdrop-grayscale bg-blend-overlay m-auto">
        <div
          style={{
            backgroundImage: `url("../src/assets/popcorn.jpg")`,
            backgroundSize: "cover",
            boxShadow:
              "inset 0 0 8px 6px #111111, inset 0 0 200px 80px #111111",
          }}
          className="  absolute w-full h-full top-0 left-0"
        />
        <div className=" backdrop-grayscale lg:bg-[#111111]/40 py-8 ">
          <TrailerCarousel
            title="On The Air"
            defaultOpt="movie"
            opts={[
              {
                label: "Movie",
                val: "movie",
              },
              {
                label: "Tv",
                val: "tv",
              },
            ]}
            getUrl={(opt) => {
              if (opt == "movie") {
                return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
              } else {
                return `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`;
              }
            }}
          />
        </div>
      </div>
      <div className=" my-8 max-w-6xl m-auto">
        <MovieCarousel
          title="Best Movie"
          getUrl={() =>
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
          }
        />
      </div>
      <div className=" my-8 max-w-6xl m-auto">
        <MovieCarousel
          title="Best TV Series"
          getUrl={() =>
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
          }
        />
      </div>
    </>
  );
}

const innerVP = window.innerWidth;
const modeDevice: "mobile" | "tablet" | "desktop" =
  innerVP >= 1023 ? "desktop" : innerVP >= 768 ? "tablet" : "mobile";
console.log(innerVP, modeDevice);
const settingsCarousel = {
  movie: {
    slidesToShow:
      modeDevice == "mobile" ? 2.4 : modeDevice == "tablet" ? 4.4 : 5,
    slidesToScroll: modeDevice == "mobile" ? 2 : modeDevice == "tablet" ? 3 : 5,
    infinite: false,
    draggable: modeDevice != "desktop",
    // variableWidth: modeDevice != "desktop",
  } as Settings,
  trailer: {
    slidesToShow:
      modeDevice == "mobile" ? 1.3 : modeDevice == "tablet" ? 2.3 : 4,
    slidesToScroll: modeDevice == "mobile" ? 1 : modeDevice == "tablet" ? 2 : 5,
    infinite: false,
    draggable: modeDevice != "desktop",
  } as Settings,
};

const MovieCarousel = ({
  defaultOpt,
  getUrl,
  title,
  opts,
}: Parameters<typeof useList>[0] & {
  opts?: { val: string; label: string }[];
  title: string;
}) => {
  const { setSelectedOpts, data } = useList({
    defaultOpt,
    getUrl,
  });

  return (
    <Carousel.Container>
      <Carousel.HeaderWrapper>
        <Carousel.HeaderTitle title={title} />
        {opts && (
          <Carousel.SelectOpts
            onChange={(e) => setSelectedOpts(e.target.value)}
            opts={opts}
          />
        )}
      </Carousel.HeaderWrapper>
      <Carousel.MainCarousel settings={{ ...settingsCarousel.movie }}>
        {data
          ? data?.results.map((movie, i) => (
              <li key={i} className=" px-1 ">
                <MovieCard
                  id={movie.id}
                  releaseDate={movie.first_air_date || movie.release_date}
                  img={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
                  title={movie.name || movie.original_title}
                />
              </li>
            ))
          : Array.from({ length: 20 }).map((_, i) => <MovieCard key={i} />)}
      </Carousel.MainCarousel>
    </Carousel.Container>
  );
};

const TrailerCarousel = ({
  title,
  defaultOpt,
  getUrl,
  opts,
}: { title: string; opts?: { val: string; label: string }[] } & Parameters<
  typeof useList
>[0]) => {
  const { data, setSelectedOpts } = useList({
    defaultOpt,
    getUrl,
  });
  // console.log(data, getUrl, defaultOpt);

  return (
    <Carousel.Container>
      <Carousel.HeaderWrapper>
        <Carousel.HeaderTitle title={title} />
        {opts && (
          <Carousel.SelectOpts
            opts={opts}
            onChange={(e) => setSelectedOpts(e.target.value)}
          />
        )}
      </Carousel.HeaderWrapper>
      <Carousel.MainCarousel settings={settingsCarousel.trailer}>
        {data
          ? data?.results?.map((movie) => (
              <li key={movie.id} className=" px-1">
                <TrailerCard
                  title={movie.name || movie.original_title}
                  img={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
                />
              </li>
            ))
          : Array.from({ length: 20 }).map((_, i) => <TrailerCard key={i} />)}
      </Carousel.MainCarousel>
    </Carousel.Container>
  );
};

export default App;
