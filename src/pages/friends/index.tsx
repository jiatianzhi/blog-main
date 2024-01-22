import React from 'react'
import Layout from '@theme/Layout'
import CodeBlock from '@theme/CodeBlock'

import FriendCard from './_components/FriendCard'
import { Friends } from '@site/data/friends'

import styles from './styles.module.css'
import { motion } from 'framer-motion'

const TITLE = 'Friends'
const DESCRIPTION = 'A good friend is better than a pocket full of gold.'
const ADD_FRIEND_URL = 'https://github.com/jiatianzhi/blog-main/edit/main/data/friends.tsx'
const SITE_INFO = `
title: 'Tianzhi Jia'
description: '贾添植'
website: 'https://jiatianzhi.xyz'
avatar: 'https://jiatianzhi.xyz/img/logo.png'

`

function SiteInfo() {
  return (
    <div className={styles.siteInfo}>
      <CodeBlock language="yaml" title="Information of the Website">
        {SITE_INFO}
      </CodeBlock>
    </div>
  )
}

function FriendHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <a className="button button--primary" href={ADD_FRIEND_URL} target="_blank" rel="noreferrer">
        🔗 Link Exchange
      </a>
    </section>
  )
}

function FriendCards() {
  const friends = Friends

  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className={styles.friendContainer}>
        <ul className={styles.friendList}>
          {friends.map(friend => (
            <FriendCard key={friend.avatar} friend={friend} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FriendLink(): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <motion.main ref={ref} className="margin-vert--md">
        <FriendHeader />
        <FriendCards />
        <motion.div drag dragConstraints={ref} className={styles.dragBox}>
          <SiteInfo />
        </motion.div>
      </motion.main>
    </Layout>
  )
}
