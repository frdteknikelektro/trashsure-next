import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    const id = setTimeout(() => {
        router.push('/home')
    }, 2000)

    return () => {
        clearTimeout(id)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Trashsure</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className="SplashScreen p-8 flex flex-col w-full min-h-screen relative bg-white">
        <div className="flex flex-1 items-center justify-center">
          <img
            className={`ImageRemovebgPreview1 w-64 h-28 ${styles['fade-in']}`}
            src="/splash.png"
          />
        </div>
        <div
          className="SatukanTekadDanLangkahWujudkanBumiTanpaSampah text-center text-green-400 text-xs font-normal font-['Poppins']"
        >
          Satukan Tekad dan Langkah Wujudkan Bumi Tanpa Sampah
        </div>
      </div>
    </>
  )
}
