import "./App.css";
import * as Carousel from "./component/ui/carousel";
import { Header } from "./component/ui/header";

import { Settings } from "react-slick";
import { MovieCard, TrailerCard } from "./component/ui/card";
import { useList } from "./hooks/useList";

function App() {
  // const { setSelectedOpts: setTrailerSelectedOpts, data: trailerData } =
  //   useList({
  //     defaultOpt: "popular",
  //     getUrl: (opt) =>
  //       `https://api.themoviedb.org/3/trending/all/${opt}?api_key=e92a7d5bfbd2499a7104d19001e21114`,
  //   });
  // console.log(trendingData, "data");
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
      <div className=" py-8 max-w-6xl m-auto">
        <MovieCarousel
          title="Trending"
          opts={[
            { label: "Today", val: "day" },
            { label: "Week", val: "week" },
          ]}
          defaultOpt="day"
          getUrl={(opt) =>
            `https://api.themoviedb.org/3/trending/all/${opt}?api_key=e92a7d5bfbd2499a7104d19001e21114`
          }
        />
      </div>

      <div className=" py-8 max-w-6xl m-auto">
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
              return `https://api.themoviedb.org/3/movie/now_playing?api_key=e92a7d5bfbd2499a7104d19001e21114`;
            } else {
              return "https://api.themoviedb.org/3/tv/airing_today?api_key=e92a7d5bfbd2499a7104d19001e21114";
            }
          }}
        />
      </div>
      <div className=" py-8 max-w-6xl m-auto">
        <MovieCarousel
          title="Best Movie"
          getUrl={() =>
            "https://api.themoviedb.org/3/movie/top_rated?api_key=e92a7d5bfbd2499a7104d19001e21114"
          }
        />
      </div>
      <div className=" py-8 max-w-6xl m-auto">
        <MovieCarousel
          title="Best TV Series"
          getUrl={() =>
            "https://api.themoviedb.org/3/tv/top_rated?api_key=e92a7d5bfbd2499a7104d19001e21114"
          }
        />
      </div>
    </>
  );
}

const isMobile = window.innerWidth <= 425;
const settingsCarousel = {
  movie: {
    slidesToShow: isMobile ? 2.3 : 5,
    slidesToScroll: isMobile ? 2 : 5,
    infinite: false,
    draggable: isMobile,
  } as Settings,
  trailer: {
    slidesToShow: isMobile ? 1.3 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    infinite: false,
    draggable: isMobile,
  } as Settings,
};

const MovieCarousel = ({
  defaultOpt,
  getUrl,
  title,
  opts,
}: Partial<Parameters<typeof useList>[0]> & {
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
              <MovieCard
                key={i}
                id={movie.id}
                releaseDate={movie.first_air_date || movie.release_date}
                img={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
                title={movie.name || movie.original_title}
              />
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
