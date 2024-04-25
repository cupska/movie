import { Skeleton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { MovieModal, TrailerModal } from "./modal";
import { useState } from "react";

function MovieCard({
  title,
  img,
  releaseDate,
  id,
}: {
  img?: string;
  title?: string;
  releaseDate?: string;
  id: string | number;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && id != 0 && (
        <MovieModal
          id={String(id)}
          open
          onClose={() => setOpenModal(!openModal)}
        />
      )}
      <div onClick={() => setOpenModal(!openModal)} className=" m-auto">
        <div className=" rounded-lg overflow-hidden">
          {img ? (
            <img src={img} alt={title} className=" aspect-[150/225]" />
          ) : (
            <Skeleton
              animation={"wave"}
              variant="rounded"
              style={{ aspectRatio: 150 / 225 }}
              height={"auto"}
              width={"inherit"}
            />
          )}
        </div>
        <div>
          <h5 className=" line-clamp-2 font-medium leading-4  mt-2 ">
            {title || (
              <>
                <Skeleton
                  animation={"wave"}
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
                <Skeleton
                  animation={"wave"}
                  variant="text"
                  sx={{ fontSize: "1rem", width: "5rem" }}
                />
              </>
            )}
          </h5>
          <span className="   lock mt-1 text-sm">{releaseDate}</span>
        </div>
      </div>
    </>
  );
}

function TrailerCard({
  title,
  img,
}: {
  src?: string;
  title?: string;
  id?: string | number;
  img?: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const content = (
    <>
      <img src={img} alt={title} className="  w-full aspect-[300/168.5]" />
      <div className=" absolute z-[9999] text-6xl text-white opacity-80 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  ">
        <PlayCircleIcon fontSize="inherit" color="inherit" />
      </div>
    </>
  );
  return (
    <>
      <TrailerModal onClose={() => setOpenModal(!openModal)} open={openModal}>
        {content}
      </TrailerModal>
      <div className="  min-w-60 max-w-80 m-auto">
        <div className="rounded-lg w-full relative overflow-hidden aspect-[300/168.5]">
          {img ? (
            <button onClick={() => setOpenModal(!openModal)}>{content}</button>
          ) : (
            <Skeleton
              animation={"wave"}
              variant="rounded"
              style={{ aspectRatio: "inherit" }}
              height={"auto"}
              width={"inherit"}
            />
          )}
        </div>

        <h5 className=" font-medium text-center mt-2">
          {title || (
            <Skeleton
              animation={"wave"}
              variant="text"
              sx={{ fontSize: "1rem" }}
            />
          )}
        </h5>
      </div>
    </>
  );
}

export { MovieCard, TrailerCard };
