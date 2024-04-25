import { Dialog, DialogProps, Skeleton } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { detailMovieType } from "../../data/type";

function ModalBase({
  children,
  ...dialogProps
}: DialogProps & { children: ReactNode }) {
  return <Dialog {...dialogProps}>{children}</Dialog>;
}

function MovieModal({ id, ...rest }: { id: string } & DialogProps) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [data, setData] = useState<detailMovieType>();
  const [status, setStatus] = useState<number>();
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      setData(await res.json());
      setStatus(await res.status);
    }
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <ModalBase {...rest} open={rest.open}>
        <div className={" flex flex-col md:flex-row md:w-[600px] "}>
          {status == 404 ? (
            <div className=" w-full p-10 md:h-[312px] grid place-items-center">
              Data Tidak Ditemukan
            </div>
          ) : (
            <>
              <div className=" m-auto max-md:mt-2">
                <div className="aspect-[150/225] w-52 relative">
                  {data?.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500` + data.poster_path}
                      alt=""
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"auto"}
                      height={"100%"}
                      animation="wave"
                    />
                  )}
                </div>
              </div>
              <div className=" md:h-[312px] flex-grow overflow-y-auto px-2 py-4">
                {data?.original_title ? (
                  <h2 className=" font-medium text-2xl">
                    {data.original_title}
                  </h2>
                ) : (
                  <>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      sx={{ width: "20rem", fontSize: "24px" }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      sx={{ width: "17rem", fontSize: "24px" }}
                    />
                  </>
                )}
                {data?.overview ? (
                  <p className=" text-sm">{data.overview}</p>
                ) : (
                  <>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        width: "100%",
                        height: "7rem",
                        marginTop: "2rem",
                      }}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </ModalBase>
    </>
  );
}

function TrailerModal({
  children,
  ...modalProps
}: DialogProps & { children: ReactNode }) {
  return <ModalBase {...modalProps}>{children}</ModalBase>;
}

export { ModalBase, MovieModal, TrailerModal };
