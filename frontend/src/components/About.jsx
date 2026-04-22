import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');

        .about-gradient-text {
          background: linear-gradient(90deg, #EC6910 0%, #FFD400 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-gradient-bar {
          background: linear-gradient(90deg, #EC6910 0%, #FFD400 100%);
        }

        .about-image-shadow {
          box-shadow: 0 20px 56px rgba(236, 105, 16, 0.2);
        }

        .about-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #EC6910 0%, #FFD400 100%);
          border-radius: 0 0 18px 18px;
        }

        .slide-left {
          opacity: 0;
          transform: translateX(-70px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .slide-left.in {
          opacity: 1;
          transform: translateX(0);
        }

        .slide-right {
          opacity: 0;
          transform: translateX(70px) scale(0.96);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }
        .slide-right.in {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .fade-up-title {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }
        .fade-up-title.in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-up-text {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.52s, transform 0.7s ease 0.52s;
        }
        .fade-up-text.in {
          opacity: 1;
          transform: translateY(0);
        }

        .expand-bar {
          width: 0;
          transition: width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.55s;
        }
        .expand-bar.in {
          width: 56px;
        }

        .image-zoom {
          transition: transform 0.6s ease;
        }
        .image-zoom:hover {
          transform: scale(1.04);
        }
      `}</style>

      <section
        style={{ fontFamily: "poppins" }}
        ref={sectionRef}
        className="w-full bg-white py-16 sm:py-20 overflow-hidden mt-20"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-20 xl:gap-28">

          <div className={`w-full lg:flex-1 slide-left ${animated ? "in" : ""}`}>
            <div
              className=" relative bg-white rounded-[18px] overflow-hidden h-full "
              style={{ border: "2px solid #EC6910" }}
            >
              <div className="flex flex-col justify-center px-8 py-8 sm:py-10 flex-shrink-0">
                <div
                  className={`about-gradient-bar h-1 rounded-full mb-5 expand-bar ${animated ? "in" : ""}`}
                />
                <h2
                  className={`about-gradient-text fade-up-title font-bold ${animated ? "in" : ""}`}
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.1,
                  }}
                >
                  ABOUT US
                </h2>
              </div>

              <div
                className="hidden sm:block flex-shrink-0"
                style={{ width: "1px", background: "rgba(236,105,16,0.25)", alignSelf: "stretch" }}
              />
              <div
                className="block sm:hidden mx-8 mb-5"
                style={{ height: "1px", background: "rgba(236,105,16,0.25)" }}
              />

              <div className="flex-1 flex items-center px-8 pb-8">
                <p
                  className={`fade-up-text ${animated ? "in" : ""}`}
                  style={{
                    color: "#EC6910",
                    fontSize: "clamp(0.85rem, 1.1vw, 0.975rem)",
                    lineHeight: "1.85",
                    fontFamily: "poppins",
                  }}
                >
                  EqualWorks adalah platform digital yang bertujuan membuka peluang
                  yang setara bagi semua orang melalui pembelajaran keterampilan
                  digital dan akses ke pekerjaan jarak jauh. Dengan pendekatan
                  inklusif, platform ini menyediakan fitur aksesibilitas seperti
                  text-to-speech, mode kontras tinggi, dan dukungan Bahasa Isyarat
                  Indonesia (BISINDO) agar dapat digunakan oleh siapa saja,
                  termasuk penyandang disabilitas. EqualWorks tidak hanya membantu
                  pengguna belajar, tetapi juga menghubungkan mereka dengan peluang
                  kerja melalui sistem pencocokan berbasis keterampilan, serta
                  menampilkan dampak nyata melalui data perkembangan pengguna dan
                  peningkatan kesejahteraan.
                </p>
              </div>
            </div>
          </div>

          <div className={`w-full lg:flex-none lg:w-[380px] xl:w-[440px] slide-right ${animated ? "in" : ""}`}>
            <div
              className="rounded-[20px] overflow-hidden about-image-shadow"
              style={{
                border: "2px solid rgba(236,105,16,0.25)",
                height: "100%",
                minHeight: "260px",
              }}
            >
              <img className="w-full h-full object-cover" src="image/About.png" alt="" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}