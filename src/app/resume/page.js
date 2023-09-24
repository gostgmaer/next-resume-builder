"use client"
import Skill from '@/components/expriment/Skills';
import Head from 'next/head';
import React, { useState } from 'react'

const page = () => {
  const [skills, setSkills] = useState([]);
  return (
    <div>
    <Head>
      <title>Resume Skills</title>
    </Head>

    <main className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Resume Skills</h1>
      <Skill skills={skills} setSkills={setSkills} />
    </main>
  </div>
  )
}

export default page