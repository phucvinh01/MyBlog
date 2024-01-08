import Hero from "@/components/Hero";
import SessionCurrentBlog from "@/components/SectionCurrentBlog";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
        <Hero/>
        <SessionCurrentBlog/>
    </div>
  )
}
