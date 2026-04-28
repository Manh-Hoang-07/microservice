export const KAFKA_SERVICE = 'KAFKA_SERVICE';

export const KafkaTopic = {
  CHAPTER_PUBLISHED: 'comic.chapter.published',
  COMMENT_CREATED: 'comic.comment.created',
  USER_FOLLOWED_COMIC: 'user.followed.comic',
  USER_UNFOLLOWED_COMIC: 'user.unfollowed.comic',
  USER_REGISTERED: 'user.registered',
  USER_PASSWORD_RESET: 'user.password.reset',
  CONTACT_SUBMITTED: 'contact.submitted',
} as const;

export type KafkaTopicValue = (typeof KafkaTopic)[keyof typeof KafkaTopic];
