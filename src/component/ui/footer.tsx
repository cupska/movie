import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Link } from "@mui/material";
function Footer() {
  const email = "my.kurn@gmail.com";
  return (
    <footer className=" border-t border-gray-200/10 flex py-8 items-center justify-center flex-col">
      <div>Hubungi developer</div>
      <ul>
        <li>
          <EmailRoundedIcon /> <Link href="#">{email}</Link>
        </li>
      </ul>
      <div className=" mt-4">© 2009 - 2024, PT. Yusuf Sejahtera Abadi.</div>
    </footer>
  );
}
export { Footer };
