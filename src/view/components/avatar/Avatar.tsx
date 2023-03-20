import Image from 'next/image'
import styles from './Avatar.module.css'

type AvatarProps = {
  user: {
    name: string
    image?: string
  }
}

const Avatar = ({ user }: AvatarProps) => {
  const firstLetter = user.name
  const firstName = user.name.split(' ')[0]

  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        {user.image ? (
          <Image src={user.image} alt={`${user.name}'s profile picture`} fill />
        ) : (
          <span>{firstLetter.at(0)}</span>
        )}
      </div>
      <strong className={styles.name}>{firstName}</strong>
    </div>
  )
}

export { Avatar }
