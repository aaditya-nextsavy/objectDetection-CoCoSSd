import Uploader from "@/components/Uploader";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center justify-center">
        <div>
          <div>
            <Link href={"detect-object"}>
              <h1 className="text-gray-300 cursor-pointer transition-all ease-in-out  text-5xl underline underline-offset-[12px] hover:text-white">
                Web Cam
              </h1>
            </Link>
          </div>
          <div className="mt-[50px]">
            <h2 className="text-4xl mb-4">
              Upload an image or video
            </h2>
            <Uploader />
          </div>
        </div>
      </main>
    </div>
  );
}
