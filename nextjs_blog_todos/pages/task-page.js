import { useEffect } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import { getAllTasksData } from "../lib/tasks"
import Task from "../components/Task"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`

export default function TaskPage({ staticFilteredTasks }) {
  const { data:tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks
  })

  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  useEffect(() => {
    mutate()
  }, [])

  return (
    <Layout title="Task page">
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => <Task key={task.id} task={task} />)}
      </ul>
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

export async function getStaticProps() {
  const staticFilteredTasks = await getAllTasksData()

  return {
    props: { staticFilteredTasks },
    revalidate: 3,
  }
}
