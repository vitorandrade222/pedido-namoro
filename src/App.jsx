import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export default function App() {
  const [screen, setScreen] = useState(-1)
  const [elapsedTime, setElapsedTime] = useState("")
  const [noCount, setNoCount] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (screen === 1) {
      const interval = setInterval(() => {
        const startDate = dayjs("2023-06-04T00:00:00")
        const now = dayjs()
        const diff = dayjs.duration(now.diff(startDate))

        const result = `${diff.years()} anos, ${diff.months()} meses, ${diff.days()} dias, ${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`
        setElapsedTime(result)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [screen])

  useEffect(() => {
    if (screen === 0 && audioRef.current) {
      fadeInAudio(audioRef.current)
    }
  }, [screen])

  const handleNoHover = () => setNoCount(prev => prev + 1)

  const fadeInAudio = (audio, duration = 2000) => {
    audio.volume = 0
    audio.play()
    let step = 0.05
    const interval = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + step, 1)
      } else {
        clearInterval(interval)
      }
    }, duration * step)
  }

  const fadeOutAudio = (audio, duration = 2000) => {
    let step = 0.05
    const interval = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(audio.volume - step, 0)
      } else {
        clearInterval(interval)
        audio.pause()
        audio.currentTime = 0
      }
    }, duration * step)
  }

  const handleYesClick = () => {
    setYesClicked(true)
    if (audioRef.current) {
      fadeInAudio(audioRef.current)
    }
    setTimeout(() => setScreen(3), 4000)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Áudio global */}
      <audio ref={audioRef} loop>
        <source src="/amor.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      {/* Corações animados */}
      <img
        src="/hearts.gif"
        alt="hearts"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
      />

      <AnimatePresence mode="wait">

        {screen === -1 && (
          <motion.div
            key="screen-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200 to-yellow-100 flex flex-col items-center justify-center text-center p-6 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const audio = new Audio("/gift.mp3")
                audio.play()
                setTimeout(() => setScreen(0), 1500)
              }}
              className="cursor-pointer"
            >
              <motion.img
                src="/gift-box.gif"
                alt="Presente"
                className="w-40 h-40 md:w-64 md:h-64 drop-shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              />
            </motion.div>

            <h1 className="mt-8 text-3xl md:text-5xl text-pink-700 font-extrabold animate-pulse">
              Clique no presente para abrir! 🎁
            </h1>
          </motion.div>
        )}


        {screen === 0 && (
          <motion.div
            key="screen0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center text-center p-6 z-10"
            style={{ backgroundImage: 'url(/mapa.png)' }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mb-6">📍 Brumado - BA → Cuiabá - MT</h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-4">Aproximadamente <strong>1.500 km</strong> de distância.</p>

            <p className="text-2xl md:text-3xl text-pink-800 font-medium max-w-xl mb-8">
              Nunca imaginei que uma pessoa tão longe iria me fazer sentir tão bem e tão feliz. 💘
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen(1)}
              className="bg-pink-500 text-white px-8 py-4 rounded-full text-xl shadow-lg hover:bg-pink-600 transition"
            >
              Próximo ❤️
            </motion.button>
          </motion.div>
        )}

        {screen === 1 && (
          <motion.div
            key="screen1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center text-center p-6 z-10"
            style={{ backgroundImage: 'url(/bg-time.jpg)' }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-pink-700 mb-4">⏳ você surgiu na minha vida a...</h2>
            <p className="text-xl md:text-2xl text-gray-800 mb-6">{elapsedTime}</p>

            <div className="text-9xl mb-10 animate-[pulseHeart_1.5s_ease-in-out_infinite]">❤️</div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen(2)}
              className="text-xl text-pink-700 font-medium hover:underline"
            >
              Continuar 💞
            </motion.button>
          </motion.div>
        )}

        {screen === 2 && (
          <motion.div
            key="screen2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center text-center p-4 z-10"
            style={{ backgroundImage: 'url(/casal.png)' }}
          >
            {!yesClicked ? (
              <>
                <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-4 animate-bounce">💌 Aceita recomeçar novamente comigo?</h1>
                <p className="text-2xl mb-8 text-white-700">Eu te amo muito ❤️</p>

                <div className="flex gap-8 items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYesClick}
                    className="bg-pink-600 text-white px-8 py-4 rounded-full text-2xl shadow-xl hover:bg-pink-700 transition-transform duration-200"
                  >
                    Sim! 💖
                  </motion.button>

                  <motion.button
                    onHoverStart={handleNoHover}
                    animate={{
                      x: Math.random() * 200 - 100,
                      y: Math.random() * 200 - 100,
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-300 text-black px-8 py-4 rounded-full text-2xl shadow hover:bg-gray-400 transition"
                  >
                    Não 😢
                  </motion.button>
                </div>

                {noCount > 2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-md text-red-500"
                  >
                    Você tem certeza disso? 😭
                  </motion.p>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-pink-800 mt-6"
              >
                <p className="text-2xl animate-pulse">Carregando surpresa... 🧸💖</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {screen === 3 && (
          <motion.div
            key="screen3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center text-center p-4 z-10"
            style={{ backgroundImage: 'url(/urso.png)' }}
          >
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black opacity-40 z-0" />

            {/* Conteúdo */}
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-pulse drop-shadow-lg">
                Não vou te soltar mais nuncaaaaaaaaaaaaaa! 💍
              </h1>
              <p className="text-2xl text-white drop-shadow-md">
                Obrigado por me fazer muito mais feliz 😍
              </p>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (audioRef.current) fadeOutAudio(audioRef.current)
                  setYesClicked(false)
                  setScreen(-1)
                }}
                className="mt-10 bg-white text-pink-600 px-8 py-4 rounded-full text-xl shadow-lg hover:bg-gray-100 transition"
              >
                Recomeçar 💫
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
