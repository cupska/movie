function Header() {
  // const [tema, setTema] = React.useState(localStorage.getItem("tema") ?? "");
  // const changeTema = () => {
  //   setTema(tema == "light" ? "dark" : "light");
  //   localStorage.setItem("tema", tema);
  // };
  // let prevScrollpos = window.scrollY;
  // window.onscroll = function () {
  //   const currentScrollPos = window.scrollY;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("navbar").style.top = "0";
  //   } else {
  //     document.getElementById("navbar").style.top = "-50px";
  //   }
  //   prevScrollpos = currentScrollPos;
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", () => )
  // }, [])
  return (
    <header className="  max-w-6xl relative m-auto flex items-center justify-between">
      <div className=" text-3xl lg:text-5xl z-10 absolute font-bold top-0 p-4   text-red-600">
        MovieDB
      </div>
    </header>
  );
}

export { Header };
