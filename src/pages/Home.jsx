import TextTransition, { presets } from "react-text-transition";
import { useEffect, useState } from "react";
import profile from "../assets/img/911.png";
import ss from "../assets/img/ss.png";
import gojekImage from "../assets/img/clients/gojek.png";
import jntImage from "../assets/img/clients/jnt.png";
import ttvImage from "../assets/img/clients/tv.png";
import trcImage from "../assets/img/clients/trc.png";
import bawasluImage from "../assets/img/clients/bw.png";
import toyotaImage from "../assets/img/clients/Toyota.svg";
import checkImage from "../assets/img/check.png";

import axios from "axios";

const text = [
  "Saya adalah seorang software developer",
  "Saya bekerja dengan mern",
  "Php",
  "Laravel",
  "Mysql",
];

export default function Home() {
  const [isScroll, setScrolled] = useState(false); //untuk mengatur scroll
  const [click, setClick] = useState(false); //untuk mengatur ketika di click
  const [index, setIndex] = useState(0);

  const [comments, setComments] = useState([]);

  // Fungsi untuk mengambil komentar dari server
  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getComments");
      setComments(response.data); // Update state dengan data terbaru
    } catch (error) {
      console.error("Gagal mengambil komentar:", error);
    }
  };

  useEffect(() => {
    fetchComments(); // Ambil data saat pertama kali render
  }, []);

  useEffect(() => {
    const berandaNav = document.querySelector("#beranda-nav");
    const tentangSaya = document.querySelector(".tentang-saya");
    const portfolio = document.querySelector(".portfolio");
    const clients = document.querySelector(".clients");
    const kontak = document.querySelector(".kontak");

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Beranda aktif hanya jika di posisi awal
      if (scrollY === 0) {
        berandaNav?.classList.add("active");
        tentangSaya?.classList.remove("active");
        setScrolled(false);
      } else {
        berandaNav?.classList.remove("active");
        setScrolled(true);
      }

      // Tentang Saya
      if (scrollY >= 335) {
        tentangSaya?.classList.add("active");
      } else {
        tentangSaya?.classList.remove("active");
      }

      if (scrollY > 825) {
        tentangSaya?.classList.remove("active");
      }

      // Portfolio
      if (scrollY >= 815 && scrollY <= 1928) {
        portfolio?.classList.add("active");
      } else {
        portfolio?.classList.remove("active");
      }

      // Clients
      if (scrollY >= 2009) {
        clients?.classList.add("active");
      } else {
        clients?.classList.remove("active");
      }

      // Kontak
      if (scrollY >= 2624) {
        clients?.classList.remove("active");
        kontak?.classList.add("active");
      } else {
        kontak?.classList.remove("active");
      }

      if (scrollY > 2916) {
        kontak?.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // untuk animasi text title
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((i) => (i + 1) % text.length),
      2000
    );
    return () => clearInterval(intervalId);
  }, []);

  //fungsi untuk handle click
  const handleClick = () => {
    const imgRotateHand = document.querySelector("#rotateHand");
    const hamburger = document.querySelector("#hambuger");
    setClick(true);

    if (click == true) {
      setClick((prev) => !prev);
    }
  };

  return (
    <>
      <HeaderContainer>
        <ContainerHeader isScroll={isScroll}>
          <Logo />
          <Navbar click={click} />
          <MenuButton click={click} handleClick={handleClick} />
        </ContainerHeader>
      </HeaderContainer>
      <Main>
        <ContainerMain>
          <Hero index={index} />
          <About />
          <Portfolio />
          <Client comments={comments} />
          <Contact onCommentAdded={fetchComments} />
        </ContainerMain>
      </Main>
      <Footer>
        <FooterSection />
      </Footer>
    </>
  );
}

function HeaderContainer({ children }) {
  return (
    <header className="px-5 relative" id="beranda">
      {children}
    </header>
  );
}

function ContainerHeader({ isScroll, children }) {
  return (
    <div
      className={`container-header w-[90%] py-[.3rem] px-2.5 fixed top-0 z-50 flex flex-row items-center rounded-lg border-[1px] border-slate-300 backdrop-blur-md ${
        isScroll ? "shadow-md shadow-slate-500" : "shadow-none"
      } transition duration-500 sm:w-[97%]`}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <h1 className="p-1 shadow-sm shadow-slate-700 bg-linear-to-r from-sky-700 to-gray-400 bg-clip-text text-transparent rounded-md">
      MP.
    </h1>
  );
}

function Navbar({ click }) {
  return (
    <div className="navbar ml-auto">
      <div
        className={`nav-list p-1.5 text-sky-600 gap-2.5 transition duration-700 delay-1000 ${
          click ? "absolute right-0 z-50" : "hidden"
        } top-[50px] flex-col shadow-sm shadow-slate-700 bg-linear-to-br from-gray-400 via-slate-200 to-gray-200 sm:bg-none rounded-2xl sm:top-0 sm:relative sm:flex sm:flex-row sm:items-center`}
      >
        <div className="nav">
          <a
            href="#beranda"
            className="hover:text-slate-400 beranda-nav active"
            id="beranda-nav"
          >
            Beranda
          </a>
        </div>
        <div className="nav">
          <a
            href="#tentang"
            className="hover:text-slate-400 tentang-saya"
            id="tentang-saya-nav"
          >
            Tentang Saya
          </a>
        </div>
        <div className="nav">
          <a
            href="#portfolio"
            className="hover:text-slate-400 portfolio"
            id="tentang-saya-nav"
          >
            Portfolio
          </a>
        </div>
        <div className="nav">
          <a
            href="#clients"
            className="hover:text-slate-400 clients"
            id="tentang-saya-nav"
          >
            Clients
          </a>
        </div>
        <div className="nav">
          <a
            href="#kontak"
            className="hover:text-slate-400 kontak"
            id="kontak-nav kontak"
          >
            Kontak
          </a>
        </div>
      </div>
    </div>
  );
}

function MenuButton({ click, handleClick }) {
  return (
    <>
      <div
        className={`w-[35px] h-[35px] ml-2.5 p-1 flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center sm:hidden cursor-pointer border-[1px] border-slate-300 rounded-2xl transition-discrete duration-300 ease-in-out hover:shadow-sm shadow-slate-700 group ${
          click ? "hamburger-active" : ""
        }`}
        id="hamburger"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="hamburger-line origin-top-left transition duration-500 ease-in-out"></span>
          <span className="hamburger-line transition duration-100 ease-in-out"></span>
          <span className="hamburger-line origin-bottom-left transition duration-500 ease-in-out"></span>
        </div>
        <p className="font-normal text-[.5rem]">Menu</p>
      </div>
    </>
  );
}

function Main({ children }) {
  return (
    <main
      id=""
      className={`mt-[3.5rem] px-[4rem] flex flex-col sm:flex-row sm:justify-center box-border w-full max-w-full `}
    >
      {children}
    </main>
  );
}

function ContainerMain({ children }) {
  return (
    <section
      className="w-full py-[1rem] flex flex-col items-start box-border"
      id="container-main"
    >
      {children}
    </section>
  );
}

function Hero({ index }) {
  return (
    <section className="hero w-full">
      <div className="container-hero">
        <div className="px-10 flex flex-wrap items-center sm:w-full">
          <div className="relative sm:w-1/2 self-center px-4">
            <h1 className="relative text-sm sm:text-[1rem] font-normal sm:font-semibold font-inter text-sky-600">
              Halo Selamat Datang, Saya{" "}
              <span className="sm:block mt-1 text-2xl sm:text-[2rem] font-semibold bg-linear-to-br from-slate-700 from-8% via-slate-100 via-2% to-slate-800 to-60% bg-clip-text text-transparent">
                Muhammad Farhan
              </span>
            </h1>
            <h2 className="relative mb-1.5 sm:my-0 text-[.75rem] sm:text-[1rem] font-light text-red-800 bg-linear-to-r from-white to-slate-500 w-[100%] sm:w-[60%] rounded-full flex items-center justify-center">
              <TextTransition springConfig={presets.wobbly}>
                {text[index]}
              </TextTransition>
            </h2>

            <button className="relative my-1 sm:my-1.5 w-[auto] p-1.5 sm:p-2.5 bg-teal-500 text-white font-normal text-[.75rem] sm:text-[.8rem] rounded-full transition duration-200 shadow-sm hover:bg-teal-700 hover:shadow-lg sm:shadow sm:shadow-slate-600 sm:hover:shadow-md cursor-pointer">
              Hubungi Saya
            </button>

            <span className="absolute inset-0 -top-[5rem] -left-[30rem] -z-10 flex justify-center items-center">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#08BDBA"
                  d="M23.4,-40C31,-36.2,38.1,-31.2,49.8,-24.3C61.5,-17.4,77.8,-8.7,78.5,0.4C79.2,9.5,64.4,19.1,52.1,25C39.8,30.8,30.1,33,21.8,42.1C13.5,51.3,6.8,67.3,-0.1,67.5C-7,67.8,-14.1,52.2,-24.6,44.4C-35.2,36.6,-49.2,36.5,-53.8,30.4C-58.4,24.3,-53.6,12.2,-51.1,1.5C-48.6,-9.2,-48.2,-18.4,-47.6,-31.5C-47.1,-44.6,-46.2,-61.5,-38.2,-65.1C-30.2,-68.6,-15.1,-58.8,-3.6,-52.6C7.9,-46.4,15.9,-43.8,23.4,-40Z"
                  transform="translate(100 100) scale(.5)"
                />
              </svg>
            </span>
          </div>

          <div className="relative sm:w-1/2 self-end px-4">
            <div className="relative mt-10">
              <img
                src={profile}
                alt="Profile"
                className="max-w-full mx-auto sm:max-w-72 relative"
              />
              <span className="absolute inset-0 -z-10 flex justify-center items-center">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fill="#08BDBA"
                    d="M21.1,-44.1C23.8,-35.1,19.8,-22.1,25.5,-14.1C31.3,-6.1,46.7,-3.1,46.1,-0.3C45.5,2.4,28.8,4.7,21.4,9.7C13.9,14.7,15.6,22.3,13.6,26.3C11.5,30.3,5.8,30.7,-0.6,31.7C-6.9,32.7,-13.9,34.4,-20.6,33.1C-27.3,31.8,-33.7,27.5,-41.4,21.5C-49,15.5,-57.7,7.7,-57.3,0.2C-56.9,-7.3,-47.3,-14.5,-37.6,-16.9C-27.9,-19.3,-18.1,-16.9,-11.8,-23.8C-5.5,-30.8,-2.8,-47.2,3.2,-52.8C9.2,-58.4,18.5,-53.2,21.1,-44.1Z"
                    transform="translate(100 100) scale(1.5)"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="pt-24 pb-32" id="tentang">
      <div id="container">
        <div className="flex flex-row flex-wrap">
          <div className="w-full px-4 mb-10 sm:w-1/2">
            <h4 className="text-[1.2rem] font-bold uppercase text-sky-600 mb-3">
              Tentang Saya
            </h4>
            <h3 className="text-[1.1rem] text-slate-500 font-bold mb-2 max-w-md">
              Pengalaman
            </h3>
            <p className="text-slate-500 text-base max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae facere laborum corrupti magnam architecto dolor
              veritatis quae illum, optio est.
            </p>
          </div>
          <div className="w-full px-4 mb-10 sm:w-1/2">
            <h3 className="text-[1.2rem] font-semibold mb-4 pt-10 text-sky-500">
              Sosial Media
            </h3>
            <p className="text-slate-500 text-base mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus, repellat!
            </p>
            <div className="flex flex-wrap items-center">
              {/* instagram */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  role="img"
                  width="15"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <title>Instagram</title>
                  <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                </svg>
              </a>
              {/* instagram */}

              {/* line */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  role="img"
                  width="15"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <title>LINE</title>
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
              {/* line */}

              {/* whatsapp */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  role="img"
                  width="15"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              {/* whatsapp */}

              {/* git */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  width="15"
                  role="img"
                  viewBox="0 0 24 24"
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              {/* git */}

              {/* discord */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  width="15"
                  role="img"
                  viewBox="0 0 24 24"
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Discord</title>
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              {/* discord */}

              {/* x */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  width="15"
                  role="img"
                  viewBox="0 0 24 24"
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              {/* x */}

              {/* email */}
              <a
                href=""
                target="_blank"
                className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
              >
                <svg
                  role="img"
                  width="15"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>mailbox.org</title>
                  <path d="M2.229 22.844H24V10.501l-8.628 5.882c-.613.419-1.226-.003-1.226-.003L0 6.646v13.969s0 2.229 2.229 2.229m12.558-9.273L24 7.261V1.156H2.229S0 1.156 0 3.384v.06l14.787 10.127Z" />
                </svg>
              </a>
              {/* email */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative -left-[64px] w-[96.9vw] md:w-[98.4vw] lg:w-[99vw] sm:w-[98.9vw] pt-36 pb-16 bg-linear-to-b from-slate-300 via-slate-100 to-slate-700 to-90%"
    >
      <div id="container">
        <div className="w-full px-4">
          <div className="m-w-xl mx-auto text-center mb-16 flex flex-col items-center">
            <h1 className="text-sky-600 sm:text-[1rem]">Portfolio</h1>
            <h2 className="font-bold text-slate-500 text-2xl mb-4 sm:text-[1.5rem]">
              Project Terbaru
            </h2>
            <p className="font-medium text-[.75rem] text-slate-500 max-w-lg sm:text-[.85rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              beatae quidem non unde voluptatibus vitae necessitatibus labore,
              at nesciunt, dolorum repellendus optio fugiat architecto pariatur
              natus corrupti mollitia quae! Eos odio asperiores, labore
              voluptatem numquam cupiditate animi quidem ipsum necessitatibus.
            </p>
          </div>
        </div>
        <div className="w-full px-4 flex flex-wrap justify-center xl:w-10/12 xl:mx-auto">
          <div className="mb-12 p-4 sm:w-1/2">
            <div className="rounded shadow-md overflow-hidden">
              <img src={ss} alt="Portfolio latihan" width="w-full" />
            </div>
            <h1 className="font-semibold text-lg text-slate-600 mt-3 mb-5 ">
              Portfolio Saya
            </h1>
            <p className="font-medium text-slate-500 text-base text-[.75rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              magni debitis perspiciatis cum provident aliquid fugit minus
              dolorem sunt quos?
            </p>
          </div>
          <div className="mb-12 p-4 sm:w-1/2">
            <div className="rounded shadow-md overflow-hidden">
              <img src={ss} alt="Portfolio latihan" width="w-full" />
            </div>
            <h1 className="font-semibold text-lg text-slate-600 mt-3 mb-5 ">
              Portfolio Saya
            </h1>
            <p className="font-medium text-slate-500 text-base text-[.75rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              magni debitis perspiciatis cum provident aliquid fugit minus
              dolorem sunt quos?
            </p>
          </div>
          <div className="mb-12 p-4 sm:w-1/2">
            <div className="rounded shadow-md overflow-hidden">
              <img src={ss} alt="Portfolio latihan" width="w-full" />
            </div>
            <h1 className="font-semibold text-lg text-slate-200 mt-3 mb-5 ">
              Portfolio Saya
            </h1>
            <p className="font-medium text-slate-200 text-base text-[.75rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              magni debitis perspiciatis cum provident aliquid fugit minus
              dolorem sunt quos?
            </p>
          </div>
          <div className="mb-12 p-4 sm:w-1/2">
            <div className="rounded shadow-md overflow-hidden">
              <img src={ss} alt="Portfolio latihan" width="w-full" />
            </div>
            <h1 className="font-semibold text-lg text-slate-200 mt-3 mb-5 ">
              Portfolio Saya
            </h1>
            <p className="font-medium text-slate-200 text-base text-[.75rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              magni debitis perspiciatis cum provident aliquid fugit minus
              dolorem sunt quos?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Client({ comments }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 3000); // Animasi setiap 3 detik

    return () => clearInterval(intervalId);
  }, [comments.length]);

  return (
    <section
      id="clients"
      className="w-[96.9vw] md:w-[98.5vw] lg:w-[98.9vw] relative -left-[64px] pt-36 pb-32 bg-slate-800"
    >
      <div id="container" className="w-full">
        <div className="w-full px-4">
          <div className="m-w-xl mx-auto text-center mb-16 flex flex-col items-center">
            <h1 className="text-sky-500">Clients</h1>
            <h2 className="font-bold text-white/80 text-2xl mb-4">
              Yang Pernah Bekerja Sama
            </h2>
            <p className="font-medium text-[.75rem] text-slate-200 max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              beatae quidem non unde voluptatibus vitae necessitatibus labore,
              at nesciunt, dolorum repellendus optio fugiat architecto pariatur
              natus corrupti mollitia quae! Eos odio asperiores, labore
              voluptatem numquam cupiditate animi quidem ipsum necessitatibus.
            </p>
          </div>
        </div>

        <div className="w-full px-4">
          <div className="flex flex-wrap items-center justify-between sm:justify-center">
            <a
              href=""
              className="max-w-[120px] mx-4 p-1 grayscale opacity-50 bg-white/70 transition duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 border border-slate-400 rounded-full sm:mx-6 mb-1 sm:mb-4 flex items-center justify-center"
            >
              <img src={gojekImage} alt="Gojek" />
            </a>
            <a
              href=""
              className="max-w-[120px] mx-4 p-1 grayscale opacity-50 bg-white/70 transition duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 border border-slate-400 rounded-full sm:mx-6 mb-1 sm:mb-4 flex items-center justify-center"
            >
              <img src={ttvImage} alt="TransTv" />
            </a>
            <a
              href=""
              className="max-w-[120px] mx-4 p-1 grayscale opacity-50 bg-white/70 transition duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 border border-slate-400 rounded-full sm:mx-6 mb-1 sm:mb-4 flex items-center justify-center"
            >
              <img src={bawasluImage} alt="Bawaslu" />
            </a>
            <a
              href=""
              className="max-w-[120px] mx-4 p-4 grayscale opacity-50 bg-white/70 transition duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 border border-slate-400 rounded-full sm:mx-6 mb-1 sm:mb-4 flex items-center justify-center"
            >
              <img src={trcImage} alt="RitzCarlton" width={`80px`} />
            </a>
            <a
              href=""
              className="max-w-[120px] mx-4 p-1 grayscale opacity-50 bg-white/70 transition duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 border border-slate-400 rounded-full sm:mx-6 mb-1 sm:mb-4 flex items-center justify-center"
            >
              <img src={jntImage} alt="Jnt" />
            </a>
            <a
              href=""
              className="max-w-[120px] mx-4 p-3.5 grayscale opacity-50 bg-white/70 transition duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 border border-slate-400 rounded-full sm:mx-6 mb-1 sm:mb-4 flex items-center justify-center"
            >
              <img src={toyotaImage} alt="Toyota" width={`50px`} />
            </a>
          </div>
        </div>

        <div className="w-full px-4">
          <div
            id="container"
            className="mx-auto h-auto px-2.5 py-5 w-full lg:w-1/4 flex flex-col items-center justify-center box-border rounded-full"
          >
            <div
              id="judul"
              className="flex flex-wrap justify-center w-1/2 mb-2"
            >
              <h1 className="font-semibold text-slate-300">Kata Mereka</h1>
              <h2 className="font-medium text-slate-400">Komentar &#8628; </h2>
            </div>
            <div className="flex flex-col flex-wrap justify-start items-center w-1/2 h-20 ">
              {comments?.length == 0 ? (
                <>
                  <h1 className="relative w-40 text-[.75rem] text-white uppercase">
                    Hello Data Kosong nih
                  </h1>
                  <p className="text-[.7rem] font-medium text-white flex flex-wrap">
                    Isi Yuk..
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-lg text-white uppercase">
                    {/* ANIMASI TEXT */}
                    <TextTransition springConfig={presets.wobbly}>
                      {comments?.[index]?.nama || "Loading..."}
                    </TextTransition>
                  </h1>
                  <p className="text-[.7rem] font-medium text-slate-300 flex flex-wrap w-[50%]">
                    <TextTransition springConfig={presets.wobbly}>
                      {comments?.[index]?.message?.length > 10
                        ? comments?.[index]?.message.split(" ")[0] + "..."
                        : comments?.[index]?.message || "Please Refresh .."}
                    </TextTransition>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ onCommentAdded }) {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/contact",
        formData
      );
      setIsNotif((prev) => !prev);
      console.log(isNotif);

      setFormData({ nama: "", email: "", message: "" }); // Reset form

      onCommentAdded(); // Panggil fungsi untuk mengambil ulang data komentar
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Gagal mengirim komentar");
    }
  };

  const [isNotif, setIsNotif] = useState(false);

  useEffect(() => {
    const containerCheck = document.querySelector("#container-check");

    if (isNotif && containerCheck) {
      setTimeout(() => {
        containerCheck.classList.replace("invisible", "visible");
        containerCheck.classList.replace("left-[550px]", "left-0");

        // Setelah 3 detik, kembalikan ke kondisi semula
        setTimeout(() => {
          containerCheck.classList.replace("visible", "invisible");
          containerCheck.classList.replace("left-0", "left-[550px]");
          setIsNotif(false); // Kembalikan state ke false agar bisa digunakan kembali
        }, 3000);
      }, 2000);
    }
  }, [isNotif]);

  return (
    <section id="kontak" className="w-full pt-36 pb-32">
      <div id="container">
        <div className="w-full px-4">
          <div className="w-full px-4">
            <div className="m-w-xl mx-auto text-center mb-16 flex flex-col items-center">
              <h1 className="text-sky-500">Kontak</h1>
              <h2 className="font-bold text-slate-600 text-2xl mb-4">
                Hubungi Saya
              </h2>
              <p className="font-medium text-[.75rem] text-slate-400 max-w-lg">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
                dolor nostrum dolores nesciunt consectetur repudiandae.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          <div
            id="container-check"
            className="invisible fixed left-[175px] top-[200px] z-50 lg:left-[550px] mx-auto p-2.5 w-20 lg:w-1/5 h-auto max-h-auto flex flex-col items-center rounded-md ring-1 ring-slate-300 bg-slate-600 text-white shadow-md shadow-teal-600"
          >
            <div
              id="title"
              className="flex flex-col items-center justify-center lg:flex-row mb-1"
            >
              <h1 className="font-semibold text-[.75rem] lg:text-[1.2rem] flex flex-wrap items-center justify-center w-full">
                Success
              </h1>
              <img src={checkImage} alt="" className="w-[15px] lg:w-[20px]" />
            </div>
            <p className="text-[.5rem] lg:text-[.75rem]">
              Berhasil Simpan Data.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="sm:w-2/3 sm:mx-auto"
        >
          <div className="w-full px-4 mb-8">
            <label
              htmlFor="nama"
              className="mb-2 text-base font-bold text-sky-500"
            >
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Write here"
              autoComplete="off"
              className="w-full h-8 lg:h-8 px-5 mb-4 text-[.75rem] bg-slate-300 placeholder:text-slate-500 rounded-full transition duration-500 ease-in-out focus:shadow-sm focus:shadow-sky-600 focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-[.75rem] flex items-center"
            />
            <label
              htmlFor="email"
              className="mb-2 text-base font-bold text-sky-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full h-8 lg:h-8 px-5 text-[.75rem] mb-4 bg-slate-300 placeholder:text-slate-500 rounded-full transition duration-500 ease-in-out focus:shadow-sm focus:shadow-sky-600 focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-[.75rem] flex items-center invalid:focus:ring-red-500 invalid:focus:shadow-red-400 invalid:focus:bg-red-200 peer"
            />
            <p className="invisible relative -top-[.5rem] transition duration-300 ease-in-out text-red-400 text-[.8rem] peer-invalid:visible ">
              Email belum tepat ..
            </p>
            <label
              htmlFor="text"
              className="mb-2 text-base font-bold text-sky-500"
            >
              Pesan
            </label>
            <textarea
              type="text"
              id="email"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full text-[.8rem] py-1 px-4 mb-1.5 bg-slate-300 placeholder:text-slate-500 rounded-sm transition duration-500 ease-in-out focus:shadow-sm focus:shadow-sky-600 focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-[.75rem] max-h-40"
            ></textarea>
          </div>
          <div className="w-full px-4">
            <button
              type="submit"
              className=" relative py-1 px-1 mx-auto bg-teal-500 rounded-full text-[.75rem] transition duration-300 ease-in-out shadow-sm shadow-slate-400 hover:bg-teal-600 hover:shadow-md hover:-top-[1px] font-semibold text-base text-white ring-1 ring-teal-300 w-full sm:w-[15%]"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer({ children }) {
  return (
    <footer
      className={`mt-[3.5rem] flex flex-col sm:flex-row sm:justify-center box-border w-full max-w-full`}
    >
      {children}
    </footer>
  );
}

function FooterSection() {
  return (
    <section id="footer" className="w-full">
      <div
        id="container"
        className="relative w-full p-5 flex flex-wrap bg-slate-800"
      >
        <div className="w-full mx-auto sm:w-full flex flex-wrap justify-center">
          <div className="w-full mb-6 text-slate-300 sm:w-1/3">
            <h1 className="font-semibold text-[.75rem] bg-linear-to-br from-slate-500 from-5% to-slate-200 to-95%% bg-clip-text text-transparent">
              Muhammad Farhan
            </h1>
            <h2 className="text-sky-400 font-bold text-[1.2rem] mb-2">
              Hubungi Saya
            </h2>
            <h3 className="text-[.75rem]">mf333285@gmail.com</h3>
            <p className="text-[.75rem]">Jl.Poncol, Ciracas Jak-Tim.</p>
          </div>
          <div className="w-full mb-6 text-slate-300 sm:w-1/3">
            <h2 className="text-sky-400 font-bold text-[1.2rem] mb-2">
              Tautan
            </h2>
            <ul className="text-[.75rem]">
              <li>
                <a
                  href=""
                  className="transition duration-500 ease-in-out hover:text-sky-500"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="transition duration-500 ease-in-out hover:text-sky-500"
                >
                  Tentang Saya
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="transition duration-500 ease-in-out hover:text-sky-500"
                >
                  Sosial Media
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="transition duration-500 ease-in-out hover:text-sky-500"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="transition duration-500 ease-in-out hover:text-sky-500"
                >
                  Clients
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="transition duration-500 ease-in-out hover:text-sky-500"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-1 mb-6 bg-slate-600 w-full"></div>
        <div className="w-full px-4 mb-10 sm:w-1/2 sm:mx-auto flex flex-wrap justify-center items-center">
          <div className="flex flex-wrap items-center justify-center">
            {/* instagram */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                role="img"
                width="15"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <title>Instagram</title>
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </a>
            {/* instagram */}

            {/* line */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                role="img"
                width="15"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <title>LINE</title>
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>
            {/* line */}

            {/* whatsapp */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                role="img"
                width="15"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            {/* whatsapp */}

            {/* git */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                width="15"
                role="img"
                viewBox="0 0 24 24"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            {/* git */}

            {/* discord */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                width="15"
                role="img"
                viewBox="0 0 24 24"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Discord</title>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
            {/* discord */}

            {/* x */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                width="15"
                role="img"
                viewBox="0 0 24 24"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            {/* x */}

            {/* email */}
            <a
              href=""
              target="_blank"
              className="w-9 h-9 mr-3 mb-1 rounded-full flex justify-center items-center border border-slate-300 hover:border-sky-500 hover:bg-sky-600 hover:text-white transition duration-500 ease-in-out text-slate-500"
            >
              <svg
                role="img"
                width="15"
                className="fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>mailbox.org</title>
                <path d="M2.229 22.844H24V10.501l-8.628 5.882c-.613.419-1.226-.003-1.226-.003L0 6.646v13.969s0 2.229 2.229 2.229m12.558-9.273L24 7.261V1.156H2.229S0 1.156 0 3.384v.06l14.787 10.127Z" />
              </svg>
            </a>
            {/* email */}
          </div>
        </div>
        <div className="w-full px-4 mb-1 flex items-end justify-center text-slate-400 text-[.75rem] sm:text-[1rem]">
          <h1>
            Design & Developed by{" "}
            <span className="bg-linear-to-br block sm:inline-block from-sky-500 to-sky-200 bg-clip-text text-transparent ">
              Muhammad Farhan
            </span>{" "}
            build with{" "}
            <span className="inline-block">
              <a
                href=""
                className="w-9 h-9 mr-1 mb-1 rounded-full flex flex-col justify-center items-center hover:text-sky-400 transition duration-500 ease-in-out text-slate-300"
              >
                <svg
                  role="img"
                  width={`15px`}
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>React</title>
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                </svg>
                <p className="text-[.5rem]">React</p>
              </a>
            </span>
            & <span className="text-sky-400">Tailwind Css.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
