// Lading page component
import { Link } from "react-router-dom";
import ParticlesContainer from "../components/User/ParticuleContainer";
const LandingPage = () => {
  return (
    <>
      <div className="p-4 md:p-8 lg:p-10 gap-y-7 flex flex-col my-auto relative z-[1]">
        <h1 className="text-6xl sm:text-9xl font-spaceGrotesk">Fireball </h1>
        <h2 className="text-4xl sm:text-8xl font-spaceGrotesk ">
          Meteorite Strikes{" "}
        </h2>
        <p className="max-w-[740px] ">
          Charting the Skies and Beyond: Embark on a Fascinating Expedition to
          Uncover the Mysteries of Meteorite Strikes from NASA`s Curated Dataset
        </p>
        <Link
          className="bg-indigo-800 self-start px-5 py-3 inline-block rounded-xl hover:sm:scale-[1.1] text-center
     transition duration-[350ms] ease-in-out uppercase tracking-[1.5px] text-2xl w-full sm:w-auto font-robotoSlab"
          to={"/searchpage"}
        >
          Start exploring
        </Link>
      </div>
      <ParticlesContainer />
    </>
  );
};

export default LandingPage;
