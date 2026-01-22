import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="card max-w-[520px] w-full flex flex-col items-center justify-center p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-[64px] font-medium leading-[1] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.48)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
              404
            </h1>
            <h2 className="text-[18px] font-medium leading-[24px] tracking-[0px] text-white/50 text-center">
              Page not found
            </h2>
          </div>

          <p className="text-[14px] font-normal leading-[20px] tracking-[0px] text-white/70 text-center max-w-[320px]">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="mt-4 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors duration-300 ease-out"
          >
            <span className="text-[14px] font-medium leading-[100%] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
