import Layout from "../components/Layout"
import Link from "next/link"

export default function TaskPage() {
  return (
    <Layout title="Task page">
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg 
            className="w-6 h-6 mr-3"
            fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

