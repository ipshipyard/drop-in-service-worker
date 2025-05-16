import GithubIcon from './github-icon'

export default function Header() {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-800">IPFS Drop-in Service Worker Example</h1>
      <p className="flex flex-row items-center gap-2 text-blue-800 hover:text-blue-500">
        <a
          href="https://github.com/ipshipyard/drop-in-service-worker"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          title="View source code"
        >
          <GithubIcon />
          (source)
        </a>
      </p>
    </div>
  )
} 
