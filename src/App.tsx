import "./App.css";
import * as Carousel from "./component/ui/carousel";
import { Header } from "./component/ui/header";

import { Settings } from "react-slick";
import { MovieCard, TrailerCard } from "./component/ui/card";
import { useList } from "./hooks/useList";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey, "dataw");
  return (
    <>
      <Header />
      <div>
        <p className=" p-4 text-3xl font-semibold">
          <span className=" text-4xl">Welcome.</span>
          <br /> Millions of movies, TV shows and people to discover. Explore
          now.
        </p>
        <input type="text" className=" bg-white ring m-auto block" />
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

      <div className=" my-8 py-8 max-w-6xl bg-rose-200 m-auto">
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
const settingsCarousel = {
  movie: {
    slidesToShow:
      modeDevice == "mobile" ? 1.8 : modeDevice == "tablet" ? 2.3 : 5,
    slidesToScroll: modeDevice == "mobile" ? 1 : modeDevice == "tablet" ? 3 : 5,
    infinite: false,
    draggable: modeDevice != "desktop",
    variableWidth: modeDevice != "desktop",
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
  // console.log(props, data);

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
              <div key={i} className=" px-1 lg:mx-0">
                <MovieCard
                  id={movie.id}
                  releaseDate={movie.first_air_date || movie.release_date}
                  img={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
                  title={movie.name || movie.original_title}
                />
              </div>
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
  console.log(data, getUrl, defaultOpt);

  //settings={settingsCarousel.trailer}>
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
              <TrailerCard
                key={movie.id}
                title={movie.name || movie.original_title}
                img={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
              />
            ))
          : Array.from({ length: 20 }).map((_, i) => <TrailerCard key={i} />)}
      </Carousel.MainCarousel>
    </Carousel.Container>
  );
};

export default App;
