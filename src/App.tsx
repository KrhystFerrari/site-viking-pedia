import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaSkullCrossbones,
  FaShip,
  FaShieldAlt,
  FaBook,
  FaHammer,
  FaFlag,
} from "react-icons/fa";
import { Howl } from "howler";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VikingDetailPage from "./components/VikingDetailPage";
import WikipediaSearch from "./components/WikiPediaSearch";

function App() {
  const controls = useAnimation();
  const soundRef = useRef<Howl | null>(null);
  const [showClickIndicator, setShowClickIndicator] = useState(true);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });

    soundRef.current = new Howl({
      src: ["/viking.mp3"],
      autoplay: false,
      loop: true,
      volume: 0.1,
      html5: true,
      onend: function () {
        console.log("Finished!");
      },
      onloaderror: (_, error) => {
        console.error("Failed to load sound:", error);
      },
    });

    const playAudio = () => {
      soundRef.current?.play();
      setShowClickIndicator(false);
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      soundRef.current?.stop();
    };
  }, [controls]);

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Fundo */}
        <div
          className="w-full h-full absolute top-0 left-0 -z-10"
          style={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            objectFit: "cover",
          }}
        ></div>

        {/* Indicador de clique */}
        {showClickIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 text-accent text-lg whitespace-nowrap"
          >
            Click anywhere to activate sound, VIKING!
          </motion.div>
        )}

        {/* Conteúdo */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-8 text-accent text-center mt-10"
        >
          Vikings: The Age of Warriors
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl mb-12 text-accent text-center max-w-2xl"
        >
          Explore the legendary world of the Vikings, their culture, ships, and
          the call to Valhalla.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <FaSkullCrossbones className="text-4xl mb-4 text-accent" />
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Warriors
            </h2>
            <p className="text-center text-accent">
              Discover the fierce warriors who raided and explored new lands.
            </p>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <FaShip className="text-4xl mb-4 text-accent" />
            <h2 className="text-2xl font-semibold mb-2 text-accent">Ships</h2>
            <p className="text-center text-accent">
              Learn about the iconic longships that carried the Vikings across
              the seas.
            </p>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <FaShieldAlt className="text-4xl mb-4 text-accent" />
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Valhalla
            </h2>
            <p className="text-center text-accent">
              Understand the Viking belief in Valhalla, the hall of the slain.
            </p>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <FaBook className="text-4xl mb-4 text-accent" />
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Mythology
            </h2>
            <p className="text-center text-accent">
              Explore the rich mythology of the Norse gods and legends.
            </p>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <FaHammer className="text-4xl mb-4 text-accent" />
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Artifacts
            </h2>
            <p className="text-center text-accent">
              Discover ancient Viking artifacts and their significance.
            </p>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <FaFlag className="text-4xl mb-4 text-accent" />
            <h2 className="text-2xl font-semibold mb-2 text-accent">Battles</h2>
            <p className="text-center text-accent">
              Learn about the most famous battles fought by the Vikings.
            </p>
          </div>
        </motion.div>

        <WikipediaSearch />

        <Routes>
          <Route path="/detail/:id" element={<VikingDetailPage />} />
        </Routes>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 bg-accent text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-accent transition-colors"
        >
          <Link to="/detail/12345">Explore More</Link>
        </motion.button>
      </div>
    </Router>
  );
}

export default App;
