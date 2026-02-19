import Navbar from "@/component/nav/Navbar"
import Footer from "@/component/Footer"

export default function NavLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
