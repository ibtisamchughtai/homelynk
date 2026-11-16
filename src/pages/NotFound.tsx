import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <PageHeader title="This page doesn't exist.">
      <p>The link may be broken or the page may have moved.</p>
      <Link to="/" className="btn-lynk mt-8">
        Go to the home page
      </Link>
    </PageHeader>
  )
}
