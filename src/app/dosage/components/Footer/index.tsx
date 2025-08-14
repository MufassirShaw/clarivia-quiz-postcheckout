// components/Footer/Footer.jsx
import Image from "next/image"
import Link from "next/link"
import styles from "./Footer.module.css"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <Link href="/" className={styles.footerBrand}>
            <Image
              src="/images/logo_getthinmd_trbg_w1000_wh__1.png"
              alt="Clarivia"
              width={200}
              height={60}
              className={styles.brandLogo}
              priority
            />
          </Link>
          <div className={styles.workingHours}>
            <h6 className={styles.workingHoursHeading}>WORKING HOURS</h6>
            <p className={styles.workingHoursText}>
              M-F: 9am-9pm EST,
              <br />
              Sat-Sun: 11am-7:30pm EST
            </p>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.footerLabel}>CONTACT US</div>
          <Link
            href="mailto:support@getclarivia.com"
            className={styles.footerLink}
          >
            Send an Email
          </Link>
          <Link href="tel:256-792-5982" className={styles.footerLink}>
            Call us: 256-792-5982
          </Link>
          <p className={styles.footerText}>
            Got a question: support@getclarivia.com
          </p>
        </div>

        <div className={styles.column}>
          <div className={styles.badgesContainer}>
            <Image
              src="/images/hipaa-badge6-white.svg"
              alt="HIPAA Compliant"
              width={120}
              height={80}
              className={styles.hipaaImage}
            />
            <div className={styles.legitscriptContainer}>
              <Link
                href="https://www.legitscript.com/websites/?checker_keywords=getthinusa.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Verify LegitScript Approval for www.getthinusa.com"
                className={styles.legitscriptLink}
              >
                <Image
                  src="https://static.legitscript.com/seals/18553883.png"
                  alt="Verify Approval for www.getthinusa.com"
                  width={73}
                  height={79}
                  className={styles.legitscriptImage}
                  unoptimized // Since it's an external image
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.legalContainer}>
        <div className={styles.legalText}>
          <p>
            Prescription products require an online evaluation with a licensed
            medical professional who will determine if a prescription is
            appropriate. See important safety information. Benefits outlined on
            Clarivia are based on 3rd party studies. Medications are prescribed
            by licensed physicians as part of our toenail fungus treatment
            programs. Actual product packaging may appear differently than
            shown. Physicians may prescribe compounded medications as needed to
            meet patient requirements or drug shortages. The FDA does not review
            or approve any compounded medications for safety or effectiveness.
          </p>
          <p>
            Should you seek a prescription item, Clarivia will facilitate
            arranging a consultation with a qualified Healthcare Provider. The
            Provider will assess your suitability for the prescription item. If
            deemed suitable, a doctor may issue a prescription for the item,
            which can be filled at a partner pharmacy, unless you specify an
            alternative preference.
          </p>
          <p>
            As part of our efforts to ensure patient safety, we need to verify
            your phone number. By giving us your phone number and continuing,
            you agree that Clarivia may send text messages to you to verify your
            phone number and for any other lawful purpose related to your
            Clarivia account and your use of our services, including order
            confirmations, shipment notifications, and messages from your
            provider. Message and data rates may apply. Message frequency
            varies. Additionally, by providing your phone number, you agree to
            receive marketing emails and other promotional communications from
            Clarivia. You also consent to Clarivia using your information for
            third-party advertising purposes, including but not limited to
            targeted advertising on platforms such as Facebook, Google, and
            other similar sites. This includes using hashed and de-identified
            data to create custom audiences for targeted advertising and to
            exclude existing customers from certain marketing campaigns. You can
            opt-out of receiving marketing emails at any time by following the
            unsubscribe instructions provided in each email or by contacting us
            directly at support@getclarivia.com.
          </p>
          <p>
            Note: The above statements have not been evaluated by the Food and
            Drug Administration. This product is not intended to diagnose,
            treat, cure, or prevent any disease.
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerCopyright}>
          © {currentYear} Clarivia. All rights reserved
        </div>
        <div className={styles.footerLegal}>
          <a
            href="https://getclarivia.com/disclaimer"
            className={styles.legalLink}
          >
            Disclaimers
          </a>
          <a
            href="https://getclarivia.com/terms-conditions"
            className={styles.legalLink}
          >
            Terms & Conditions
          </a>
          <a
            href="https://getclarivia.com/privacy-policy"
            className={styles.legalLink}
          >
            Privacy Policy
          </a>
          <a
            href="https://getclarivia.com//fulfillment-policy"
            className={styles.legalLink}
          >
            Fulfillment Policy
          </a>
          <a
            href="https://getclarivia.com/telehealth"
            className={styles.legalLink}
          >
            Telehealth
          </a>
        </div>
      </div>
    </footer>
  )
}
