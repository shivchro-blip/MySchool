import Layout from '../components/Layout'

export default function NotFoundPage() {
  return (
    <Layout title="">
      <div className="text-center py-16">
        <p className="text-6xl mb-4">📭</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">This page does not exist.</p>
        <a href="/" className="btn-primary inline-block">Go Home</a>
      </div>
    </Layout>
  )
}
