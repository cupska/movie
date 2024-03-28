import React from "react";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function Header() {
  const [tema, setTema] = React.useState(localStorage.getItem("tema") ?? "");
  const changeTema = () => {
    setTema(tema == "light" ? "dark" : "light");
    localStorage.setItem("tema", tema);
  };
  return (
    <header className=" flex items-center justify-between p-4">
      {/* <MenuRoundedIcon /> */}
      <div className=" text-3xl font-bold text-red-500">MovieDB</div>
      <div>
        <button onClick={changeTema}>toggle tema</button>
      </div>
    </header>
  );
}

export { Header };
