import React, { LegacyRef, ReactNode, useRef } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Slick, { Settings } from "react-slick";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import Slider from "react-slick";

function Container({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function MainCarousel({
  children, //menerima item arrai
  settings = {
    // infinite: true,
    // speed: 500,
    // slidesToShow: 5,
    // slidesToScroll: 5,
  },
}: {
  children: ReactNode;
  settings?: Settings;
}) {
  const sliderRef = useRef<Slick>();
  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const previous = () => {
    sliderRef?.current?.slickPrev();
  };
  return (
    <>
      <div className=" relative group">
        <button
          onClick={previous}
          className=" absolute  opacity-0 group-hover:opacity-100 text-3xl hover:opacity-100 duration-500 bg-transparent z-[1] top-[40%] max-lg:hidden rotate-180"
        >
          <ArrowCircleRightRoundedIcon fontSize="inherit" />
        </button>

        <Slick
          arrows={false}
          ref={sliderRef as unknown as LegacyRef<Slider> | undefined}
          {...settings}
        >
          {children}
        </Slick>
        <button
          onClick={next}
          className=" absolute text-3xl opacity-0 group-hover:opacity-100 hover:opacity-100  duration-100 bg-transparent z-[1] right-0  top-[40%] max-lg:hidden"
        >
          <ArrowCircleRightRoundedIcon fontSize="inherit" />
        </button>
      </div>
    </>
  );
}

function HeaderWrapper({ children }: { children: ReactNode }) {
  return <div className=" my-3 px-4 flex items-center gap-2">{children}</div>;
}

function HeaderTitle({ title }: { title: string }) {
  return <h4 className=" text-xl font-semibold">{title}</h4>;
}

function SelectOpts({
  opts,
  onChange,
}: {
  opts: { val: string; label: string }[];
  onChange?: (e: SelectChangeEvent) => void;
}) {
  const [selected, setSelected] = React.useState(opts[0].val);
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selected}
        onChange={(e) => [onChange && onChange(e), setSelected(e.target.value)]}
      >
        {opts.map((opt, i) => (
          <MenuItem key={i} value={opt.val}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export { Container, MainCarousel, HeaderWrapper, HeaderTitle, SelectOpts };
