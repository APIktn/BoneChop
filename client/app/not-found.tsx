import styles from "./not-found.module.css"
import Link from "next/link"

const BG_VIDEO = "/video/notfound.mp4"

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <video autoPlay loop muted playsInline className={styles.video}>
        <source src={BG_VIDEO} type="video/mp4" />
      </video>

      <div className={styles.content}>
        <div className={styles.text}>
          404
          <br />
          Your URL was not found anywhere in this universe
        </div>

        <Link href="/" className="btn-glass">
          but don't worry, we can go back to home page
        </Link>
      </div>
    </div>
  )
}
