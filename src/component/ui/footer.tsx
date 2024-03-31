import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "@mui/material";
function Footer() {
  const email = "my.kurn@gmail.com";
  return (
    <footer className=" border-t border-gray-200/10 flex py-8 items-center justify-center flex-col">
      <div>Hubungi developer</div>
      <ul className=" [&>li]:space-x-2">
        <li>
          <EmailRoundedIcon />
          <Link href={"mailto:" + email}>{email}</Link>
        </li>
        <li>
          <GitHubIcon />
          <Link href="https://github.com/cupska/movie">sumber kode</Link>
        </li>
      </ul>
      <div className=" mt-4">© 2022 - 2024, PT. Yusuf Sejahtera Abadi.</div>
    </footer>
  );
}
export { Footer };
