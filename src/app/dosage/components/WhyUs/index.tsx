import Image from "next/image"
import styles from "./whyUs.module.css"

const list = [
  {
    text: "24/7 Access to Our Comprehensive Network of U.S.A based Medical Doctors!",
    url: "/images/choose1.png",
  },
  {
    text: "Get Itraconazole and Terbinafine From U.S.A. based Pharmacies!",
    url: "/images/choose2.png",
  },
  {
    text: "Manufactured according to stringent quality standards",
    url: "/images/choose3.png",
  },
  {
    text: "No Insurance Needed, No Lab Tests, No Doctor Appointments, and No Monthly Membership or Hidden Fees*",
    url: "/images/choose4.png",
  },
  {
    text: "Medication Shipped In Days - Not Weeks!",
    url: "/images/choose5.png",
  },
  {
    text: "Promotes Clearer, healthier-looking nails",
    url: "/images/choose6.png",
  },
]

const ListItem = ({ text, url }: { text: string; url: string }) => {
  return (
    <div className={styles.listitem}>
      <Image src={url} alt="item icon" height={30} width={30} />
      <p>{text}</p>
    </div>
  )
}

export const WhyUs = () => {
  return (
    <div className={`container ${styles.mainContainer}`}>
      <Image
        src="/images/doc_1.png"
        alt="phone image"
        height={840}
        width={508}
      />
      <article className={styles.textContent}>
        <Image
          src="/images/phone_top.png"
          alt="phone image"
          height={84}
          width={575}
        />
        <h3>
          Why Choose
          <br /> <span> Clarivia?</span>
        </h3>
        {list.map((i) => (
          <ListItem key={i.text} text={i.text} url={i.url} />
        ))}
        <a
          href="#bottle-options"
          className={`buy-now-button ${styles.buyNowButton}`}
        >
          Buy Now
        </a>
      </article>
    </div>
  )
}
