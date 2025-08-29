import styles from "./poweredBy.module.css"

export const PoweredBy = () => (
  <div className={`container ${styles.mainContainer}`}>
    <div className={styles.textContent}>
      <h3>
        Powered by Clinically <br /> <span> Proven Antifungals</span>
      </h3>
      <p>
        Itraconazole and Terbinafine are powerful prescription antifungals,
        extensively studied and proven effective against nail fungus, primarily
        through clinical trials of their oral forms published in leading medical
        journals. This research confirms these agents successfully eradicate
        fungus and restore clearer, healthier-looking nails.
      </p>
    </div>
    <div className={styles.videoCard}>
      <iframe
        allowFullScreen={false}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="Clarivia"
        width="615"
        height="373"
        src="https://www.youtube.com/embed/xAIJZOjmwP8?si=DVcJCAhLy1Tdixdv?autoplay=0&amp;controls=0&amp;rel=0&amp;cc_lang_pref=en&amp;iv_load_policy=3&amp;cc_load_policy=1&amp;mute=0&amp;modestbranding=1&amp;showinfo=0&amp;wmode=transparent&amp;playsinline=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.getthinusa.com&amp;widgetid=1"
        data-gtm-yt-inspected-8="true"
      />
    </div>
  </div>
)
